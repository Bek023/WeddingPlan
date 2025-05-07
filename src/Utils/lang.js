import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector) 
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    welcome: "Welcome",
                    select_date: "Select a date"
                }
            },
            uz: {
                translation: {
                    welcome: "Xush kelibsiz",
                    select_date: "Sana tanlang"
                }
            },
            ru: {
                translation: {
                    welcome: "Добро пожаловать",
                    select_date: "Выберите дату"
                }
            }
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
