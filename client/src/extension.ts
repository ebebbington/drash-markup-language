import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from 'vscode-languageclient';

let client: LanguageClient;

const fs = require('fs')
fs.writeFile('abc.test', 'hello', function () {

})
//https://code.visualstudio.com/api/references/vscode-api#WorkspaceConfiguration
import * as vscode from 'vscode';
const folderPath = vscode.workspace.workspaceFolders[0].uri
  .toString()
  .split(":")[1];
  vscode.window.showInformationMessage('SAY WHAT WAS DONE')
// TODO: If user has no .vscode dir, make it. If user has no settings.json, make it. else add a new json property: https://stackoverflow.com/questions/36856232/write-add-data-in-json-file-using-node-js  
// try make .vscode for user  
fs.mkdir(path.join(folderPath, '.vscode'), (err) => { 
    if (err) { 

    }  else {
      vscode.window.showInformationMessage("Created the .vscode directory")
    }
}); 
// Check if they have a settings.json defined (so we don't override their actual settings)
const settingsConfig =  workspace.getConfiguration('settings', vscode.workspace.workspaceFolders[0].uri);
console.log(settingsConfig.get("configurations"))
settingsConfig.update("configurations", JSON.stringify({"name": "ed"}))

// write to settings.json
// fs.writeFile(path.join(folderPath, ".vscode/settings.json"), JSON.stringify({   // or config.update
//     "files.associations": {
//       "*.dml": "html",
//     }
// }, null, 2), err => {
//     if (err) {
//         vscode.window.showInformationMessage('vscode settings.json already exists')
//       // todo show error
//     }
//     console.log('make settings')
//     // todo show info message
//   });
settingsConfig.update('hello', 'buhbye') 

export function activate(context: ExtensionContext) {

  // The server is implemented in node
  let serverModule = context.asAbsolutePath(path.join('server', 'out', 'server.js'));
  // The debug options for the server
  // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
  let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  let serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions
    }
  };

  // Options to control the language client
  let clientOptions: LanguageClientOptions = {
    // Register the server for plain text documents
    documentSelector: [{ scheme: 'file', language: 'dml' }],
    synchronize: {
      // Notify the server about file changes to '.clientrc files contained in the workspace
      fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
    }
  };

  // Create the language client and start the client.
  client = new LanguageClient(
    'languageServerExample',
    'Language Server Example',
    serverOptions,
    clientOptions
  );

  // Start the client. This will also launch the server
  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
