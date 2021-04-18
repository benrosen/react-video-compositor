/**
 * Render a bokeh video background to a canvas.
 *
 * @module renderBokehBackground
 * @param {Number} backgroundBlurAmount The number of pixels to blur the background pixels.
 * @param {*} bodyPix The BodyPix SDK.
 * @param {*} canvasElement A reference to the target canvas element.
 * @param {Number} edgeBlurAmount The number of pixels to blur the edge pixels.
 * @param {*} net The net loaded from BodyPix.
 * @param {*} videoElement A reference to the source video element.
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
