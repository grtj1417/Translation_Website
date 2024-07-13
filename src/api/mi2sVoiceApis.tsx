
const ASR_SERVER = "http://140.116.245.149:2802/asr"; // 辨識
const TTS_SERVER = "140.116.245.147"; // 合成（socket)
const TTS_HAKKA_SERVER = '140.116.245.147'; // 客語 TTS
const TRANS_SERVER = "http://140.116.245.157:1002/translation"; // 翻譯
const TL2CTL_SERVER = "140.116.245.157:2004"; // 台羅轉換至 CTL 伺服器
const ASR_INDO_DEEPL_SERVER =
    "http://140.116.245.147:9000/api/base64_recognition"; // 全新 ASR
const ASR_HAKKA_SERVER =
    'http://140.116.245.147:9001/api/base64_recognition'; // 客語 ASR

async function mi2sStt(
    b64String: string, recognizeLanguage: string
) {

    var serviceId: string = "";

    if (recognizeLanguage == "zh") {
        serviceId = 'A004';
    } else if (recognizeLanguage == "en") {
        serviceId = 'A006';
    } else if (recognizeLanguage == "id") {
        serviceId = 'A007';
    } else if (recognizeLanguage == "tai") {
        serviceId = 'A005';
    }


    if (recognizeLanguage == "id") {
        // 目前印尼文套用到 kevin 架設的 whisper API
        const response = await fetch(ASR_INDO_DEEPL_SERVER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "audio": b64String
                })
        });
        return response;
        
    } else if (origin == "hakka") {
        // 客語套用特定的 API
        const response = await fetch(ASR_HAKKA_SERVER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "audio": b64String
                })
        });
        return response;
    } else {
        const response = await fetch(ASR_SERVER, {
            // mode: "no-cors",
            method: "POST", 
            referrerPolicy: "unsafe-url",
            headers: {

                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "audio_data": b64String,
                "audio_format": "wav",
                "token": "2023@asr@MigrantWorkers",
                "service_id": serviceId
            })
        });
        return response;
    }
}
export {mi2sStt};