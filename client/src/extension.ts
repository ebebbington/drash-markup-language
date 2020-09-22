import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from 'vscode-languageclient';
import * as vscode from 'vscode';
const fs = require('fs')

let client: LanguageClient;

// const folderPath = vscode.workspace.workspaceFolders[0].uri.toString().split(":")[1];
// // try make .vscode for user  
// fs.mkdir(path.join(folderPath, '.vscode'), (err) => { 
//     if (err) { 
//       // .vscode already exists
//     } else {
//       vscode.window.showInformationMessage("Created the .vscode directory")
//     }
//     try {
//       if (fs.existsSync(path.join(folderPath, ".vscode/settings.json"))) {
//         // settings do exist
//         const settingsConfig =  workspace.getConfiguration('settings', vscode.workspace.workspaceFolders[0].uri);
//         settingsConfig.update("a", 'hello', vscode.ConfigurationTarget.Workspace) // todo doesnt work
//         vscode.window.showInformationMessage('Updated your settings')
//       } else {
//         // settings don't exist
//         fs.writeFile(path.join(folderPath, ".vscode/settings.json"), JSON.stringify({
//           "files.associations": {
//             "*.dml": "html"
//           }
//         }, null, 2))
//       }
//     } catch(err) {
//       // some error
//     }
// });

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
