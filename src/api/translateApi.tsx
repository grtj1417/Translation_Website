
async function translate(input: string, model: string){
    const url : string = "http://140.116.245.147:1002/translation";
    var data = {
        "translation_text" : input,
        "model" : model
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
export {translate};