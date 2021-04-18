/**
 * Render a bokeh video background to a canvas.
 *
 * @param {Number} backgroundBlurAmount The number of pixels to blur the background pixels.
 * @param {*} bodyPix The BodyPix SDK.
 * @param {HTMLCanvasElement} canvasElement The target canvas element.
 * @param {Number} edgeBlurAmount The number of pixels to blur the edge pixels.
 * @param {*} net The net loaded from BodyPix.
 * @param {HTMLVideoElement} videoElement The source video element.
 */
export default async function renderBokehBackground(
  backgroundBlurAmount,
  bodyPix,
  canvasElement,
  edgeBlurAmount,
  net,
  videoElement
) {
  const segmentation = await net.segmentPerson(videoElement.current);
  bodyPix.drawBokehEffect(
    canvasElement.current,
    videoElement.current,
    segmentation,
    backgroundBlurAmount,
    edgeBlurAmount
  );
}
