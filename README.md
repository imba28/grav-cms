# ![](https://avatars1.githubusercontent.com/u/8237355?v=2&s=50) Alex Summer mit Grav

### Über Grav
Grav ist ein dateibasiertes Content Management System, das heißt, es benötigt zum Betrieb keine Datenbank.
Seiten werden in `user/pages` gespeichert. Seiten können beliebig viele Unterseiten besitzen.

# ![](https://learn.getgrav.org/user/pages/02.content/01.content-pages/page-folders.png)

Eine Seite wird durch eine .md Datei repräsentiert.
z.B `/user/pages/home/default.md`
Der Name der Datei legt das Template fest. Optional kann das Theme auch im Page Header überschrieben werden:
```yaml
---
template: custom
---
```

Eine Seite besteht aus Header und Inhalt. Die Header Einstellungen befinden sich zwischen den --- und stehen immer am Anfang der Datei. Hier lassen sich spezifische Einstellungen für die jeweilige Seite festlegen.
Der Inhalt der Seiten ist als Markdown gespeichert und steht nach dem schließenden ---.

__Beispiel__

```
---
title: 'Über mich'
published: true
---
# Hallo Welt
Mein Name ist XY....

```

### Benutzung

Admin Panel installieren: Empfohlen zum schnellen Erstellen und Editieren von Inhalten.

`bin/gpm install admin`

PHP Webserver starten: nur für Entwicklung empfohlen.

`php -S localhost:8080 system/router.php`

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

DevTools nimmt uns die Erstellung der Ordnerstruktur des Themes ab.

#### Styles

Die Sass Dateien nach `/user/themes/THEMENAME/scss` kopieren. Über die Kommandozeile lässt sich ein Sass Watch Dog starten, der auf Änderungen in `scss` reagiert (ähnlich wie webpack oder gulp browser-sync für Styles).

`scss --watch scss:css-compiled`

Das Script erstellt eine kompilierte Version der Stylesheets mit Source Maps im Ordner css-compiled. Diese Datei muss im Head unsers Templates eingebunden werden.

#### Templates

Grav CMS verwendet die PHP Template Engine [Twig](https://twig.symfony.com/). Twig bietet die Möglichkeit Templates zu entwickeln, ohne dabei PHP schreiben zu müssen. Außerdem erlaubt es eine Art von Vererbung von Templates.
Twig Templates sollten einen Dateinamen nach dem Schema `<NAME>.html.twig` tragen.

`{% .... %}` führt ein Statement aus.

`{{ .... }}` gibt eine Expression aus

`{# Ich bin ein Kommentar #}`

##### Beispiele
Loop über ein Array:
```twig
{% for item in navigation %}
    <li><a href="{{ item.href }}">{{ item.caption }}</a></li>
{% endfor %}
```
Ausgabe von `Hello World`:
```twig
{% set variable = 'Hello World' %}
{{ variable }}
```

Die Basis unseres Themes befindet sich in `templates/partials/base.html.twig`. Es enthält Head und Body. Im Block `stylesheets` werden mit `{% do assets.addCss('theme://css-compiled/template.css', 98) %}`
die Stylesheets eingebunden. Eventuell muss vorher `scss.sh` einmal ausgeführt werden.

Das Plugin DevTools erstellt für uns einige default Templates (default und error). Es lassen sich beliebig weitere Templates hinzufügen. Jene Dateien, die sich direkt in `/templates` befinden, lassen sich als Template für eine Seite festlegen.

Die Templates "erben" ihren Inhalt von `base.html.twig`, welches die Struktur des Dokuments vorgibt. Blöcke, die in base definiert wurden, lassen sich in den "erbenden" Templates überschreiben:

__Homepage__

###### home.md
Collections festlegen:
```yaml
---
title: Home
menu: Start
news:
    items:
        '@page.children': /news
    order:
        by: date
        dir: desc
    limit: 3
portfolio:
    items:
        '@page.children': /portfolio
    order:
        by: date
        dir: desc
    limit: 3
---
```

###### frontpage.html.twig:

```twig
{% extends 'partials/base.html.twig' %}

{% block hero %}
    <section class="hero flex" style="background-image: url({{ url("theme:///images/hero.jpg") }}">
        <div class="container flex">
            <div class="slogan">
                <span>Webdesign mit Sinn und Zweck und XYZ</span>
                <div>
                    <a href="javascript:void(0)" class="button d-i-block">Angebot einholen</a>
                </div>
            </div>
        </div>
    </section>
{% endblock %}

{% block content %}
    <section class="leistungen">
        <h1>Leistungen</h1>
        <div class="articles">
            <article>
                <div class="inner">
                    <h3>Design</h3>
                    <div class="icon">
                        <img src="{{ url("theme://images/design.png") }}" alt="design-icon"/>
                    </div>
                </div>
            </article>
            <article>
                <div class="inner">
                    <h3>Strategie</h3>
                    <div class="icon">
                        <img src="{{ url("theme://images/strategy.png") }}" alt="strategy-icon"/>
                    </div>
                </div>
            </article>
            <article>
                <div class="inner">
                    <h3>Consulting</h3>
                    <div class="icon">
                        <img src="{{ url("theme://images/consulting.png") }}" alt="consulting-icon"/>
                    </div>
                </div>
            </article>
        </div>
    </section>
    <section class="news">
        <h1>News</h1>
        <div class="articles">
            {% for p in news_collection('news') %}
                {% if p.header.header_image %}
                    {% set header_image =  p.media.images[p.header.header_image].url %}
                {% else %}
                    {% set header_image = 'http://via.placeholder.com/150x150' %}
                {% endif %}
                <article>
                    <div class="inner">
                        <a href="{{ p.url }}">
                            <img src="{{ header_image }}" alt="placeholder"/>
                            <h3>{{ p.title }}</h3>
                        </a>
                    </div>
                </article>
            {% endfor %}
        </div>
    </section>
    <section class="referenzen">
        <h1>Referenzen</h1>
        <div class="articles">
            {% for p in portfolio_collection('portfolio') %}
                {% if p.header.header_image %}
                    {% set header_image =  p.media.images[p.header.header_image].url %}
                {% else %}
                    {% set header_image = 'http://via.placeholder.com/150x150' %}
                {% endif %}
            <article>
                <div class="inner">
                    <a href="{{ p.url }}">
                        <img src="{{ header_image }}" alt="placeholder"/>
                        <h3>{{ p.title }}</h3>
                    </a>
                </div>
            </article>
            {% endfor %}
        </div>
    </section>
{% endblock %}
```


__Über mich Seite__
###### about.html.twig:

```twig
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

Das Template `about.html.twig` fügt Inhalte in die Blöcke `hero` und `content` ein.

Mittels Blueprints lassen sich weitere Felder für dieses Template anlegen. Beispielsweise legen wir hier eigene Felder für die Überschriften im Hero Bereich an.
Das macht das Verwalten um einiges einfacher.

Blueprints werden in `blueprints/TEMPLATENAME.yaml` gespeichert. Für unsere About Template legen wir folgende Datei an:

```yaml
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
              label: Hero headline

            header.subline:
              type: text
              label: Hero subline

            header.avatar:
              type: filepicker
              label: Avatar
              preview_images: true
              folder: '@self'
              help: image filename that exists in the page folder. If not provided, will use the first image found.
```

Jetzt gibt es für alle Seiten, die das Template  `about` verwenden, im Adminbereich einen weiteren Tab `Theme`, in dem wir weitere Inhalte speichern können.

Alternativ lassen sich die Inhalte direkt in den Metadaten der Seite einfügen:

```yaml
---
title: 'Über mich'
headline: 'Hallo, ich heiße Alex!'
subline: ' Ich bin Webdeveloper mit Leib und Seele.'
---
```

Im Template kann auf diese Inhalte z.B mit `page.header.headline` zugegriffen werden.