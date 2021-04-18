import Compositor from "./Compositor";
import PropTypes from "prop-types";
import React from "react";
import useBodyPix from "../hooks/useBodyPix";
import useOnRenderBackgroundCallback from "../hooks/useOnRenderBackgroundCallback";
import useOnRenderForegroundCallback from "../hooks/useOnRenderForegroundCallback";

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

  const onRenderBackgroundCallback = useOnRenderBackgroundCallback(
    background,
    bodyPix,
    net
  );
  const onRenderForegroundCallback = useOnRenderForegroundCallback(foreground);

  return (
    <Compositor
      fps={fps}
      onCaptureStream={onCaptureStream}
      onRenderBackground={background ? onRenderBackgroundCallback : undefined}
      onRenderForeground={foreground ? onRenderForegroundCallback : undefined}
      style={style}
      videoTrackConstraints={videoTrackConstraints}
    />
  );
}

BodyPixCompositor.propTypes = {
  /** The type of background to use. Supports a CSS color string, `"blur"`, a path to an image or video file, or a `<canvas />`, `<img />`, or `< video/>` element. */
  background: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /** The type of foreground to use. */
  foreground: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /** The target number of renders per second. */
  fps: PropTypes.number,

  /** A callback function that handles a MediaStream. */
  onCaptureStream: PropTypes.func,

  /** CSS styles to apply to this component. */
  style: PropTypes.object,

  /** A set of capabilities and the value or values each can take on. */
  videoTrackConstraints: PropTypes.object,
};
