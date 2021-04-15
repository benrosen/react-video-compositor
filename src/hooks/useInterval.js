import { useEffect, useState } from "react";

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
