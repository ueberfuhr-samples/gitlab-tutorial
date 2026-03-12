# Agents Guide

## Projektbeschreibung

Dieses Repository ist die Musterloesung eines GitLab-Tutorials. Es besteht aus zwei Teilen:

1. **GitLab-Setup** (`gitlab-setup/`): Docker-Compose-Konfiguration, um eine lokale GitLab-Instanz (GitLab EE) in einem Container zu betreiben. Die Instanz ist erreichbar unter `http://localhost:8880`, SSH auf Port `2222`.
2. **Beispielprojekte** (`repositories/`): Zwei Beispielprojekte, die im lokalen GitLab gespeichert und per CI/CD gebaut werden:
   - `angular-sample` - ein Angular-Frontend-Projekt
   - `quarkus-sample` - ein Quarkus-Backend-Projekt

## Projektstruktur

```
gitlab-setup/           # Docker-Compose-Setup fuer lokale GitLab-Instanz
  docker-compose.yaml   # Container-Definition (GitLab EE)
  config/               # Gemountetes Volume fuer /etc/gitlab
  data/                 # Gemountetes Volume fuer /var/opt/gitlab
  logs/                 # Gemountetes Volume fuer /var/log/gitlab
repositories/           # Beispielprojekte fuer das Tutorial
  angular-sample/       # Angular-Beispielprojekt
  quarkus-sample/       # Quarkus-Beispielprojekt
```

## Hinweise

- Die `docker-compose.yaml` erwartet die Umgebungsvariable `GITLAB_HOME`, die auf das `gitlab-setup/`-Verzeichnis zeigen muss.
- Die Verzeichnisse `config/`, `data/` und `logs/` muessen mit `chmod -R 777` beschreibbar sein, damit der GitLab-Container korrekt starten kann.
- Die `.gitignore` ignoriert versteckte Dateien (außer `.gitignore`) und `.iml`-Dateien.
