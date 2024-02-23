import axios from "axios";
import { saveAs } from 'file-saver';

export function upload(recordedChunks, setInfo) {
    if (recordedChunks) {
        setInfo('uploading');
        const blob = new Blob(recordedChunks, {
            type: "video/webm",
        });
        const formData = new FormData();
        formData.append("file", blob, "video.webm");

        // Make a POST request using fetch
        fetch("https://babu2.pythonanywhere.com/upload", {
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
    } else {
        setInfo('no length');

    }

}


export async function down(id, setProgress = () => { }) {
    console.log('downloadImage');
    try {
        const response = await axios.get(`https://babu2.pythonanywhere.com/hello/${id}`, {
            onDownloadProgress: (progressEvent) => {
                setProgress((progressEvent.progress * 100).toFixed(1));
            },
            responseType: 'blob',
        });
        if (response.status === 200) {
            saveAs(response.data, 'data.zip');
        }
    } catch (error) {
        console.error(error);
    }
}


export async function caution(id, setStatus) {
    const response = await axios.delete(`https://babu2.pythonanywhere.com/done/${id}`);
    setStatus(response.data);
}