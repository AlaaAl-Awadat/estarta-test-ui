/* eslint-disable max-len */
import i18next, {changeLanguage, init} from 'i18next';
// Start Layouts Common (shared)
import SharedEn from '../assets/i18n/en.json';
import SharedAr from '../assets/i18n/ar.json';
// End Layouts Common (shared)

// Start Pages
import AdministrationPageEn from '../pages/administration/i18n/en.json';
import AdministrationPageAr from '../pages/administration/i18n/ar.json';
// End Pages

let isInitializedLanguage = false;

const languageInit = () => {
  if (localStorage.getItem('platform_language')) {
    changeLanguage(localStorage.getItem('platform_language') as string);
    const isRtl = i18next.dir(localStorage.getItem('platform_language') as string) === 'rtl';
    if (isRtl) {
      const direction = i18next.dir(localStorage.getItem('platform_language') as string);
      document.body.classList.add(direction);
      document.body.setAttribute('dir', direction);
      document.documentElement.lang = localStorage.getItem('platform_language') as string;
    }
  } else localStorage.setItem('platform_language', 'en');
};
export const I18n = () => {
  if (isInitializedLanguage) return;
  isInitializedLanguage = true;
  init({
    interpolation: { escapeValue: false }, // React already does escaping
    fallbackLng: ['en', 'ar'],
    lng: 'en', // language to use
    resources: {
      en: {
        Shared: SharedEn,
        AdministrationPage: AdministrationPageEn,
      },
      ar: {
        Shared: SharedAr,
        AdministrationPage: AdministrationPageAr,
      },
    },
  });
  languageInit();
};

export const languageChange = (currentLanguage: string) => {
  const direction = i18next.dir(currentLanguage);
  localStorage.setItem('platform_language', currentLanguage);
  if (document.body.classList.contains('rtl')) document.body.classList.remove('rtl');
  if (document.body.classList.contains('lrt')) document.body.classList.remove('lrt');
  document.body.classList.add(direction);
  document.body.setAttribute('dir', direction);
  document.documentElement.lang = currentLanguage;
  changeLanguage(currentLanguage);
};
