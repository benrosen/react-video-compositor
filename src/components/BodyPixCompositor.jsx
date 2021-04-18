import React, { useCallback } from "react";

import Compositor from "./Compositor";
import PropTypes from "prop-types";
import colorString from "color-string";
import renderBokehBackground from "../functions/renderBokehBackground";
import renderSolidColorBackground from "../functions/renderSolidColorBackground";
import renderUnprocessedVideo from "../functions/renderUnprocessedVideo";
import useBodyPix from "../hooks/useBodyPix";

/**
 * Renders a processed video stream to a canvas.
 *
 * @see Compositor for more on the base component type for `BodyPixCompositor`.
 * @see useBodyPix for more on loading a model from BodyPix.
 */
export default function BodyPixCompositor({
  background,
  foreground,
  fps = 30,
  onCaptureStream,
  style,
  videoTrackConstraints,
}) {
  const [bodyPix, net] = useBodyPix();

  /**
   * A callback function that handles a canvas ref and a video ref.
   *
   * @function
   * @param {*} canvasElement The target canvas element.
   * @param {*} videoElement The source video element.
   */
  const handleOnRenderBackground = useCallback(
    (canvasElement, videoElement) => {
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

      // TODO get element type
      const elementType = "";
      if (elementType) {
        //   TODO render background image or video from element
        return console.log(elementType);
      }

      console.warn(
        "Falling back to default renderer; %s is not a valid background value.",
        background
      );

      renderUnprocessedVideo(canvasElement, videoElement);
    },
    [background, bodyPix, net]
  );

  return (
    <Compositor
      fps={fps}
      onCaptureStream={onCaptureStream}
      onRenderBackground={background ? handleOnRenderBackground : undefined}
      style={style}
      videoTrackConstraints={videoTrackConstraints}
    />
  );
}

BodyPixCompositor.propTypes = {
  /** The number of pixels to blur the background (only used while blur === true) */
  backgroundBlurAmount: PropTypes.number,

  /** The number of pixels to blur the edges (only used while blur === true) */
  edgeBlurAmount: PropTypes.number,

  /** The target number of renders per second. */
  fps: PropTypes.number,

  /** A callback function that handles a MediaStream. */
  onCaptureStream: PropTypes.func,

  /** CSS styles to apply to this component. */
  style: PropTypes.object,

  /** A set of capabilities and the value or values each can take on. */
  videoTrackConstraints: PropTypes.object,
};
