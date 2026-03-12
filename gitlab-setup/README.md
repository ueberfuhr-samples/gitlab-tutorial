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

### 3. Zugriff

Sobald GitLab bereit ist, erreichst du die Web-Oberfläche unter:

- **Web UI:** http://localhost:8880
- **SSH:** Port `2222`

### Initiales Root-Passwort

Beim ersten Start generiert GitLab ein initiales Root-Passwort. Du kannst es wie folgt auslesen:

```bash
docker compose exec gitlab grep 'Password:' /etc/gitlab/initial_root_password
```

Melde dich anschließend mit dem Benutzer `root` und dem ausgelesenen Passwort an.

## Stoppen

```bash
docker compose down
```
