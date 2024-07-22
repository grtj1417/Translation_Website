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
            "post-processing": "Translation Result",
            "country": "Country",
            "ENGTAG": "English",
            "ZHTAG": "Chinese",
            "INDOTAG": "Indonesian",
            "INPUT": "Input",
            "SYNONYM": "Synonym Substituted",
            "NERREPL": "NER Substituted",
            "RAWOUTPUT": "Raw Output",
            "POSTPROCESSED": "Post processed",
            "NERREPLBACK": "NER Substite Back",
            "POSTTAG": "PostProcessed",
            "CAND": "Candidates",
            "ISPREPOST":"Do you use pre- and post-processing?"

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
            "post-processing": "翻譯結果",
            "country": "國家",
            "ENGTAG": "英文",
            "ZHTAG": "中文",
            "INDOTAG": "印尼文",
            "INPUT": "輸入",
            "SYNONYM": "同義詞替換後",
            "NERREPL": "NER 替換後",
            "RAWOUTPUT": "模組輸出",
            "POSTPROCESSED": "後處理後",
            "NERREPLBACK": "NER 替換回",
            "POSTTAG": "後處理",
            "CAND": "原始翻譯",
            "ISPREPOST":"是否使用前後處理?"
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
            "post-processing": "Hasil terjemahan",
            "country": "Bangsa",
            "ENGTAG": "Inggris",
            "ZHTAG": "Cina",
            "INDOTAG": "Bahasa Indonesia",
            "INPUT": "Masukan",
            "SYNONYM": "Setelah Penggantian Sinonim",
            "NERREPL": "Setelah Penggantian NER",
            "RAWOUTPUT": "Keluaran Modul",
            "POSTPROCESSED": "Setelah Pasca Proses",
            "NERREPLBACK": "Penggantian NER Kembali",
            "POSTTAG": "Pasca Proses",
            "CAND": "Terjemahan Asli",
            "ISPREPOST":"Apakah Anda menggunakan pra dan pasca pemrosesan?"
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
