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

DevTools erstellt für uns einige default Templates (default und error). Es lassen sich beliebig weitere Templates hinzufügen.

Hier ein Beispiel für die Über mich Seite:
```html
{% extends 'partials/base.html.twig' %}

{% block hero %}
    <section class="about-hero">
      <h1>{{ page.header.headline }}</h1>
      <h2>{{ page.header.subline }}</h2>
    </section>
{% endblock %}
{% block content %}
    <section class="about">
        {% if page.header.avatar %}
            {{ page.media.images[page.header.avatar] }}
        {% endif %}
        <article>
          <h1>{{ page.title }}</h1>
          <p>
            {{ page.content }}
          </p>
        </article>
    </section>
{% endblock %}
```

Das Template `about.html.twig` hat Inhalte im Block `hero` und `content`. Mittels Blueprints lassen sich weitere Felder für dieses Template anlegen. Beispielsweise legen wir hier eigene Felder für die Überschriften im Hero Bereich an.
Blueprints werden in `blueprints/TEMPLATENAME.yaml` gespeichert. Für unsere About Template legen wir diese Datei an:

```
title: About
'@extends':
    type: default
    context: blueprints://pages

form:
  fields:
    tabs:
      fields:
        blog:
          type: tab
          title: Theme

          fields:

            header.headline:
              type: text
              label: Headline

            header.subline:
              type: text
              label: Subline

            header.avatar:
              type: filepicker
              label: Avatar
              preview_images: true
              folder: '@self'
              help: image filename that exists in the page folder. If not provided, will use the first image found.
```