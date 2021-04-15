import React, { Fragment, useState } from "react";

import VideoCanvas from "./components/VideoCanvas";

export default function App() {
  const [blur, setBlur] = useState();
  return (
    <Fragment>
      <VideoCanvas
        blur={blur}
        height={225}
        onStream={(mediaStream) => {
          // send mediastream to chime
        }}
        updateFrequency={30}
        width={300}
      />
      <button
        onClick={() => {
          setBlur((blur) => {
            return !blur;
          });
        }}
      >
        Toggle Blur
      </button>
    </Fragment>
  );
}
