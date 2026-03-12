#!/bin/sh

# Standardwerte setzen, falls nicht vorhanden
export API_BASE_URL=${API_BASE_URL:-http://localhost:3000}
export PRODUCTION=${PRODUCTION:-false}

# Platzhalter in der config.template.json ersetzen und als config.json speichern
envsubst '${API_BASE_URL} ${PRODUCTION}' < /config.template.json > /usr/share/nginx/html/config.json

# NGINX starten
exec "$@"
