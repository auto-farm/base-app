import path from 'path';
import { BrowserWindow } from 'electron';
import { getInitialURL } from '../helpers';

export async function createMainWindow() {
  const window = new BrowserWindow({
    title: 'Dashboard',
    width: 1280,
    height: 720,
    webPreferences: {
      webSecurity: false,
      contextIsolation: true,
      preload: path.resolve(__dirname, 'preload.js'),
    },
  });

  await window.loadURL(getInitialURL());
}
