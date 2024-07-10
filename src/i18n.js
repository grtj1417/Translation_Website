// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "select_language": "Select Language",
            "input_language": "Leave a comment here",
            "translate": "Translate"
        }
    },
    zh: {
        translation: {
            "select_language": "選擇語言",
            "input_language": "輸入文字",
            "translate": "翻譯"
        }
    },
    id: {
        translation: {
            "select_language": "Pilih Bahasa",
            "input_language": "Bahasa Input",
            "translate": "Terjemahkan"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'zh',
        keySeparator: false,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
