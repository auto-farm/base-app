import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enC from './translations/en/common.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  defaultNS: 'common',
  resources: {
    en: {
      common: enC,
    },
  },
});
