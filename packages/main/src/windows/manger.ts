import { BrowserWindow } from 'electron';

const Window = {
  main: 'main',
  scrcpy: 'scrcpy',
} as const;

type WindowKey = keyof typeof Window;

class Manager {
  private _windowIds = new Map<WindowKey, BrowserWindow>();

  addWindow(key: WindowKey, window: BrowserWindow) {
    this._windowIds.set(key, window);
  }

  removeWindow(key: WindowKey) {
    this._windowIds.delete(key);
  }

  getWindow(key: WindowKey): BrowserWindow | undefined {
    if (!this.hasWindow(key)) return undefined;
    return this._windowIds.get(key);
  }

  hasWindow(key: WindowKey) {
    return this._windowIds.has(key);
  }
}

export const windowManager = new Manager();
