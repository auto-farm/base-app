import { Menu, MenuItemConstructorOptions } from 'electron';
import { Updater } from './updater';

export function createMenus() {
  const updater = new Updater();
  updater.subscribe();

  const menu = Menu.buildFromTemplate([
    { role: 'appMenu' },
    { role: 'editMenu' },
    { role: 'viewMenu' },
    { role: 'windowMenu' },
    {
      label: 'Help',
      submenu: [{ label: 'Check for Updates...', click: updater.checkForUpdatesAndNotify }],
    },
  ] as MenuItemConstructorOptions[]);

  Menu.setApplicationMenu(menu);
}
