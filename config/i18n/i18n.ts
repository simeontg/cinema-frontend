import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LazyImportPlugin from './LazyImportPlugin';


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LazyImportPlugin)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'bg'],
    defaultNS: 'common',
    load: 'languageOnly',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    returnEmptyString: true,
    backend: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
