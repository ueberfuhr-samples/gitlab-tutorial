# RecipesApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Docker
Es gibt zwei Möglichkeiten, die Anwendung mit Docker zu bauen:

### 1. Multi-Stage Build
Dieser Build-Prozess baut die Angular-Anwendung direkt im Docker-Container. Ein lokaler Build ist nicht erforderlich.

```bash
docker build -f docker/Dockerfile-multi-stage -t recipes-app .
```

### 2. Single-Stage Build (nach lokalem Build)
Dieser Build-Prozess kopiert die bereits lokal gebauten Ressourcen in den Container.

```bash
# 1. Lokal bauen
npm run build

# 2. Docker Container bauen
docker build -f docker/Dockerfile -t recipes-app .
```

### 3. Container starten
Um den gebauten Container zu starten und nach dem Beenden automatisch zu löschen, kann folgender Befehl verwendet werden:

```bash
docker run --rm -p 4200:80 recipes-app
```
Die Anwendung ist dann unter `http://localhost:4200` erreichbar.

#### Umgebungsvariablen
Die Anwendung unterstützt folgende Umgebungsvariablen zur Konfiguration zur Laufzeit:

- `API_BASE_URL`: Die Basis-URL der API (Standard: `http://localhost:3000`).
- `PRODUCTION`: Setzt das `production`-Flag (Standard: `false`).

Beispiel mit Umgebungsvariablen:
```bash
docker run --rm -p 4200:80 -e API_BASE_URL=https://my-api.example.com -e PRODUCTION=true recipes-app
```

---

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
