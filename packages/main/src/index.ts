import { BrowserWindow, Event, app, session } from 'electron';

import { createMenus } from './helpers/menu';
// import { mainProc } from './providers';
import { createMainWindow } from './windows/main.window';

async function createWindow() {
  // Create the browser window.
  await createMainWindow();
  createMenus();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // const filter = {
  //   urls: ['*://*/*'],
  // };

  // session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  //   callback({ requestHeaders: details.requestHeaders });
  // });

  // session.defaultSession.webRequest.onHeadersReceived(filter, (details, callback) => {
  //   if (details.url.indexOf('localhost') === -1) console.log(details.url);
  //   // details.responseHeaders['cross-origin-opener-policy'] = ['same-origin'];
  //   // details.responseHeaders['cross-origin-embedder-policy'] = ['require-corp'];
  //   callback({ responseHeaders: details.responseHeaders });
  // });

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('quit', (e: Event) => {
  // mainProc.stop();
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
