// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "TITLE_TEXT":"Mi2s MultiLingual Translation Pre-Post processing displaying website",
            "select_language": "Select Language",
            "input_language": "Enter text",
            "translate": "Translate",
            "pre-processed": "Pre-processed",
            "result": "Result",
            "history": "History",
            "input": "Input",
            "post-processing": "Post-processing",
            
        }
    },
    zh: {
        translation: {
            "TITLE_TEXT":"Mi2s 多語翻譯前處理後處理展示網頁",
            "select_language": "選擇語言",
            "input_language": "輸入文字",
            "translate": "翻譯",
            "pre-processed": "前處理",
            "result": "結果",
            "history": "歷史紀錄",
            "input": "輸入",
            "post-processing": "後處理",
        }
    },
    id: {
        translation: {
            "TITLE_TEXT":"Halaman web tampilan pra-pemrosesan dan pasca-pemrosesan terjemahan multibahasa Mi2s",
            "select_language": "Pilih Bahasa",
            "input_language": "Masukkan teks",
            "translate": "Terjemahkan",
            "pre-processed": "Pra-pemrosesan",
            "result": "Hasil",
            "history": "Catatan Sejarah",
            "input": "Memasuki",
            "post-processing": "Pengolahan pasca",
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
