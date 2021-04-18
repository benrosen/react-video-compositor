# react-video-compositor

A flexible React video component that supports virtual backgrounds, foreground effects, and bokeh background blur.

## Resources

- Code:
- Docs:
- NPM:

## Getting Started

### Install

`npm i react-video-compositor`

### Import

```javascript
import { VideoCompositor } from "react-video-compositor";
```

### Implement

The following example shows a `VideoCompositor` component that has been configured to render 60 times per second.

The rendered video will have a blurred background and will be overlaid with an image from a file.

The `onCaptureStream` callback will be used to log a `MediaStream` to the console.

```javascript
import React from "react";
import { VideoCompositor } from "react-video-compositor";

export default function App() {
  return (
    <VideoCompositor
      background="blur"
      foreground="images/foreground.png"
      fps={60}
      onCaptureStream={(stream) => {
        console.log(stream);
      }}
      style={{
        border: "1px dotted magenta",
        maxHeight: "50%",
        minHeight: "10%",
      }}
    />
  );
}
```

**TIP:** You can use the `onCaptureStream` callback to send the `MediaStream` argument to a service like the [AWS Chime SDK](https://aws.amazon.com/chime/chime-sdk/).

#### Configuring Virtual Backgrounds

The `background` prop can be used to configure virtual backgrounds for the video stream. The `background` prop accepts a variety of input types, including:

- [Bypass](#raw-video)
- [Background Blur](#background-blur)
- [CSS Color Name](#css-color-name)
- [Hex Code](#hex-code)
- [RGBA](#rgba)
- [Image Element](#image-element)
- [Video Element](#video-element)
- [Image Path](#image-path)
- [Video Path](#video-path)

##### Bypass

```javascript
import React from "react";
import { VideoCompositor } from "react-video-compositor";

export default function App() {
  return <VideoCompositor />;
}
```

##### Background Blur

```javascript
import React from "react";
import { VideoCompositor } from "react-video-compositor";

export default function App() {
  return <VideoCompositor background="blur" />;
}
```

##### CSS Color Name

```javascript
import React from "react";
import { VideoCompositor } from "react-video-compositor";

export default function App() {
  return <VideoCompositor background="yellow" />;
}
```

##### Hex Code

```javascript
import React from "react";
import { VideoCompositor } from "react-video-compositor";

export default function App() {
  return <VideoCompositor background="#ffff00" />;
}
```

##### RGBA

```javascript
import React from "react";
import { VideoCompositor } from "react-video-compositor";

export default function App() {
  return <VideoCompositor background="rgba(255, 255, 0, 1)" />;
}
```

##### Image Element

```javascript
import React, { Fragement, useRef } from "react";
import { VideoCompositor } from "react-video-compositor";

export default function App() {
  const imageElement = useRef();
  return (
    <Fragment>
      <img ref={imageElement} />
      <VideoCompositor background={imageElement} />
    </Fragment>
  );
}
```

##### Video Element

```javascript
import React, { Fragement, useRef } from "react";
import { VideoCompositor } from "react-video-compositor";

export default function App() {
  const videoElement = useRef();
  return (
    <Fragment>
      <video ref={videoElement} />
      <VideoCompositor background={videoElement} />
    </Fragment>
  );
}
```

##### Image Path

```javascript
import React from "react";
import { VideoCompositor } from "react-video-compositor";

export default function App() {
  return <VideoCompositor background="images/background.png" />;
}
```

##### Video Path

```javascript
import React from "react";
import { VideoCompositor } from "react-video-compositor";

export default function App() {
  return <VideoCompositor background="videos/background.mp4" />;
}
```

## Bibliography

- https://dannadori.medium.com/virtual-background-with-amazon-chime-sdk-bodypix-23fb59ac8c64
- https://github.com/FLECT-DEV-TEAM/LocalVideoEffector
- https://blog.tensorflow.org/2019/11/updated-bodypix-2.html
- https://blog.logrocket.com/responsive-camera-component-react-hooks/
- https://github.com/vinooniv/video-bg-blur/blob/master/index.html
- https://github.com/vinooniv/video-bg-blur/blob/master/js/video.js
- https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
