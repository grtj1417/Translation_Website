from flask import Flask, send_from_directory, request, jsonify
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
            "audio_data": audio_data,
}

    res = requests.post("http://140.116.245.147:9000/api/base64_recognition", json=reqData).json()
    selection = res['words_list'][0].replace("<SPOKEN_NOISE>", "").strip()

    return {"stt_output": selection, "message": "success"}
if __name__ == '__main__':
    app.run(ssl_context=('cert.pem', 'decrypted-key.pem'), host="0.0.0.0", debug=True, port=5173)
