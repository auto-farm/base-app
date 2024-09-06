import 'react-i18next';
import { IPC } from '@dashboard/common';
import common from '../translations/en/common.json';

declare module 'react-i18next' {
  // and extend them!
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    defaultNS: 'common';
    // custom resources type
    resources: {
      common: typeof common;
    };
  }
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
}

declare global {
  interface Window {
    electronAPI: IPC;
  }
}
