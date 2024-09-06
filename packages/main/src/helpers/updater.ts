import { BrowserWindow, KeyboardEvent, MenuItem, dialog } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import { windowManager } from '../windows/manger';

export class Updater {
  constructor() {
    autoUpdater.logger = log;
    autoUpdater.autoDownload = false;
  }

  subscribe = () => {
    autoUpdater.on('error', (error) => {
      dialog.showErrorBox('Dashboard', error == null ? 'unknown' : (error.stack || error).toString());
    });

    autoUpdater.on('download-progress', (info) => {
      windowManager.getWindow('main')?.webContents.send('onDownloadUpdate', info);
    });

    autoUpdater.on('update-available', () => {
      dialog
        .showMessageBox({
          type: 'question',
          title: 'Dashboard',
          message: 'Found updates, do you want update now?',
          buttons: ['Yes', 'No'],
        })
        .then((msgBox) => {
          if (msgBox.response === 0) {
            autoUpdater.downloadUpdate();
          }
        });
    });

    autoUpdater.on('update-not-available', () => {
      dialog.showMessageBox({
        type: 'info',
        title: 'Dashboard',
        message: 'Current version is up-to-date.',
      });
    });

    autoUpdater.on('update-downloaded', () => {
      dialog
        .showMessageBox({
          type: 'info',
          title: 'Dashboard',
          message: 'Updates downloaded, application will be quit for update...',
        })
        .then(() => {
          setImmediate(() => autoUpdater.quitAndInstall());
        });
    });
  };

  checkForUpdatesAndNotify = (menuItem: MenuItem, browserWindow: BrowserWindow | undefined, event: KeyboardEvent) => {
    autoUpdater.checkForUpdatesAndNotify();
  };
}
