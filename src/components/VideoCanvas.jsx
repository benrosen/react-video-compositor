import * as bodyPix from "@tensorflow-models/body-pix";

import React, { Fragment, useEffect, useRef, useState } from "react";

import useInterval from "../hooks/useInterval";

/**
 *
 * @todo refactor height and width to just be style
 * @todo loading image
 * @todo background
 * @todo foreground
 */
export default function VideoCanvas({
  blur,
  height,
  onStream,
  updateFrequency,
  width,
}) {
  const [hasLoadedVideoData, setHasLoadedVideoData] = useState();
  const [net, setNet] = useState();
  const canvasElement = useRef();
  const videoElement = useRef();

  const BACKGROUND_BLUR_AMOUNT = 3;
  const EDGE_BLUR_AMOUNT = 1;

  useEffect(() => {
    bodyPix.load().then((net) => {
      setNet(net);
    });
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true,
      })
      .then((mediaStream) => {
        videoElement.current.srcObject = mediaStream;
        onStream(
          blur
            ? canvasElement.current.captureStream(updateFrequency)
            : mediaStream
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, [blur, onStream, updateFrequency]);

  useInterval(updateFrequency, async () => {
    if (!hasLoadedVideoData) {
      return;
    }
    if (blur && net) {
      const segmentation = await net.segmentPerson(videoElement.current);
      bodyPix.drawBokehEffect(
        canvasElement.current,
        videoElement.current,
        segmentation,
        BACKGROUND_BLUR_AMOUNT,
        EDGE_BLUR_AMOUNT
      );
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
  });

  return (
    <Fragment>
      <video
        autoPlay
        height={height}
        onLoadedData={() => {
          setHasLoadedVideoData(true);
        }}
        muted
        ref={videoElement}
        style={{ opacity: 0, position: "fixed" }}
        width={width}
      />
      <canvas
        height={`${height}`}
        ref={canvasElement}
        width={`${width}`}
      ></canvas>
    </Fragment>
  );
}
