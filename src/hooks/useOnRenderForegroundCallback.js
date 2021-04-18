import { NotImplementedError } from "common-errors";
import { useCallback } from "react";

/**
 * Render a foreground.
 *
 * @param {string|HTMLElement} foreground The type of foreground to use.
 */
export default function useOnRenderForegroundCallback(foreground) {
  return useCallback(
    (canvasElement, videoElement) => {
      throw new NotImplementedError(
        "Foreground support is not yet implemented."
      );
    },
    [foreground]
  );
}
