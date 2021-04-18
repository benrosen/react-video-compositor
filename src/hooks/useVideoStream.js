import { useEffect } from "react";

/**
 * A callback function that is passed a newly-loaded MediaStream.
 *
 * @callback OnMediaStreamLoadedCallback
 * @param {MediaStream} stream The loaded MediaStream.
 */

/**
 * A callback function that is invoked before loading a MediaStream.
 *
 *  @callback OnMediaStreamLoadingCallback
 */

/**
 * Use a video stream from a video device.
 *
 * @module useVideoStream
 * @param {OnMediaStreamLoadedCallback} onLoaded A callback function that is passed the newly-loaded MediaStream.
 * @param {OnMediaStreamLoadingCallback} onLoading A callback function that is invoked before loading the MediaStream.
 * @param {MediaTrackConstraints} videoTrackConstraints A set of capabilities and the value or values each can take on.
 */
export default function useVideoStream(
  onLoaded,
  onLoading,
  videoTrackConstraints
) {
  useEffect(() => {
    onLoading();
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: videoTrackConstraints ?? true,
      })
      .then((mediaStream) => {
        onLoaded(mediaStream);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [onLoaded, onLoading, videoTrackConstraints]);
}
