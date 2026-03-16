# 🤖 GitLab Duo Setup Guide (Self-Managed & HTTPS)

Dieses Handbuch beschreibt die Aktivierung von GitLab Duo (KI-Features) für deine lokale Instanz auf dem Mac, inklusive der Umgehung von SSL-Problemen bei selbstsignierten Zertifikaten.

---

## 1. 🔑 Ultimate Trial-Key anfordern
Da GitLab Duo eine Enterprise-Lizenz erfordert, nutzen wir die 30-Tage-Testversion.

1. Besuche die zentrale **[GitLab Free Trial Seite](https://about.gitlab.com/free-trial/)**.
2. Wähle dort den Bereich **"GitLab Self-Managed"** aus (oft unter "Compare Plans" oder direkt als Option).
3. Falls der Link nicht direkt zum Formular führt: Registriere dich im **[GitLab Customer Portal](https://customers.gitlab.com/)**.
4. Wähle im Portal **"Try GitLab Ultimate"**.
5. Du erhältst einen **Activation Code** (für Cloud-Aktivierung) oder eine `.gitlab-license` Datei per E-Mail.

---

## 2. 📑 Lizenz & Features aktivieren

### Lizenz hinterlegen
1. Melde dich als **Admin** an (`https://gitlab:4443`).
2. Navigiere zu **Admin Area** (Sechseck-Icon) > **Subscription**.
3. Klicke auf **Add License**.
    - Nutze den **Activation Code**, falls du Internetzugriff vom Container aus hast.
    - Lade die **Lizenz-Datei** hoch, falls du den Code nicht nutzen kannst.

### Duo aktivieren & Sitze zuweisen
1. Gehe zu **Admin Area** > **Settings** > **General** > **AI-powered features**.
2. Aktiviere **"Enable GitLab Duo features"**.
3. Gehe zu **Admin Area** > **Usage Quotations** > Tab **GitLab Duo**.
4. Weise deinem Benutzer einen **Seat** zu (Regler auf "On").

---

## 3. 💻 IDE-Integration

### Vorbereitung: Personal Access Token (PAT)
Erstelle in GitLab unter **User Settings** > **Access Tokens** einen Token:
- **Name:** `IDE-Integration`
- **Scopes:** `api`, `read_user`
- Kopiere den Token sofort!

---

### A. Setup für Visual Studio Code
1. Installiere die Extension **"GitLab Workflow"**.
2. Öffne die Einstellungen (`Cmd + ,`) und suche nach `GitLab`.
3. Trage unter **GitLab: Instance Url** ein: `https://gitlab:4443`.
4. Drücke `Cmd + Shift + P` > `GitLab: Add Account` und gib deinen PAT ein.

**SSL-Fix (Self-Signed):**
Suche in den VS Code Settings nach `Http: Proxy Strict SSL` und setze den Haken auf **false**.

---

### B. Setup für IntelliJ IDEA
1. Installiere das Plugin **"GitLab Duo"** über den Marketplace.
2. Gehe zu **Settings** > **Tools** > **GitLab Duo**.
3. Klicke auf **Add Account**, trage `https://gitlab:4443` und deinen PAT ein.

**SSL-Fix (Zertifikat importieren):**
1. Gehe zu **Settings** > **Tools** > **Server Certificates**.
2. Klicke auf das **+** und wähle deine Datei `shared/ssl/gitlab.crt` aus.
3. Aktiviere **"Accept non-trusted certificates automatically"**.

---

## 4. 🛡️ macOS System-Check (Optional)
Damit der Mac dem Zertifikat systemweit vertraut und Browser-Warnungen verschwinden:

1. Öffne die App **Schlüsselbundverwaltung** (Keychain Access).
2. Ziehe die Datei `shared/ssl/gitlab.crt` in den Bereich **System**.
3. Doppelklick auf das Zertifikat > **Vertrauen** (Trust) > **Immer vertrauen**.