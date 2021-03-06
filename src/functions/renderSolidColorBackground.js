/**
 * Render a solid-color video background to a canvas.
 *
 * @module renderSolidColorBackground
 * @param {*} bodyPix The BodyPix SDK.
 * @param {*} canvasElement A reference to the target canvas element.
 * @param {Number[]} color An array of RGBA color values.
 * @param {*} net The net loaded from BodyPix.
 * @param {*} videoElement A reference to the source video element.
 */
export default async function renderSolidColorBackground(
  bodyPix,
  canvasElement,
  color,
  net,
  videoElement
) {
  const canvasContext = canvasElement.current.getContext("2d");
  const segmentation = await net.segmentPerson(videoElement.current);
  const backgroundImageData = bodyPix.toMask(
    segmentation,
    { r: 0, g: 0, b: 0, a: 0 },
    { r: color[0], g: color[1], b: color[2], a: 255 }
  );
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
}
