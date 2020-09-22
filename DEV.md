## `package.json`

This pretty much defines our language, and initialises it.

## `syntaxes/dml.tmLanguage.json`

This file is what we use to style everything.

Inside `repository.keyword.patterns`, we can define styling for certain blocks. For example that's how we define what a comment is, and how to style it. It is also how we tell the editor to use javascript for styling things like `user.name` on it's own, and to add custom styling for our `<%|%>`.

Saying that, we dont need the comment block as a new objext in patterns:
```json
{
  "name": "comment.block",
  "begin": "<!--",
  "end": "-->"
},
```
Because the html directive already takes care of it

To extend onto the styling, just add a new block.

* keywords is, well for keywords, by default this was things like `for`, `if` etc

* I have also stripped out the following as i don't think it's needed cause we use hthe html directive:
```
// eg repository.strings, or { repository: { strings: ... }}
"strings": {
  "name": "string.quoted.double.dml",
  "begin": "\"[^<]",
  "end": "\"",
  "patterns": [
    {
	  "name": "constant.character.escape.dml",
	  "match": "\\\\."
	}
   ]
}
```

## Debugging

CRTL+SHIFT+P -> Inspect editor and token scopes. Search for this when debugger is running and it will give info on your language

## How we showed code in strings

This was how to highlight code in a string, eg `<div data-name="<% user.name %>">`

We need to create an injection. This was done by adding a block to package.json, a new grammer to pick up our injection.

We then create the injection in syntaxes directory. Note that `L` means left, or on top of. so PRETTY MUCH WE TELL That injection to sit above the html double quotes strings, and re-add the pattern for our code from dml.tmLanguage.json

## Adding Diagnostics (squiggly line in invalid syntax, then errors show when hovering)

These are registered by our language server, inside server/src/server.ts. We create diagnostics, and if we read the document and match some regex, then push a new diagnostic. In our example, we have multiple regexes, to show squiggly lines ofr example if a user does `<%user.name%>`

To extend it, just copy and paste a new `while` block - there might be a more efficient way of registering diagnostics, but this does well for the time being

TODO
* Add code completion for template engine
* add code completion for html
* add more validations in server
* try make the extension force to user to use the below conf, whether it's updating their settings.json file, or somehow have this extension have it's own
```
{  
    "files.associations": {
      "*.dml": "html",
    }
}
```

##  Building  and running/debugging

We just need  to install the dependencies, and run the TS compiler :)

`npm i; npm run build; cd server;  npm  i; cd ../client; npm i; cd ../`

`npm run build` in the root directory also build the client and js code