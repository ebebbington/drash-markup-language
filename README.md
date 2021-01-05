<p align="center">
  <img height="200" src="./dml-logo.png" alt="Drash Markup Language Logo">
  <h1 align="center">Drash Markup Language</h1>
</p>
<p align="center">Drash Markup Language, a VSCode plugin for [Drash's](https://drash.land/drash) [template engine](https://drash.land/drash/tutorials/template-engine)</p>
<p align="center">
  <a href="https://github.com/ebebbington/drash-markup-language/releases">
    <img src="https://img.shields.io/github/release/ebebbington/drash-markup-language.svg?color=bright_green&label=latest">
  </a>
  <a href="https://github.com/ebebbington/drash-markup-language/actions">
    <img src="https://img.shields.io/github/workflow/status/drashland/deno-drash/master?label=ci">
  </a>
  <a href="https://discord.gg/SgejNXq">
    <img src="https://img.shields.io/badge/chat-on%20discord-blue">
  </a>
  <a href="https://twitter.com/drash_land">
    <img src="https://img.shields.io/twitter/url?label=%40drash_land&style=social&url=https%3A%2F%2Ftwitter.com%2Fdrash_land">
  </a>
  <a href="https://rb.gy/vxmeed">
    <img src="https://img.shields.io/badge/Tutorials-YouTube-red">
  </a>
  <a href="https://github.com/ebebbington/drash-markup-language/actions">
    <img src="https://img.shields.io/github/workflow/status/ebebbington/drash-markup-language/CodeQL?label=CodeQL">
  </a>
  <a href="https://sonarcloud.io/dashboard?id=ebebbington_drash-markup-language">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=ebebbington_drash-markup-language&metric=alert_status">
  </a>
</p>

---

Drash Markup Language (dml) provides new language support and a LSP for `.dml` files. `.dml` files are just like `.html` files, but provide a better user experience when using Drash's templatee engine, by:

* Highlighting template code and tags

* Providing diagnostics for incorrect or invalid usage of the template code

* Supports autocompletion and highlights for HTML by default

## Quick Start

1. [Install the extnesion for VSCode](link to the plugin)

2. Enable HTML support

Create a `.vscode/settings.json`:

```
{
    "files.associations": {
        "*.dml": "html"
    }
}
```

3. Create a Drash resource and server:


```typescript
import { Drash } from "https://deno.land/x/drash@<lastest_version>/mod.ts";

class Resource extends Drash.Http.Resource {
    static paths = ["/"];

    public GET () {
        this.response = this.response.render("/index.dml", {
            username: "Drash Markup Language",
            runtimes: ["Node", "Deno"]
        });
        return this.response
    }
}

const server = new Drash.Http.Server({
    resources: [Resource],
    views_path: "./views",
    template_engine: true
});

server.run({
    hostname: "localhost",
    port: 1337
});
```

4. Create a `index.dml` file and start writing markup, using Drash's template engine syntax:

```html
// views/index.dml
<body>
  <p><% username %></p>
  <ul>
  <%
    for (const runtime in runtimes) {
        <li><% runtime %></li>
    }
  %>
</body>
```

## Features

* Highlighting template code and tags

SCREENSHOT/ANIMATION

* Providing diagnostics for incorrect or invalid usage of the template code

SCREENSHOT/ANIMATION

* Supports autocompletion and highlights for HTML by default

SCREENSHOT/ANIMATION

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Acknowledgments

* [@SRNV](https://github.com/SRNV) - Rudy helped a lot on the Language Support side, answering any queries, helping solve problems found, and just getting it up andd running. Huge thanks.
* [@crooske](https://github.com/crookse) - Eric had the idea of creating a template engine, and to create full support for using it, such as turning it into a new language, and creating the idea of IDE extensions/plugins.
