import { NotImplementedError, NotSupportedError } from "common-errors";

import colorString from "color-string";
import isImagePath from "is-image";
import isVideoPath from "is-video";
import renderBokehBackground from "../functions/renderBokehBackground";
import renderSolidColorBackground from "../functions/renderSolidColorBackground";
import renderUnprocessedVideo from "../functions/renderUnprocessedVideo";
import { useCallback } from "react";

/**
 * Render a background.
 *
 * @param {string|HTMLElement} background The type of background to use. Supports a CSS color string, `"blur"`, a path to an image or video file, or a `<canvas />`, `<img />`, or `< video/>` element.
 * @param {*} bodyPix The BodyPix SDK.
 * @param {*} net The net loaded from BodyPix.
 */
export default function useOnRenderBackgroundCallback(
  background,
  bodyPix,
  net
) {
  return useCallback(
    (canvasElement, videoElement) => {
      try {
        const tagName = background?.current?.tagName;
        if (tagName) {
          if (tagName === "IMG") {
            throw new NotImplementedError(
              "Image element support is not yet implemented."
            );
          } else if (tagName === "VIDEO") {
            throw new NotImplementedError(
              "Video element support is not yet implemented."
            );
          } else if (tagName === "CANVAS") {
            throw new NotImplementedError(
              "Canvas element support is not yet implemented."
            );
          } else {
            throw new NotSupportedError(`<${tagName.toLowerCase()} />`);
          }
        }

        if (background === "blur") {
          return renderBokehBackground(
            3,
            bodyPix,
            canvasElement,
            1,
            net,
            videoElement
          );
        }

        if (isImagePath(background)) {
          throw new NotImplementedError(
            "Image path support is not yet implemented."
          );
        }

        if (isVideoPath(background)) {
          throw new NotImplementedError(
            "Video path support is not yet implemented."
          );
        }

        const backgroundColor = colorString.get.rgb(background);
        if (backgroundColor) {
          return renderSolidColorBackground(
            bodyPix,
            canvasElement,
            backgroundColor,
            net,
            videoElement
          );
        }
      } catch (error) {
        console.error(error);
      }

      console.warn(
        "Falling back to default renderer; %s is not a valid background value.",
        background
      );

      renderUnprocessedVideo(canvasElement, videoElement);
    },
    [background, bodyPix, net]
  );
}
