import { useEffect, useState } from "react";

/**
 * Invoke a callback function on an interval.
 *
 * @module useInterval
 * @param {number} fps The number of times per second to invoke the function.
 * @param {function} onUpdate The function to invoke.
 */
export default function useInterval(fps, onUpdate) {
  const [interval] = useState(1000 / fps);

  useEffect(() => {
    const update = setInterval(() => {
      onUpdate();
    }, interval);

    return () => {
      clearInterval(update);
    };
  }, [interval, onUpdate]);
}
