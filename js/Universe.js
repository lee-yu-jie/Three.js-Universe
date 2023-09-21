import { Object3D } from "../node_modules/three/build/three.module.js";
import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';
import { createRenderer } from './systems/renderer.js';
import { createControls } from './systems/controls.js';
import { createPlanet } from './components/planet.js';
import { createOrbit } from './components/orbit.js';
import { createAsteroid } from './components/asteroid.js';
import { Loop } from './systems/Loop.js';
import { Resizer } from './systems/Resizer.js';
import { planetsList } from './components/planetsList.js';

let camera;
let renderer;
let scene;
let loop;
let controls

class Universe {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    controls = createControls(camera, renderer.domElement);
    loop = new Loop(camera, scene, renderer, controls);
    container.append(renderer.domElement);

    for (const planetInfo of planetsList) {
      const planetModel = createPlanet(planetInfo);
      if(planetModel.planetSpace.name === 'earthSpace'){
        let index = planetModel.planetSpace.children.findIndex(child => child.name === 'moon');
        const moon = planetModel.planetSpace.children[index];
        loop.spinList.push(moon);
        loop.orbitList.push(moon);
      }
      loop.spinList.push(planetModel.planet);
      loop.orbitList.push(planetModel.planetSpace);
      scene.add(planetModel.planetSpace, createOrbit(planetInfo.xPosition, planetInfo.orbitOblique));
    };

    const { ambientLight, pointLight } = createLights();
    
    scene.add(createAsteroid(), pointLight, ambientLight);
    
    new Resizer(container, camera, renderer);
  }

  start() {
    loop.start();
  }
  
  stop() {
    loop.stop();
  }
}

export { Universe };