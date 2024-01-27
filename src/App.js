import React from "react";

import Camera from "./Camera";
import AllCameras from "./AllCamera";
import Soket from "./Soket";
import WebcamVideo from "./WebcamVideo";

export default function App() {

  return (
    <div className="App" style={{ height: '100dvh', width: '100dvw' }}>
      {/* <Soket /> */}
      {/* <Camera /> */}
      <WebcamVideo />
      {/* <AllCameras /> */}
    </div>
  );
}


// https://blog.openreplay.com/capture-real-time-images-and-videos-with-react-webcam/