import {  Scene, CubeTextureLoader } from "../../node_modules/three/build/three.module.js";
import space from "../../assets/background/uni1.jpg";

function createScene() {
  const scene = new Scene();

  const cubeTextureLoader = new CubeTextureLoader();
  scene.background = cubeTextureLoader.load([
      space,
      space,
      space,
      space,
      space,
      space
  ]);


  return scene;
};

export { createScene }