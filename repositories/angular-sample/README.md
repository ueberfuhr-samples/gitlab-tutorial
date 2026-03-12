# Angular Sample – GitLab Tutorial

Dieses Projekt ist ein Angular-Frontend (RecipesApp), das im Rahmen des GitLab-Tutorials als Beispielprojekt dient.

## Repository in GitLab pushen

### Projekt in GitLab anlegen

1. Öffne GitLab unter http://gitlab:8880.
2. Erstelle bei Bedarf eine neue **Gruppe** (z. B. `tutorial`): **Menu → Groups → Create group**.
3. Erstelle innerhalb der Gruppe ein neues **Projekt** (z. B. `angular-sample`): **New project → Create blank project**.
   - Deaktiviere die Option "Initialize repository with a README", da wir ein bestehendes Repository pushen.

### Repository initialisieren und pushen

```bash
# In dieses Verzeichnis wechseln
cd repositories/angular-sample

# Git-Repository initialisieren
git init

# Remote hinzufügen (Gruppe und Projekt anpassen)
git remote add origin ssh://git@gitlab:2222/<gruppe>/angular-sample.git

# Alle Dateien hinzufügen und ersten Commit erstellen
git add .
git commit -m "Initial commit"

# Auf den Main-Branch pushen
git push -u origin main
```

## Lokal starten und bauen

### Voraussetzungen

- [Node.js](https://nodejs.org/) und npm

### Development Server

```bash
# Abhängigkeiten installieren
npm install

# Dev-Server starten
ng serve
```

Die Anwendung ist dann unter http://localhost:4200 erreichbar und lädt bei Codeänderungen automatisch neu.

### Produktions-Build

```bash
# Anwendung bauen
ng build
```

Die Build-Artefakte werden im Verzeichnis `dist/` abgelegt.

### Gebaute Anwendung mit Docker starten

```bash
# Multi-Stage Build (kein lokaler Build nötig)
docker build -f docker/Dockerfile-multi-stage -t recipes-app .

# Oder: Single-Stage Build (nach lokalem ng build)
docker build -f docker/Dockerfile -t recipes-app .

# Container starten
docker run --rm -p 4200:80 recipes-app
```

Die Anwendung ist dann unter http://localhost:4200 erreichbar.
