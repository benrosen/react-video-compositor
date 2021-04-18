/**
 * Render video to a canvas element.
 *
 * @param {*} canvasElement The taget canvas element.
 * @param {*} videoElement The source video element.
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
