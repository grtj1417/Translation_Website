import socket
import json
import base64
import time
import argparse
import time
"""
    給所有人的說明:
    1. 此程式碼為語音合成的 client 端，支援五種語言 (國、台、客語、英語、印尼語)
    2. 共有三個參數可以輸入，分別為語言(language)、語者(speaker)、文字(text)
    3. 具體使用可以參考以下範例
        python client.py --language zh --speaker 4813 --text "你好啊朋友"
    4. 跨語言合成目前尚未實作完畢
    5. - 國語請在語言參數輸入 zh
       - 台語請在語言參數輸入 tw
       - 客語請在語言參數輸入 hakka
       - 英語請在語言參數輸入 en
       - 印尼語請在語言參數輸入 id
    6. 語者代碼請參考 speaker.json，目前支援最多 4821 位語者
    7. 常用名單如下:
        {
            2775|F01   # 實驗室內部錄音人員 (女性, 台語語者)
            2792|F06   # 實驗室內部錄音人員 (女性, 台語語者)
            2794|F14   # 實驗室內部錄音人員 (女性, 台語語者)
            4793|M60   # 實驗室內部錄音人員 (男性, 國語語者)
            
            0~4000 都可以試試看
            # 可以使用 3000
            # 2900
        }
"""


SERVER, PORT = '140.116.245.147', 9996

END_OF_TRANSMISSION = 'EOT'

class Client:
    def __init__(self):
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.connect((SERVER, PORT))
        self._token = "mi2stts"
        self._id = str(10012)

    def send(self, language, speaker, data):
        # if not int(speaker)>=0 or int(speaker)>= 184:
        #     raise ValueError('Speaker not supported')
        data = bytes(self._id + "@@@" + self._token + "@@@" + language + '@@@' + speaker + '@@@'+ data, "utf-8")
        data += END_OF_TRANSMISSION.encode() # END_OF_TRANSMISSION: 'EOT', end of transmission
        self.sock.sendall(data)

    def receive(self, bufsize=8192):
        data = b''
        while True:
            chunk = self.sock.recv(bufsize)
            if not chunk:
                break
            data += chunk
        return data
    
    def synthesis(self,language: str,speaker: str,  sentence:str, fname: str):
        self.__init__()
        self.send(language, speaker, sentence)
        result = self.receive()
        if not result:
            print('No result')
        else:
            response_data = json.loads(result.decode("utf-8"))
            print(response_data['status'])
            if response_data.get("status", False):  
                result_file_data = base64.b64decode(response_data.get("bytes", ""))
                with open(fname, 'wb') as f:
                    f.write(result_file_data)
                print("File received complete")   
        # time.sleep(1.0)
        self.close()
    def close(self):
        self.sock.close()

if __name__ == '__main__':
    args = argparse.ArgumentParser()
    text = "pergi ke kamar mandi" # sasa
    args.add_argument('--language', type=str, default='id')
    args.add_argument('--speaker', type=str, default='147')
    args.add_argument('--text', type=str, default=text)

    args = args.parse_args()
    client = Client()

    start_time = time.time()
    client.send(args.language, args.speaker, args.text)
    result = client.receive()
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

    print('Inference time: {}'.format(time.time() - start_time))