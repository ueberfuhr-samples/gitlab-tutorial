# Single-Stage Build: Setzt voraus, dass 'npm run build' bereits ausgeführt wurde
FROM nginx:alpine

# Umgebungsvariablen deklarieren
ENV API_BASE_URL=http://localhost:3000
ENV PRODUCTION=false

# Kopiere die bereits gebauten Dateien aus dem lokalen dist Ordner
COPY dist/recipes-app/browser /usr/share/nginx/html

# NGINX Konfiguration und Config-Template kopieren
COPY docker/resources/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/resources/config.template.json /config.template.json

# Entrypoint Skript kopieren und ausführbar machen
COPY docker/resources/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
