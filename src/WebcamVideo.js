import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

export default function WebcamVideo() {
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);
    const [intervalId, setIntervalId] = React.useState(null);
    const [info, setInfo] = useState('');

    useEffect(() => {
        return () => {
            clearInterval(intervalId);
        };
    }, [intervalId]);

    const handleDataAvailable = React.useCallback(
        ({ data }) => {
            if (data.size > 0) {
                console.log(data);
                upload([data],setInfo)
            }
        },
        [setRecordedChunks]
    );

    const startRecordingInterval = () => {
        setIntervalId(setInterval(() => {
            handleStopCaptureClick();
            handleStartCaptureClick();
        }, 3000));
    };

    const handleStartCaptureClick = () => {
        setCapturing(true);
        webcamRef.current.video.play();
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm",
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
        startRecordingInterval();
    };

    const handleStopCaptureClick = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            clearInterval(intervalId);
            setIntervalId(null);
            setCapturing(false);
        }
    };


    const videoConstraints = {
        width: 420,
        height: 420,
        facingMode: "user",
    };

    return (
        <div className="Container">
            <div>{info}</div>
            <Webcam
                height={400}
                width={400}
                audio={false}
                ref={webcamRef}
                videoConstraints={videoConstraints}
            />
            {capturing ? (
                <button onClick={handleStopCaptureClick}>Stop Capture</button>
            ) : (
                <button onClick={handleStartCaptureClick}>Start Capture</button>
            )}
        </div>
    );
}


function upload(recordedChunks,setInfo) {
    if (recordedChunks) {
        setInfo('uploading');
        const blob = new Blob(recordedChunks, {
            type: "video/webm",
        });
        const formData = new FormData();
        formData.append("file", blob, "video.webm");

        // Make a POST request using fetch
        fetch("https://babu2.pythonanywhere.com/upload/mobile", {
            method: "POST",
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                setInfo('successfully uploaded')
                return response.json(); // Assuming the response is in JSON format
            })
            .then(data => {
                // Handle the response data as needed
                console.log(data);
            })
            .catch(error => {
                // Handle errors during the fetch
                setInfo('error')
                console.error("Fetch error:", error);
            });
    }else{
        setInfo('no length');

    }

}