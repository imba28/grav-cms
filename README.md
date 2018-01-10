# ![](https://avatars1.githubusercontent.com/u/8237355?v=2&s=50) Alex Summer mit Grav
### Benutzung
`php -S localhost:8080 system/router.php` für Entwicklung.

Benutzer:
    `admin`
    `Keins123`

### Theme erstellen
Das DevTool Plugin installieren. `bin/gpm install devtools`

DevTool bietet für die Erstellung von Themes einen Manager. `bin/plugin devtools new-theme`
Das Tool stellt einige Fragen zum Theme, z. B Autor und E-Mail.

Ein Theme benötigt im Mindestumfang:

`blueprints.yaml` - Konfigurationsdatei für das Theme. Enthält Informationen zum Ersteller, Bugtracker, ...

`THEMENAME.php` - z. B alexsummer.php. Hier kann Logik programmiert werden. (z.B Hooks verwenden)

`THEMENAME.yaml` - Enthält Optionen, die das Theme eventuell benutzt. Hier kann ein Theme aktiviert werden.

`templates/` - Enthält alle Twig Template Dateien.