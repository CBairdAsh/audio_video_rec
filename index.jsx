import React, { useState, useRef } from 'react';
import Modal from './confirm'; 
import './styles/main.css';

export default function Record() {
    const [mediaStream, setMediaStream] = useState(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recordingUrl, setRecordingUrl] = useState('');
    const selMimeType = useRef('video/webm');
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);   

    // TODO: are these enough? Probably not.
    const codecs = ['video/webm; codecs="vp9, opus"', 'video/webm; codecs="vp8, opus"']; 

    const startRecording = async () => {
        // Make sure we're starting fresh
        setRecordingUrl('');
        setRecordedChunks([]);

        // TODO: add error handling aroud cam / mic not being available

        // Figure out which codec we can use
        for (let codec of codecs) {
            if (MediaRecorder.isTypeSupported(codec)) {
                selMimeType.current = codec;
                break;
            }
        }        

        // set up user media stream
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoRef.current.srcObject = stream;
        setMediaStream(stream);

        // setup media recorder
        const mediaRecorder = new MediaRecorder(stream, { mimeType: selMimeType.current });
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) {
                setRecordedChunks(prev => [...prev, event.data]);
            }
        };

        setIsRecording(true);

        mediaRecorder.start(1000);
    };

    const stopRecording = () => {
        mediaRecorderRef.current.onstop = () => {
            console.log(recordedChunks);

            const blob = new Blob(recordedChunks, { type: selMimeType.current });
            const url = URL.createObjectURL(blob);
            setRecordingUrl(url);

            // Open modal for playback
            setIsModalOpen(true); 
        };
    
        // Stop the MediaRecorder
        mediaRecorderRef.current.stop();
    
        // Stop each track in the media stream
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());

            // Clear out the stream
            setMediaStream(null); 
        }
    
        // Close the camera view by setting the video element's srcObject to null
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    
        setIsRecording(false);
    };
    
    const retryRecording = () => {
        // close modal... 
        // TODO: anything we need to reset here?
        setIsModalOpen(false); 

        // TODO: UX ? auto start? any messages?
    };

    return (
        <div>
            <h2>Click 'start recording' to begin, 'stop recording' when finished.</h2>
            <video ref={videoRef} autoPlay playsInline></video>
            {!isRecording && <button onClick={startRecording}>Start Recording</button>}
            {isRecording && <button onClick={stopRecording}>Stop Recording</button>}            
            <Modal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                recordingUrl={recordingUrl}
                onRetry={retryRecording}
            />
        </div>
    );
}
