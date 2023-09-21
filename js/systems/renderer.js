import { WebGLRenderer, PCFSoftShadowMap } from "../../node_modules/three/build/three.module.js";

function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  return renderer;
};

export { createRenderer }