import React, { useState, useRef } from 'react';
import { mi2sStt } from '../api/mi2sVoiceApis';

const AudioRecorder = ({ inputLanguage, setInput}) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBase64, setAudioBase64] = useState('');
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const handleAudioData = (e) => {
        audioChunksRef.current.push(e.data);
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = handleAudioData;
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            console.error('Error accessing microphone:', err);
        }
    };

    const stopRecording = async () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const reader = new FileReader();
                reader.onloadend = async () => {
                    const base64String = reader.result.split(',')[1];
                    setAudioBase64(base64String);
                    try {
                        const recognitionResult = await mi2sStt(base64String, inputLanguage); // 調用 mi2sStt 函數
                        console.log('Recognition Result:', recognitionResult); // 打印辨識結果
                        // 在這裡處理辨識結果，例如更新 UI 或者進行下一步操作
                        console.log(recognitionResult.stt_output);
                        setInput(recognitionResult.stt_output);
                    } catch (error) {
                        console.error('Error in speech-to-text recognition:', error);
                    }
                };
                reader.readAsDataURL(audioBlob);
                audioChunksRef.current = [];
            };
            setIsRecording(false);
        }
    };

    const toggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    return (
        <div onClick={toggleRecording} className={isRecording ? 'mic-icon-deactivate' : 'mic-icon-activate'} />
    );
};

export default AudioRecorder;
