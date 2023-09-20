import {  AmbientLight, PointLight } from "../../node_modules/three/build/three.module.js";

function createLights() {
  const ambientLight = new AmbientLight(0x333333,3);
  const pointLight = new PointLight(0xFFFFFF, 230, 200, 1.5);
  return { ambientLight, pointLight };
}

export { createLights };