import path from 'path';

export function isProduction() {
  return process.env.NODE_ENV === 'production';
}

export function getInitialURL() {
  return isProduction() ? `file://${path.resolve(__dirname, 'index.html')}` : 'http://localhost:5173';
}

export function getAppPath() {
  return path.resolve(__dirname, '..');
}

export function getResourcePath(fileName: string) {
  return path.resolve(getAppPath(), 'resources', fileName);
}

export function getMainJS() {
  return path.resolve(getAppPath(), 'dist', 'main.js');
}
