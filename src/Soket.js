import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Camera from './Camera';

export default function Soket() {
    const [connectionStatus, setConnectionStatus] = useState('Connecting...');
    const socket = useRef(null);

    useEffect(() => {
        // Connect to the Flask WebSocket server
        socket.current = io('http://localhost:5000');

        // Listen for the 'connect' event to know when the connection is established
        socket.current.on('connect', () => {
            setConnectionStatus('Connected');
        });

        // Listen for the 'disconnect' event to know when the connection is closed
        socket.current.on('disconnect', () => {
            setConnectionStatus('Disconnected');
        });

        // Clean up the socket connection on component unmount
        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, []);

    function uploadImage(img) {
        socket.current.emit('upload_img', { chunk: img });
    }
    
    return (
        <div>
            <div>Soket</div>
            <div>Connection Status: {connectionStatus}</div>
            <Camera uploadImage={uploadImage} />
        </div>
    );
}
