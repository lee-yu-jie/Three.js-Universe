import {  Vector3, BufferGeometry, LineBasicMaterial, Line, MathUtils } from "../node_modules/three/build/three.module.js";
import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';
import { createRenderer } from './systems/renderer.js';
import { createControls } from './systems/controls.js';
import { createPlanet } from './components/planet.js';
import { Loop } from './systems/Loop.js';
import { Resizer } from './systems/Resizer.js';

import sunTexture from '/assets/planet/sun.png'
import mercuryTexture from '/assets/planet/mercury.jpg'
import venusTexture from '/assets/planet/venus.jpg'
import earthTexture from '/assets/planet/earth.jpg'
import moonTexture from '/assets/planet/moon.jpg'
import marsTexture from '/assets/planet/mars.jpg'
import jupiterTexture from '/assets/planet/jupiter.jpeg'
import saturnTexture from '/assets/planet/saturn.jpg'
import uranusTexture from '/assets/planet/uranus.png'
import neptuneTexture from '/assets/planet/neptune.jpg'
import plutoTexture from '/assets/planet/pluto.jpg'

import saturnRingTexture from '/assets/planet/saturnRing.png'
import uranusRingTexture from '/assets/planet/uranusRing.png'

let camera;
let renderer;
let scene;
let loop;
let controls
let planets = {}

const planetsList = [
  {
    name: 'sun',
    radius: 4,
    xPosition: 0,
    planetTexture: sunTexture,
    orbit: 0,
  },
  {
    name: 'mercury',
    radius: 1,
    xPosition: 10,
    planetTexture: mercuryTexture,
    orbit: 0.004,
  },
  {
    name: 'venus',
    radius: 1.5,
    xPosition: 15,
    planetTexture: venusTexture,
    orbit: 0.008,
  },
  {
    name: 'earth',
    radius: 1.5,
    xPosition: 20,
    planetTexture: earthTexture,
    orbit: 0.006,
  },
  {
    name: 'mars',
    radius: 1,
    xPosition: 25,
    planetTexture: marsTexture,
    orbit: 0.004,
  },
  {
    name: 'jupiter',
    radius: 2.85,
    xPosition: 30,
    planetTexture: jupiterTexture,
    orbit: 0.002,
  },
  {
    name: 'saturn',
    radius: 3.2,
    xPosition: 40,
    planetTexture: saturnTexture,
    orbit: 0.003,
    ring:{
      innerRadius: 4,
      outerRadius: 6,
      texture: saturnRingTexture
    }
  },
  {
    name: 'uranus',
    radius: 2.5,
    xPosition: 55,
    planetTexture: uranusTexture,
    orbit: 0.002,
    ring:{
      innerRadius: 3,
      outerRadius: 4,
      texture: uranusRingTexture
    }
  },
  {
    name: 'neptune',
    radius: 2.5,
    xPosition: 65,
    planetTexture: neptuneTexture,
    orbit: 0.001,
  },
  {
    name: 'pluto',
    radius: 0.8,
    xPosition: 70,
    planetTexture: plutoTexture,
    orbit: 0.0008,
  }

];

const moonInfo = {
  name: 'moon',
  radius: 0.2,
  xPosition: 3,
  planetTexture: moonTexture,
  orbit: 0.01,
}

function drawLine(r){
const pathPoints = [];
for (let i = 0; i <= 360; i += 5) {
  const radians = MathUtils.degToRad(i);
  const x = r * Math.cos(radians);
  const y = 0;
  const z = r * Math.sin(radians);
  pathPoints.push(new Vector3(x, y, z));
}

const pathGeometry = new BufferGeometry().setFromPoints(pathPoints);

const pathMaterial = new LineBasicMaterial({ color: '#595959' });

const pathLine = new Line(pathGeometry, pathMaterial);

return pathLine;
}
class Universe {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    controls = createControls(camera, renderer.domElement);
    loop = new Loop(camera, scene, renderer, controls);
    container.append(renderer.domElement);

    for (const planetInfo of planetsList) {
      const planet = createPlanet(planetInfo);
      loop.planets.push(planet.planet);
      loop.spacePlanets.push(planet.planetSpace);
      planets[planetInfo.name] = planet;
      scene.add(planet.planetSpace, drawLine(planetInfo.xPosition));
    }

    const moon = createPlanet(moonInfo);
    planets.earth.planet.add(moon.planetSpace);
    loop.spacePlanets.push(moon.planetSpace);
    loop.planets.push(moon.planet);

    const { ambientLight, pointLight } = createLights();
    scene.add(pointLight, ambientLight)
    
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