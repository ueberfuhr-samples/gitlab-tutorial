# Quarkus Sample – GitLab Tutorial

Dieses Projekt ist ein Quarkus-Backend (Recipes API Provider), das im Rahmen des GitLab-Tutorials als Beispielprojekt dient.

## Repository in GitLab pushen

### Projekt in GitLab anlegen

1. Öffne GitLab unter http://localhost:8880.
2. Erstelle bei Bedarf eine neue **Gruppe** (z. B. `tutorial`): **Menu → Groups → Create group**.
3. Erstelle innerhalb der Gruppe ein neues **Projekt** (z. B. `quarkus-sample`): **New project → Create blank project**.
   - Deaktiviere die Option "Initialize repository with a README", da wir ein bestehendes Repository pushen.

### Repository initialisieren und pushen

```bash
# In dieses Verzeichnis wechseln
cd repositories/quarkus-sample

# Git-Repository initialisieren
git init

# Remote hinzufügen (Gruppe und Projekt anpassen)
git remote add origin ssh://git@localhost:2222/<gruppe>/quarkus-sample.git

# Alle Dateien hinzufügen und ersten Commit erstellen
git add .
git commit -m "Initial commit"

# Auf den Main-Branch pushen
git push -u origin main
```

## Lokal starten und bauen

### Voraussetzungen

- Java 21+
- Maven (oder den mitgelieferten Maven Wrapper `./mvnw` verwenden)

### Development Mode

```bash
# Anwendung im Dev-Modus starten (Live Coding)
./mvnw quarkus:dev
```

Die Anwendung ist dann unter http://localhost:8080 erreichbar. Die Dev UI ist verfügbar unter http://localhost:8080/q/dev/.

### Produktions-Build

```bash
# Anwendung paketieren
./mvnw package
```

Das erzeugt die Datei `target/quarkus-app/quarkus-run.jar`.

### Gebaute Anwendung starten

```bash
java -jar target/quarkus-app/quarkus-run.jar
```

Die Anwendung ist dann unter http://localhost:8080 erreichbar.
