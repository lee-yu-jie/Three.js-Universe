// import { GLTFLoader } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js?module";
import { Universe } from './Universe.js';

function main() {
  const container = document.querySelector('#scene-container');

  const universe = new Universe(container);

  universe.start();
}

main()
