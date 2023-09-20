import { PerspectiveCamera } from "../../node_modules/three/build/three.module.js";

function createCamera() {
  const camera = new PerspectiveCamera(35, 1, 0.1, 1000,);

  camera.position.set(0, 30, 110);

  return camera;
};

export { createCamera }