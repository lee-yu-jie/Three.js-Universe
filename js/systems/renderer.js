import { WebGLRenderer } from "../../node_modules/three/build/three.module.js";

function createRenderer() {
const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
return renderer;
}

export { createRenderer }