from flask import Flask, send_from_directory
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

if __name__ == '__main__':
    app.run(ssl_context=('cert.pem', 'decrypted-key.pem'), host="0.0.0.0", debug=True, port=5173)
