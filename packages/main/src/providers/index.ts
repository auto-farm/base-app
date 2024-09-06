import { getMainJS } from '../helpers';
import { BaseProc } from './proc';

export const mainProc = new BaseProc<{}>('main', getMainJS());
