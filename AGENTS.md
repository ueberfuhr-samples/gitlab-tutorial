# Agents Guide

## Projektbeschreibung

Dieses Repository ist die Musterloesung eines GitLab-Tutorials. Es besteht aus zwei Teilen:

1. **GitLab-Setup** (`gitlab-setup/`): Docker-Compose-Konfiguration, um eine lokale GitLab-Instanz (GitLab EE) und einen GitLab Runner in Containern zu betreiben. Die Instanz ist erreichbar unter `http://localhost:8880`, SSH auf Port `2222`.
2. **Beispielprojekte** (`repositories/`): Zwei Beispielprojekte, die im lokalen GitLab gespeichert und per CI/CD gebaut werden:
   - `angular-sample` - ein Angular-Frontend-Projekt
   - `quarkus-sample` - ein Quarkus-Backend-Projekt

## Projektstruktur

```
gitlab-setup/               # Docker-Compose-Setup fuer lokale GitLab-Instanz
  docker-compose.yaml       # Container-Definition (GitLab EE + Runner)
  gitlab/                   # Volumes fuer den GitLab-Container
    config/                 # Gemountetes Volume fuer /etc/gitlab
    data/                   # Gemountetes Volume fuer /var/opt/gitlab
    logs/                   # Gemountetes Volume fuer /var/log/gitlab
  runner/                   # Volumes fuer den GitLab-Runner-Container
    config/                 # Gemountetes Volume fuer /etc/gitlab-runner
    data/                   # Gemountetes Volume fuer /var/opt/gitlab-runner
repositories/               # Beispielprojekte fuer das Tutorial
  angular-sample/           # Angular-Beispielprojekt
  quarkus-sample/           # Quarkus-Beispielprojekt
```

## Hinweise

- Die `docker-compose.yaml` verwendet die Umgebungsvariable `GITLAB_HOME` (Fallback: aktuelles Verzeichnis) als Basis-Pfad fuer die Volume-Mounts.
- Die Unterverzeichnisse unter `gitlab/` und `runner/` muessen mit `chmod -R 777` beschreibbar sein, damit die Container korrekt starten koennen.
- Die `.gitignore` ignoriert versteckte Dateien (außer `.gitignore`) und `.iml`-Dateien.
