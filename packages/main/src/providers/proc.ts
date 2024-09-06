import { ChildProcess, fork } from 'child_process';
import EventEmitter from 'events';
import log from 'electron-log';
import { getAppPath } from '../helpers';
import { ProcState } from './types';

export class BaseProc<T extends {}> extends EventEmitter {
  private _jsPath: string;
  private _prefix: string;
  private _serverProcess: ChildProcess;

  constructor(prefix: string, jsPath: string) {
    super();
    this._jsPath = jsPath;
    this._prefix = `[${prefix.toUpperCase()}]`;
  }

  start = (options: T & { bootedLog: string }) => {
    try {
      this.emit(ProcState.STARTING);

      const params = Object.keys(options).map((key) => `--${key}=${options[key]}`);
      this._serverProcess = fork(this._jsPath, params, { cwd: getAppPath(), stdio: 'pipe' });

      this._serverProcess.stdout.on('data', (data) => {
        if (data.indexOf(options.bootedLog) > -1) {
          this.emit(ProcState.RUNNING);
        }
        log.info(`${this._prefix} stdout: ` + data);
      });

      this._serverProcess.stderr.on('data', (data) => {
        log.info(`${this._prefix} stderr: ` + data);
      });

      this._serverProcess.on('exit', (code) => {
        this.emit(ProcState.ENDED);
        log.info(`${this._prefix} exit: ` + code);
      });
    } catch (error) {
      this.emit(ProcState.ENDED);
      log.error(`${this._prefix} error: `, error);
    }
  };

  stop = () => {
    try {
      process.kill(this._serverProcess.pid, 'SIGTERM');
    } catch (error) {
      log.error(`${this._prefix}  error: `, error);
    } finally {
      this.emit(ProcState.ENDED);
    }
  };
}
