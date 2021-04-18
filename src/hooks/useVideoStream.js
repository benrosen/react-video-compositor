import { useEffect } from "react";

/**
 * Use a video stream from a video device.
 *
 * @param {OnMediaStreamLoadedHandler} onLoaded A callback function that is passed the newly-loaded MediaStream.
 * @param {OnMediaStreamLoadingEventHandler} onLoading A callback function that is invoked before loading the MediaStream.
 * @param {MediaTrackConstraints} videoTrackConstraints A set of capabilities and the value or values each can take on
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
