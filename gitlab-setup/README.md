# GitLab-Setup – Installationsanleitung

Diese Anleitung beschreibt, wie du eine lokale GitLab-Instanz per Docker Compose startest.

## Über das GitLab-Image

Das verwendete Image `gitlab/gitlab-ee:latest` ist ein sogenanntes **Omnibus-Image**. Es enthält alle für den Betrieb benötigten Komponenten in einem einzelnen Container:

- **PostgreSQL** – Datenbank für GitLab-Metadaten (Projekte, Benutzer, CI/CD-Konfiguration etc.)
- **Redis** – In-Memory-Cache und Message Broker (z. B. für Background Jobs)
- **Gitaly** – Git-Storage-Service für den Zugriff auf Repositories
- **Nginx** – Webserver und Reverse Proxy für die Web-Oberfläche

Es sind daher keine separaten Container für diese Dienste nötig.

## Voraussetzungen

- [Docker](https://www.docker.com/) und Docker Compose müssen installiert sein.

## Installation

### Datenverzeichnis einrichten

Die `docker-compose.yaml` verwendet die Variable `GITLAB_HOME` als Basis-Pfad für die Volume-Mounts. Die Verzeichnisstruktur ist wie folgt aufgebaut:

```
$GITLAB_HOME/
├── gitlab/
│   ├── config/    # /etc/gitlab
│   ├── data/      # /var/opt/gitlab
│   └── logs/      # /var/log/gitlab
├── runner/
│   ├── config/    # /etc/gitlab-runner
│   └── data/      # /var/opt/gitlab-runner
└── shared/
    └── ssl/       # /etc/gitlab/ssl, /etc/gitlab-runner/certs
```

Standardmäßig wird das aktuelle Verzeichnis verwendet – die mitgelieferten Unterordner sind bereits vorhanden. Die Container benötigen aber Schreibzugriff auf die Volume-Verzeichnisse:

```bash
# Berechtigungen setzen, damit die Container Schreibzugriff haben
chmod -R 777 gitlab runner shared
```

### Optional: Eigenes Datenverzeichnis verwenden

Falls du die Daten an einem **anderen Ort** ablegen möchtest, musst du die Verzeichnisse dort anlegen, berechtigen und `GITLAB_HOME` setzen:

```bash
# Gewünschtes Datenverzeichnis als Umgebungsvariable setzen
export GITLAB_HOME=/pfad/zum/gewuenschten/verzeichnis
# Unterordner für GitLab anlegen
mkdir -p "$GITLAB_HOME/gitlab/config" "$GITLAB_HOME/gitlab/data" "$GITLAB_HOME/gitlab/logs"
# Unterordner für GitLab Runner anlegen
mkdir -p "$GITLAB_HOME/runner/config" "$GITLAB_HOME/runner/data"
# Gemeinsam genutzte Unterordner anlegen
mkdir -p "$GITLAB_HOME/shared/ssl"
# Berechtigungen setzen, damit die Container Schreibzugriff haben
chmod -R 777 "$GITLAB_HOME/gitlab" "$GITLAB_HOME/runner" "$GITLAB_HOME/shared"
# Variable in .env-Datei speichern, damit Docker Compose sie automatisch liest
echo "GITLAB_HOME=$GITLAB_HOME" > .env
```

### Hostname einrichten

Damit der Hostname `gitlab` vom Host-Rechner aufgelöst werden kann (z.B. für die Runner-Kommunikation), trage ihn in die lokale Hosts-Datei ein:

```bash
# Eintrag in /etc/hosts hinzufügen
echo "127.0.0.1  gitlab" | sudo tee -a /etc/hosts
# DNS-Cache leeren (macOS)
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

> **Hinweis:** Unter Linux entfällt der zweite Befehl – der Eintrag in `/etc/hosts` wird sofort wirksam.

### SSL-Zertifikate einrichten

Wir erstellen ein Zertifikat für den Hostnamen `gitlab`. Da wir GitLab in Docker betreiben, legen wir die Zertifikate dort ab, wo GitLab sie erwartet.

```bash
# Verzeichnis für SSL-Zertifikate erstellen
mkdir -p "$GITLAB_HOME/shared/ssl"
cd "$GITLAB_HOME/shared/ssl"

# Privaten Schlüssel und Zertifikat generieren (gültig für 10 Jahre)
openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout gitlab.key -out gitlab.crt -subj "/CN=gitlab" -extensions v3_req -config <(echo "[req]"; echo "distinguished_name=req"; echo "[req] "; echo "[v3_req]"; echo "subjectAltName=DNS:gitlab")
```

### GitLab starten

```bash
docker compose up -d
```

> **Hinweis:** Der erste Start kann mehrere Minuten dauern, da GitLab intern konfiguriert wird.

Nach erfolgreichem Start ist GitLab unter https://gitlab:4443, per SSH auf Port `2222` erreichbar.

### Erster Login

GitLab erstellt bei der Erstinstallation ein zufälliges Passwort für den Standard-Administrator (`root`). Da die Daten lokal gespiegelt werden, findest du dieses Passwort in einer Datei auf deinem Host-Rechner:

```
$GITLAB_HOME/gitlab/config/initial_root_password
```

Melde dich anschließend mit dem Benutzer `root` und dem ausgelesenen Passwort an.

> **Achtung:** Diese Datei wird aus Sicherheitsgründen nach 24 Stunden automatisch gelöscht.

### GitLab Runner registrieren

Damit CI/CD-Pipelines ausgeführt werden können, muss der GitLab Runner bei der GitLab-Instanz registriert werden.

#### Runner-Token erzeugen

Der folgende Befehl erstellt einen Instance Runner in GitLab und gibt dessen Token aus:

```bash
RUNNER_TOKEN=$(docker exec gitlab-setup-gitlab-1 \
  gitlab-rails runner \
  'runner = Ci::Runner.create!(runner_type: "instance_type", description: "CLI Runner"); puts runner.token')
```

#### Runner registrieren

Mit dem Token wird der Runner-Container bei GitLab registriert. Als Executor wird Docker verwendet, sodass jeder CI/CD-Job in einem eigenen Container läuft:

```bash
docker exec -it gitlab-setup-gitlab-runner-1 \
  gitlab-runner register \
  --non-interactive \
  --url "https://gitlab:4443" \
  --token "$RUNNER_TOKEN" \
  --executor "docker" \
  --docker-image "docker:stable" \
  --docker-volumes "/var/run/docker.sock:/var/run/docker.sock" \
  --docker-network-mode "gitlab-net"
```

> **Hinweis:** Die URL `https://gitlab:4443` nutzt den internen Docker-Netzwerknamen, da Runner und GitLab im selben Netzwerk (`gitlab-net`) laufen.

Nach erfolgreicher Registrierung ist der Runner unter **Admin Area → CI/CD → Runners** sichtbar.

#### Runner konfigurieren

Folgende Konfigurationen sind empfehlenswert:
- Für den _dind_-Service (Docker-in-Docker) muss der Runner im privilegierten Modus (_Super-User-Modus_) laufen. (`privileged = true`)
- Für schnelleren Durchsatz kann die Anzahl der parallelen Jobs angepasst werden. (z.B. `concurrent = 4`)

```bash
# Privilegierter Modus
sed -i '' 's/privileged = false/privileged = true/g' $GITLAB_HOME/runner/config/config.toml
# Erlaube dind-Service, --insecure-registry bei der Ausführung zu verwenden
sed -i '' '/\[runners.docker\]/a \
    allowed_privileged_images = ["docker:*-dind", "docker:latest"]' runner/config/config.toml
# optional: Parallele Verarbeitung von Jobs
sed -i '' 's/concurrent = 1/concurrent = 4/g' $GITLAB_HOME/runner/config/config.toml
# SSL-Mounts ergänzen (absoluter Host-Pfad nötig, da CI-Jobs über den Host-Docker-Daemon laufen)
SSL_HOST_PATH="$(cd "${GITLAB_HOME:-.}" && pwd)/shared/ssl"
sed -i '' 's|volumes = \["/var/run/docker.sock:/var/run/docker.sock", "/cache"\]|volumes = ["/var/run/docker.sock:/var/run/docker.sock", "/cache", "'"$SSL_HOST_PATH"':/etc/gitlab-custom-certs:ro"]|g' ${GITLAB_HOME:-.}/runner/config/config.toml
# Neustart erforderlich
docker restart gitlab-setup-gitlab-runner-1
```

### SSH-Verbindung einrichten

Da der Host-Port für SSH `2222` ist, muss Git so konfiguriert werden, dass es diesen Port nutzt.

#### SSH-Key prüfen oder erstellen

Prüfe, ob bereits ein SSH-Key vorhanden ist (meist unter `~/.ssh/id_ed25519.pub` oder `~/.ssh/id_rsa.pub`).

Falls kein Key vorhanden ist, erstelle einen neuen:

```bash
ssh-keygen -t ed25519
```

#### SSH-Key in GitLab hinterlegen

1. Melde dich in GitLab an und klicke oben rechts auf dein Profilbild → **Preferences**.
2. Wähle links **SSH Keys** und klicke auf **Add new key**.
3. Kopiere den Inhalt deiner `.pub`-Datei dort hinein:

```bash
cat ~/.ssh/id_ed25519.pub
```

#### SSH-Konfiguration für Port 2222

Damit Git den richtigen Port verwendet, trage folgendes in `~/.ssh/config` ein:

```
Host gitlab
  Port 2222
  IdentityFile ~/.ssh/id_ed25519
```

Anschließend kannst du Repositories per SSH klonen:

```bash
git clone ssh://git@gitlab:2222/<gruppe>/<projekt>.git
```

### GPG-Key einrichten (Commit-Signierung)

Mit einem GPG-Key kannst du deine Commits signieren, sodass sie in GitLab als **verifiziert** angezeigt werden.

#### Vorhandene GPG-Keys prüfen

```bash
gpg --list-secret-keys --keyid-format long
```

Falls bereits ein Key vorhanden ist, wird er hier aufgelistet. Andernfalls ist die Ausgabe leer.

#### Neuen GPG-Key erstellen (falls keiner vorhanden)

```bash
gpg --full-generate-key
```

Wähle im Dialog:
- Schlüsseltyp: **RSA and RSA** (Standard)
- Schlüssellänge: **4096**
- Gültigkeit: nach Bedarf (z. B. `0` für unbegrenzt)
- Name und E-Mail-Adresse: Verwende dieselbe E-Mail wie in deinem GitLab-Profil.

#### GPG-Key-ID ermitteln

```bash
gpg --list-secret-keys --keyid-format long
```

Die Key-ID findest du in der Zeile `sec` nach dem Schrägstrich, z. B.:

```
sec   rsa4096/ABCDEF1234567890 2026-03-12 [SC]
```

Hier wäre `ABCDEF1234567890` die Key-ID.

#### Öffentlichen Key exportieren

```bash
gpg --armor --export ABCDEF1234567890
```

#### GPG-Key in GitLab hinterlegen

1. Klicke in GitLab oben rechts auf dein Profilbild → **Preferences**.
2. Wähle links **GPG Keys** und klicke auf **Add new key**.
3. Füge den exportierten öffentlichen Key (gesamte Ausgabe inkl. `-----BEGIN PGP PUBLIC KEY BLOCK-----`) dort ein.

#### Git für Commit-Signierung konfigurieren

```bash
# ohne "--global" für die Konfiguration eines einzelnen lokalen Repositories
# Benutzername und E-Mail für Commits setzen (muss mit dem GPG-Key übereinstimmen)
git config --global user.name "Dein Name"
git config --global user.email "deine.email@beispiel.de"
# Git den GPG-Key zuweisen
git config --global user.signingkey ABCDEF1234567890
# Alle Commits automatisch signieren
git config --global commit.gpgsign true
```

### E-Mail-Adresse einrichten

Damit GPG-signierte Commits als verifiziert erkannt werden, muss die E-Mail-Adresse im GitLab-Profil hinterlegt und bestätigt sein. Da die lokale GitLab-Instanz keine E-Mails versenden kann, bestätigen wir die Adresse direkt über die Rails-Konsole.

#### E-Mail-Adresse im Profil eintragen

1. Klicke in GitLab oben rechts auf dein Profilbild → **Preferences**.
2. Wähle links **Emails** und füge deine E-Mail-Adresse hinzu.

#### E-Mail-Adresse per Rails-Konsole bestätigen

```bash
docker compose exec gitlab gitlab-rails runner "
  user = User.find_by(username: 'root')
  email = user.emails.find_by(email: 'deine.email@beispiel.de')
  email.confirm if email
  user.update!(email: 'deine.email@beispiel.de') unless user.email == 'deine.email@beispiel.de'
"
```

> Ersetze `deine.email@beispiel.de` durch die tatsächlich verwendete Adresse.
> Der Befehl bestätigt die Adresse und setzt sie als primäre E-Mail des Benutzers.

## Stoppen

```bash
docker compose down
```
