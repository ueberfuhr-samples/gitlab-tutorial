# GitLab Tutorial

Dieses Repository enthält die Musterlösung eines GitLab-Tutorials. Es umfasst ein lokales GitLab-Setup sowie zwei Beispielprojekte, die im GitLab gespeichert und per CI/CD gebaut werden.

## Inhalt

- **[GitLab-Setup](gitlab-setup/)** – Lokale GitLab-Instanz per Docker Compose
- **[repositories/angular-sample](repositories/angular-sample/)** – Angular-Beispielprojekt
- **[repositories/quarkus-sample](repositories/quarkus-sample/)** – Quarkus-Beispielprojekt

## Voraussetzungen

- [Docker](https://www.docker.com/) und Docker Compose

## Schnellstart

1. **GitLab starten** – siehe [Installationsanleitung](gitlab-setup/README.md)
2. **Beispielprojekte** in der lokalen GitLab-Instanz als Repositories anlegen und pushen
3. **CI/CD-Pipelines** konfigurieren und ausführen

## Zugriff

| Dienst | URL / Port |
|--------|-----------|
| Web UI | http://localhost:8880 |
| HTTPS  | https://localhost:4443 |
| SSH    | `ssh://git@localhost:2222` |
