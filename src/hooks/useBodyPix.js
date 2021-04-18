import * as bodyPix from "@tensorflow-models/body-pix";

import { useEffect, useState } from "react";

/**
 * Use TensorFlow's BodyPix module.
 *
 * @module useBodyPix
 */
export default function useBodyPix() {
  const [net, setNet] = useState({});

  useEffect(() => {
    bodyPix.load().then((net) => {
      setNet(net);
    });
  }, []);

  return [bodyPix, net];
}
