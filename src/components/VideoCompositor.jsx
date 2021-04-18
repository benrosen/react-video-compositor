import React, { useCallback, useRef, useState } from "react";

import PropTypes from "prop-types";
import renderUnprocessedVideo from "../functions/renderUnprocessedVideo";
import useInterval from "../hooks/useInterval";
import useVideoStream from "../hooks/useVideoStream";

/**
 * Renders a video stream to a canvas and provides callback functions for background and foreground effects.
 *
 * @module VideoCompositor
 * @see module:useInterval
 * @see module:useVideoStream
 */
export default function VideoCompositor({
  fps = 30,
  onCaptureStream,
  onRenderBackground,
  onRenderForeground,
  style,
  videoTrackConstraints,
}) {
  const canvasElement = useRef();
  const videoElement = useRef();

  const [hasLoadedVideoData, setHasLoadedVideoData] = useState(false);
  const [{ width, height }, setVideoSettings] = useState({
    width: undefined,
    height: undefined,
  });

  /**
   * A callback function that is passed the newly-loaded MediaStream.
   *
   * @function
   * @param {MediaStream} stream The MediaStream that was loaded from the video device.
   */
  const handleOnLoadedVideoStream = useCallback(
    (stream) => {
      setVideoSettings(() => {
        return stream.getVideoTracks()[0].getSettings();
      });
      videoElement.current.srcObject = stream;
      if (onCaptureStream) {
        onCaptureStream(canvasElement.current.captureStream(fps));
      }
    },
    [fps, onCaptureStream]
  );

  /**
   * A callback function that is invoked before loading the MediaStream.
   *
   * @function
   */
  const handleOnLoadingVideoStream = useCallback(() => {
    setHasLoadedVideoData(false);
  }, []);

  useVideoStream(
    handleOnLoadedVideoStream,
    handleOnLoadingVideoStream,
    videoTrackConstraints
  );

  useInterval(fps, () => {
    if (!hasLoadedVideoData) {
      return;
    }

    if (onRenderBackground) {
      onRenderBackground(canvasElement, videoElement);
    } else {
      renderUnprocessedVideo(canvasElement, videoElement);
    }

    if (onRenderForeground) {
      onRenderForeground(canvasElement, videoElement);
    }
  });

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
        ...style,
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
      />
    </div>
  );
}

VideoCompositor.propTypes = {
  /** The target number of renders per second. */
  fps: PropTypes.number,

  /** A callback function that handles a MediaStream. */
  onCaptureStream: PropTypes.func,

  /** A callback function that handles a canvas ref and a video ref. */
  onRenderBackground: PropTypes.func,

  /** A callback function that handles a canvas ref and a video ref. */
  onRenderForeground: PropTypes.func,

  /** CSS styles to apply to this component. */
  style: PropTypes.object,

  /** A set of capabilities and the value or values each can take on. */
  videoTrackConstraints: PropTypes.object,
};
