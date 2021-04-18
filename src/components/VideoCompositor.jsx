import * as bodyPix from "@tensorflow-models/body-pix";

import React, { useEffect, useRef, useState } from "react";

import PropTypes from "prop-types";
import useInterval from "../hooks/useInterval";

/**
 * Renders a video stream to a `canvas` element.
 *
 * @todo additional support for formats for background/foreground: color (hex, rgb, rgba, object), ImageData, ImageElement, VideoElement, MediaStream
 * @todo background image path
 * @todo foreground image path
 * @todo onRenderBackground & backgroundRenderers array [{key: (segmentation) => media for canvas }] & background="key"
 *
 * @deprecated
 *
 * https://dannadori.medium.com/virtual-background-with-amazon-chime-sdk-bodypix-23fb59ac8c64
 * https://github.com/FLECT-DEV-TEAM/LocalVideoEffector
 * https://blog.tensorflow.org/2019/11/updated-bodypix-2.html
 * https://blog.logrocket.com/responsive-camera-component-react-hooks/
 * https://github.com/vinooniv/video-bg-blur/blob/master/index.html
 * https://github.com/vinooniv/video-bg-blur/blob/master/js/video.js
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
 */
export default function VideoCompositor({
  background,
  blur,
  foreground,
  fps = 30,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  onCaptureStream,
}) {
  const BACKGROUND_BLUR_AMOUNT = 3;
  const EDGE_BLUR_AMOUNT = 1;

  const canvasElement = useRef();
  const videoElement = useRef();

  const [hasLoadedVideoData, setHasLoadedVideoData] = useState();
  const [net, setNet] = useState();
  const [{ width, height }, setVideoSettings] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    bodyPix.load().then((net) => {
      setNet(net);
    });
  }, []);

  useEffect(() => {
    setHasLoadedVideoData(false);
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true,
      })
      .then((mediaStream) => {
        setVideoSettings(() => {
          return mediaStream.getVideoTracks()[0].getSettings();
        });
        videoElement.current.srcObject = mediaStream;
        onCaptureStream(canvasElement.current.captureStream(fps));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [blur, onCaptureStream, fps]);

  useInterval(fps, async () => {
    if (!hasLoadedVideoData) {
      return;
    }
    if (net && (background || blur)) {
      const segmentation = await net.segmentPerson(videoElement.current);
      if (background) {
        const canvasContext = canvasElement.current.getContext("2d");
        const maskImageData = bodyPix.toMask(
          segmentation,
          { r: 0, g: 0, b: 0, a: 0 },
          { r: 255, g: 0, b: 255, a: 255 }
        );
        // TODO combine maskImageData with backgroundImage to create backgroundImageData
        const backgroundImageData = maskImageData;
        canvasContext.putImageData(backgroundImageData, 0, 0);
        canvasContext.globalCompositeOperation = "destination-over";
        canvasContext.drawImage(
          videoElement.current,
          0,
          0,
          canvasElement.current.width,
          canvasElement.current.height
        );
        canvasContext.globalCompositeOperation = "source-over";
      } else if (blur) {
        bodyPix.drawBokehEffect(
          canvasElement.current,
          videoElement.current,
          segmentation,
          BACKGROUND_BLUR_AMOUNT,
          EDGE_BLUR_AMOUNT
        );
      }
    } else {
      canvasElement.current
        .getContext("2d")
        .drawImage(
          videoElement.current,
          0,
          0,
          canvasElement.current.width,
          canvasElement.current.height
        );
    }
    if (foreground) {
      // draw foreground
    }
  });

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        maxHeight: maxHeight,
        maxWidth: maxWidth,
        minHeight: minHeight,
        minWidth: minWidth,
        overflow: "hidden",
      }}
    >
      <video
        autoPlay
        aria-hidden
        height={height}
        onLoadedData={() => {
          setHasLoadedVideoData(true);
        }}
        muted
        ref={videoElement}
        style={{
          opacity: 0,
          position: "fixed",
        }}
        width={width}
      />
      <canvas
        height={`${height}`}
        ref={canvasElement}
        style={{ border: "1px dotted magenta" }}
        width={`${width}`}
      ></canvas>
    </div>
  );
}

VideoCompositor.propTypes = {
  /** The path to the background image. */
  background: PropTypes.string,

  /** Specify whether the background should be blurred. */
  blur: PropTypes.bool,

  /** The path to the foreground image. */
  foreground: PropTypes.string,

  /** The number of times per second to capture the MediaStream. */
  fps: PropTypes.number,

  /** The max height of the element in pixels */
  maxHeight: PropTypes.oneOf([PropTypes.number, PropTypes.string]),

  /** The max width of the element */
  maxWidth: PropTypes.oneOf([PropTypes.number, PropTypes.string]),

  /** The min height of the element */
  minHeight: PropTypes.oneOf([PropTypes.number, PropTypes.string]),

  /** The min width of the element */
  minWidth: PropTypes.oneOf([PropTypes.number, PropTypes.string]),

  /** A callback function for handling the captured MediaStream. */
  onCaptureStream: PropTypes.func,
};
