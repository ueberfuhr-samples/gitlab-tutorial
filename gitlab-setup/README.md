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

### 1. Optional: Eigenes Datenverzeichnis verwenden

Die `docker-compose.yaml` verwendet die Variable `GITLAB_HOME` als Basis-Pfad für die Unterordner `config`, `data` und `logs`, die als Volumes in den Container gemountet werden. Standardmäßig wird das aktuelle Verzeichnis verwendet – die mitgelieferten Unterordner sind bereits vorhanden und vorbereitet, sodass keine weiteren Schritte nötig sind.

Falls du die Daten an einem **anderen Ort** ablegen möchtest, musst du die Verzeichnisse dort anlegen, berechtigen und `GITLAB_HOME` setzen:

```bash
# Gewünschtes Datenverzeichnis als Umgebungsvariable setzen
export GITLAB_HOME=/pfad/zum/gewuenschten/verzeichnis
# Unterordner für Konfiguration, Daten und Logs anlegen
mkdir -p "$GITLAB_HOME/config" "$GITLAB_HOME/data" "$GITLAB_HOME/logs"
# Berechtigungen setzen, damit der Container Schreibzugriff hat
chmod -R 777 "$GITLAB_HOME/config" "$GITLAB_HOME/data" "$GITLAB_HOME/logs"
# Variable in .env-Datei speichern, damit Docker Compose sie automatisch liest
echo "GITLAB_HOME=$GITLAB_HOME" > .env
```

### 2. GitLab starten

```bash
docker compose up -d
```

> **Hinweis:** Der erste Start kann mehrere Minuten dauern, da GitLab intern konfiguriert wird.

Nach erfolgreichem Start ist GitLab unter http://localhost:8880 erreichbar.

### 3. Zugriff

- **Web UI:** http://localhost:8880
- **SSH:** Port `2222`

### Erster Login

GitLab erstellt bei der Erstinstallation ein zufälliges Passwort für den Standard-Administrator (`root`). Da die Daten lokal gespiegelt werden, findest du dieses Passwort in einer Datei auf deinem Host-Rechner:

```
$GITLAB_HOME/config/initial_root_password
```

Melde dich anschließend unter http://localhost:8880 mit dem Benutzer `root` und dem ausgelesenen Passwort an.

> **Achtung:** Diese Datei wird aus Sicherheitsgründen nach 24 Stunden automatisch gelöscht.

### SSH-Verbindung einrichten

Da der Host-Port für SSH `2222` ist, muss Git so konfiguriert werden, dass es diesen Port nutzt.

**1. SSH-Key prüfen oder erstellen**

Prüfe, ob bereits ein SSH-Key vorhanden ist (meist unter `~/.ssh/id_ed25519.pub` oder `~/.ssh/id_rsa.pub`).

Falls kein Key vorhanden ist, erstelle einen neuen:

```bash
ssh-keygen -t ed25519
```

**2. SSH-Key in GitLab hinterlegen**

1. Melde dich in GitLab an und klicke oben rechts auf dein Profilbild → **Preferences**.
2. Wähle links **SSH Keys** und klicke auf **Add new key**.
3. Kopiere den Inhalt deiner `.pub`-Datei dort hinein:

```bash
cat ~/.ssh/id_ed25519.pub
```

**3. SSH-Konfiguration für Port 2222**

Damit Git den richtigen Port verwendet, trage folgendes in `~/.ssh/config` ein:

```
Host localhost
  Port 2222
  IdentityFile ~/.ssh/id_ed25519
```

Anschließend kannst du Repositories per SSH klonen:

```bash
git clone ssh://git@localhost:2222/<gruppe>/<projekt>.git
```

### GPG-Key einrichten (Commit-Signierung)

Mit einem GPG-Key kannst du deine Commits signieren, sodass sie in GitLab als **verifiziert** angezeigt werden.

**1. Vorhandene GPG-Keys prüfen**

```bash
gpg --list-secret-keys --keyid-format long
```

Falls bereits ein Key vorhanden ist, wird er hier aufgelistet. Andernfalls ist die Ausgabe leer.

**2. Neuen GPG-Key erstellen (falls keiner vorhanden)**

```bash
gpg --full-generate-key
```

Wähle im Dialog:
- Schlüsseltyp: **RSA and RSA** (Standard)
- Schlüssellänge: **4096**
- Gültigkeit: nach Bedarf (z. B. `0` für unbegrenzt)
- Name und E-Mail-Adresse: Verwende dieselbe E-Mail wie in deinem GitLab-Profil.

**3. GPG-Key-ID ermitteln**

```bash
gpg --list-secret-keys --keyid-format long
```

Die Key-ID findest du in der Zeile `sec` nach dem Schrägstrich, z. B.:

```
sec   rsa4096/ABCDEF1234567890 2026-03-12 [SC]
```

Hier wäre `ABCDEF1234567890` die Key-ID.

**4. Öffentlichen Key exportieren**

```bash
gpg --armor --export ABCDEF1234567890
```

**5. GPG-Key in GitLab hinterlegen**

1. Klicke in GitLab oben rechts auf dein Profilbild → **Preferences**.
2. Wähle links **GPG Keys** und klicke auf **Add new key**.
3. Füge den exportierten öffentlichen Key (gesamte Ausgabe inkl. `-----BEGIN PGP PUBLIC KEY BLOCK-----`) dort ein.

**6. Git für Commit-Signierung konfigurieren**

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

**1. E-Mail-Adresse im Profil eintragen**

1. Klicke in GitLab oben rechts auf dein Profilbild → **Preferences**.
2. Wähle links **Emails** und füge deine E-Mail-Adresse hinzu.

**2. E-Mail-Adresse per Rails-Konsole bestätigen**

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
