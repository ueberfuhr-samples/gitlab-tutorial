# Agents Guide

## Projektbeschreibung

Dieses Repository ist die Musterloesung eines GitLab-Tutorials. Es stellt eine lokale GitLab-Instanz mit Docker-Containern bereit, inklusive CI/CD-Runner und Container Registry. Es besteht aus zwei Teilen:

1. **GitLab-Setup** (`gitlab-setup/`): Docker-Compose-Konfiguration, um eine lokale GitLab-Instanz (GitLab EE) und einen GitLab Runner in Containern zu betreiben.
2. **Beispielprojekte** (`repositories/`): Zwei Beispielprojekte, die im lokalen GitLab gespeichert und per CI/CD gebaut werden:
   - `angular-sample` - ein Angular-21-Frontend-Projekt (Rezepte-App)
   - `quarkus-sample` - ein Quarkus-3.x-Backend-Projekt (Rezepte-API, Java 21)

## Projektstruktur

```
gitlab-setup/                          # Docker-Compose-Setup fuer lokale GitLab-Instanz
  docker-compose.yaml                  # Container-Definition (GitLab EE + Runner)
  gitlab/                              # Volumes fuer den GitLab-Container
    config/                            # Gemountetes Volume fuer /etc/gitlab
    data/                              # Gemountetes Volume fuer /var/opt/gitlab
    logs/                              # Gemountetes Volume fuer /var/log/gitlab
  runner/                              # Volumes fuer den GitLab-Runner-Container
    config/                            # Gemountetes Volume fuer /etc/gitlab-runner
      config.toml                      # Runner-Konfiguration (Executor, Images, Volumes)
    data/                              # Gemountetes Volume fuer /var/opt/gitlab-runner
  shared/
    ssl/                               # Selbstsignierte SSL-Zertifikate (gitlab.crt, gitlab.key)
repositories/                          # Beispielprojekte fuer das Tutorial
  angular-sample/                      # Angular-Beispielprojekt
  quarkus-sample/                      # Quarkus-Beispielprojekt
    .gitlab-ci.yml                     # CI/CD-Pipeline (build, test, package, scan)
```

## Entscheidende Dateien

### `gitlab-setup/docker-compose.yaml`

Definiert die Container-Infrastruktur:

- **GitLab EE** (Omnibus-Image): Enthaelt Web-UI, PostgreSQL, Redis, Gitaly, Nginx, Container Registry
  - Port 4443: HTTPS (Web-UI)
  - Port 8880: HTTP (Redirect auf HTTPS)
  - Port 2222: SSH fuer Git-Operationen
  - Port 5505: Container Registry
- **GitLab Runner**: Fuehrt CI/CD-Jobs in Docker-Containern aus
- Gemeinsames Netzwerk `gitlab-net` fuer die Kommunikation zwischen den Containern
- Volumes fuer persistente Daten unter `gitlab-setup/gitlab/` und `gitlab-setup/runner/`
- GitLab-Konfiguration erfolgt inline ueber die Umgebungsvariable `GITLAB_OMNIBUS_CONFIG`

### `gitlab-setup/runner/config/config.toml`

Konfiguration des GitLab Runners:

- Executor: `docker` (Jobs laufen in isolierten Docker-Containern)
- Default-Image: `docker:stable`
- `privileged = true` fuer Docker-in-Docker (ermoeglicht Image-Builds in Pipelines)
- Docker-Socket wird als Volume gemountet (`/var/run/docker.sock`)
- SSL-Zertifikate werden in die Build-Container gemountet
- `network_mode = "gitlab-net"` fuer Zugriff auf GitLab und Registry
- `tls_verify = false` wegen selbstsignierter Zertifikate
- Bis zu 4 parallele Jobs (`concurrent = 4`)

### `.gitlab-ci.yml` (in den Sample-Projekten)

Definiert die CI/CD-Pipeline-Stages und Jobs. Beispiel `quarkus-sample/.gitlab-ci.yml`:

- **build**: Maven-Kompilierung (`mvn clean package`)
- **test**: Unit-Tests mit JUnit-Reporting
- **package**: Docker-Image bauen und in die Container Registry pushen
- **scan**: Sicherheitsscans (SAST, Dependency Scanning, Secret Detection, Container Scanning)

## Beispiel-Anwendungen

| Projekt | Framework | Build-Tool | Besonderheiten |
|---------|-----------|------------|----------------|
| `angular-sample` | Angular 21 | npm / Angular CLI | Zwei Dockerfile-Varianten (single-stage, multi-stage), Nginx als Runtime |
| `quarkus-sample` | Quarkus 3.31 / Java 21 | Maven (mit Wrapper) | Layered Architecture (boundary, domain, persistence), H2-Datenbank, REST API |

## Hinweise fuer KI-Agenten

- **Hostname `gitlab`** muss in `/etc/hosts` auf `127.0.0.1` zeigen, damit die URLs funktionieren.
- **HTTPS mit selbstsignierten Zertifikaten**: In Pipelines muessen Zertifikate explizit in den Trust Store kopiert werden (siehe `before_script` in `.gitlab-ci.yml`).
- **Container Registry** ist unter `gitlab:5505` erreichbar; Docker-Images werden dort gepusht.
- Aenderungen an der GitLab-Konfiguration (in `GITLAB_OMNIBUS_CONFIG`) erfordern i.d.R. einen Neustart des GitLab-Containers (`docker compose restart`).
- Aenderungen an der Runner-Konfiguration (`config.toml`) erfordern einen Neustart des Runner-Containers.
- Die Runner-Registrierung erfolgt manuell (Token aus der GitLab-Admin-UI) und ist in `gitlab-setup/README.md` dokumentiert.
- Die `angular-sample`-App hat noch keine `.gitlab-ci.yml` — dort kann eine Pipeline analog zum Quarkus-Projekt erstellt werden.
- Die `docker-compose.yaml` verwendet die Umgebungsvariable `GITLAB_HOME` (Fallback: aktuelles Verzeichnis) als Basis-Pfad fuer die Volume-Mounts.
- Die Unterverzeichnisse unter `gitlab/` und `runner/` muessen mit `chmod -R 777` beschreibbar sein, damit die Container korrekt starten koennen.
- Die `.gitignore` ignoriert versteckte Dateien (ausser `.gitignore`) und `.iml`-Dateien.
