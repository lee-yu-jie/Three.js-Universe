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

const planetsList = [
  {
    name: 'sun',
    radius: 4,
    xPosition: 0,
    planetTexture: sunTexture,
    orbit: 0,
    orbitSpeed: 0,
    orbitOblique: 0,
    spinOblique: 0,
  },
  {
    name: 'mercury',
    radius: 1.1,
    xPosition: 10,
    planetTexture: mercuryTexture,
    orbit: 0.008,
    orbitSpeed: 0.0018,
    orbitOblique: 7,
    spinOblique: 0.01,
  },
  {
    name: 'venus',
    radius: 1.36,
    xPosition: 15,
    planetTexture: venusTexture,
    orbit: 0.006,
    orbitSpeed: 0.0016,
    orbitOblique: 3.2,
    spinOblique: 177.3,
  },
  {
    name: 'earth',
    radius: 1.5,
    xPosition: 20,
    planetTexture: earthTexture,
    orbit: 0.005,
    orbitSpeed: 0.0014,
    orbitOblique: 0,
    spinOblique: 23.26,
    satellite: {
      name: 'moon',
      radius: 0.2,
      xPosition: 3,
      planetTexture: moonTexture,
      orbit: 0.01,
      orbitSpeed: 0.03,
    }
  },
  {
    name: 'mars',
    radius: 0.65,
    xPosition: 25,
    planetTexture: marsTexture,
    orbit: 0.0045,
    orbitSpeed: 0.0013,
    orbitOblique: 1.8,
    spinOblique: 25.19,
  },
  {
    name: 'jupiter',
    radius: 4.5,
    xPosition: 40,
    planetTexture: jupiterTexture,
    orbit: 0.004,
    orbitSpeed: 0.00125,
    orbitOblique: 1.3,
    spinOblique: 3.13,
  },
  {
    name: 'saturn',
    radius: 4,
    xPosition: 53,
    planetTexture: saturnTexture,
    orbit: 0.003,
    orbitSpeed: 0.0011,
    orbitOblique: 2.5,
    spinOblique: 26.73,
    ring:{
      innerRadius: 4.5,
      outerRadius: 6.5,
      texture: saturnRingTexture,
    }
  },
  {
    name: 'uranus',
    radius: 3,
    xPosition: 65,
    planetTexture: uranusTexture,
    orbit: 0.002,
    orbitSpeed: 0.001,
    orbitOblique: 0.8,
    spinOblique: 97.77,
    ring:{
      innerRadius: 3.5,
      outerRadius: 5.5,
      texture: uranusRingTexture,
    }
  },
  {
    name: 'neptune',
    radius: 3,
    xPosition: 75,
    planetTexture: neptuneTexture,
    orbit: 0.001,
    orbitSpeed: 0.0007,
    orbitOblique: 1.8,
    spinOblique: 28.32,
  },
  {
    name: 'pluto',
    radius: 0.8,
    xPosition: 80,
    planetTexture: plutoTexture,
    orbit: 0.00005,
    orbitSpeed: 0.0005,
    orbitOblique: 15,
    spinOblique: 55.43,
  }

];

export { planetsList };