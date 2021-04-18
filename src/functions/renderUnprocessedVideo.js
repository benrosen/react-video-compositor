/**
 * Render video to a canvas element.
 *
 * @module renderUnprocessedVideo
 * @param {*} canvasElement The taget canvas element.
 * @param {*} videoElement A reference to the source video element.
 */
export default function renderUnprocessedVideo(canvasElement, videoElement) {
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
