import React, { Fragment, useState } from "react";

import VideoCompositor from "./components/VideoCompositor";

export default function App() {
  const [blur, setBlur] = useState();

  return (
    <Fragment>
      <VideoCompositor background blur={blur} />
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
