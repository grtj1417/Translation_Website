from flask import Flask, send_from_directory, request, jsonify, send_file
from synthesis import Client
import base64
import json
import requests
import os

app = Flask(__name__, static_folder='dist')

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    file_path = os.path.join(app.static_folder, path)
    if os.path.exists(file_path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid input"}), 400
    url = data.get('url')
    model = data.get('model')
    translation_text = data.get('translation_text')

    data = requests.post(url, data={"translation_text": translation_text, "model": model})
    print(data.json())
    return data.json()

@app.route('/stt', methods=['POST'])
def stt():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid input"}), 400

    audio_data = data.get('audio_data')
    audio_format = data.get('audio_format')
    token = data.get('token')
    service_id = data.get('service_id')

    reqData = {
            "audio_data": audio_data,
            "audio_format": audio_format,
            "token": token,
            "service_id": service_id,}

    res = requests.post("http://140.116.245.149:2802/asr", json=reqData).json()
    selection = res['words_list'][0].replace("<SPOKEN_NOISE>", "").strip()

    return {"stt_output": selection, "message": "success"}

@app.route('/sttIndo', methods=['POST'])
def sttIndo():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid input"}), 400
    
    audio_data = data.get('audio')
    reqData = {
            "audio": audio_data,
    }

    res = requests.post("http://140.116.245.147:9000/api/base64_recognition", json=reqData)
    
    return {"stt_output": res.text, "message": "success"}

@app.route('/tts', methods=['POST'])
def tts():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid input"}), 400

    audio_text = data.get("text")
    audio_language = data.get("language")
    audio_speaker = data.get("speaker")
    client = Client()
    client.send(audio_language, audio_speaker, audio_text)
    result = client.receive()
    response_data = json.loads(result.decode("utf-8"))
    # 先 save file 再送 file
    client.close()
    if not result:
        print('No result')
    else:
        response_data = json.loads(result.decode("utf-8"))
        print(response_data['status'])
        if response_data.get("status", False):  
            result_file_data = base64.b64decode(response_data.get("bytes", ""))
            with open(f"output.wav", 'wb') as f:
                f.write(result_file_data)
            print("File received complete")
            
    return send_file("output.wav")


if __name__ == '__main__':
    app.run(ssl_context=('cert.pem', 'decrypted-key.pem'), host="0.0.0.0", debug=True, port=5173)
