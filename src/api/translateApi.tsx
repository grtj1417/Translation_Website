
async function translate(input: string, model: string) {
    const url: string = "http://140.116.245.147:1002/translation";
    var data = {
        "translation_text": input,
        "model": model
    };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('There was an error!', error);
        throw error;
    }
}

async function mi2s_translation(src: string, tgt: string, inputString: string) {
    const specialurl: string = "http://140.116.245.147:1002/translation";
    const normalurl: string = "http://140.116.245.157:1002/translation";
    var model: string = "";
    console.log(src, tgt);
    // 可以把下面這個 if else 收起來
    if (src == "zh") {
        if (tgt == "en") {
            model = 'zh2en_0406Osborn';
        } else if (tgt == "id") {
            model = 'zh2id_0528';
        } else if (tgt == "tai") {
            model = 'zh2tai';
        } else if (tgt == "hakka") {
            model = 'zh2hakka';
        }
    } else if (src == "en") {
        if (tgt == "zh") {
            model = 'en2zh_0416Osborn';
        } else if (tgt == "id") {
            model = 'en2id';
        } else if (tgt == "tai") {
            model = 'en2tai';
        } else if (tgt == "hakka") {
            model = 'en2hakka';
        }
    } else if (src == "id") {
        if (tgt == "zh") {
            model = 'id2zh_kevin';
        } else if (tgt == "tai") {
            model = 'id2tai';
        } else if (tgt == "en") {
            model = 'id2en';
        } else if (tgt == "hakka") {
            model = 'id2hakka';
        }
    } else if (src == "tai") {
        if (tgt == "zh") {
            model = 'tai2zh';
        } else if (tgt == "id") {
            model = "tai2id";
        } else if (tgt == "en") {
            model = 'tai2en';
        } else if (tgt == "hakka") {
            model = 'tai2hakka';
        }
    } else if (src == "hakka") {
        if (tgt == "zh") {
            model = 'hakka2zh';
        } else if (tgt == "id") {
            model = "hakka2id";
        } else if (tgt == "en") {
            model = 'hakka2en';
        } else if (tgt == "tai") {
            model = 'hakka2tai';
        }
    }


    var data = {
        "translation_text": inputString,
        "model": model
    };
    console.log(data);
    // 如果跟印尼文有相關 call 147 
    var isSpecial: boolean = src == "zh" && tgt == "id";
    var url: string = isSpecial ? specialurl : normalurl;

    try {
        console.log(url);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const responseData = await response.json();
        if (isSpecial) {
            return responseData;
        } else {
            var translatedText: string = responseData.after_translation;
            var emptyData = {
                "after_translation": {
                  "bpe_applied": "xxx",
                  "candidates": [translatedText, "", "", "", ""],
                  "domain": "FOOD",
                  "synonymSub": "",
                  "nerSub": "xxx",
                  "postProcessedSentences": [translatedText, "", "", "", ""],
                  "raw_translation": [translatedText, "", "", "", ""]
                },
                "before_translation": responseData.before_translation,
                "message": responseData.message,
              };
            return emptyData;
        }
    } catch (error) {
        console.error('There was an error!', error);
        throw error;
    }
}



export { translate, mi2s_translation };