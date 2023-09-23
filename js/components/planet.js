import { 
  SphereGeometry, 
  Mesh, 
  MeshStandardMaterial, 
  TextureLoader,
  MeshBasicMaterial,
  Object3D,
  RingGeometry,
  DoubleSide,
} from "../../node_modules/three/build/three.module.js";

const textureLoader = new TextureLoader();

function createMaterial(planetTexture) {
  let material;
  const texture = textureLoader.load(
    planetTexture,
  );

  if(planetTexture.includes('sun')){
    material = new MeshBasicMaterial({ 
      map: texture, 
    });
  }else{
    material = new MeshStandardMaterial({ 
      map: texture,
    });
  };
  
  return material;
};

function calcCoordinate(r, rotationAngle, tiltAngle = 0){
  const x = r * Math.cos(rotationAngle);
  const z = r * Math.sin(rotationAngle);
  const y = x * Math.tan(tiltAngle);

  return { x, y, z };
}

function createRing({innerRadius, outerRadius, texture}){
  const geometry = new RingGeometry(
    innerRadius,
    outerRadius,
    32
  );
  const material = new MeshStandardMaterial({
    map: textureLoader.load(texture),
    side: DoubleSide,
  });
  const ring = new Mesh(geometry, material);
  ring.receiveShadow = true;
  ring.rotation.x = 1.5 * Math.PI;
  return ring;
}

function createSatellite({radius, xPosition, planetTexture, orbitSpeed, name}){
  const geometry = new SphereGeometry( radius, 32, 16 );
  const material = createMaterial(planetTexture);
  const satellite = new Mesh(geometry, material);
  satellite.castShadow = true;
  satellite.receiveShadow = true;
  satellite.name = name;
  satellite.originX = xPosition;
  satellite.orbitSpeed = orbitSpeed
  satellite.position.x = xPosition;
  satellite.spin = () => {
    satellite.rotateY(0.05);
  };

  let rotationAngle = 0;
  satellite.orbit = (r, orbitSpeed) => {
    rotationAngle -= orbitSpeed;
    const {x, y, z} = calcCoordinate(r, rotationAngle);

    satellite.position.set(x, y, z);
  };

  return satellite;
}

function createPlanet(planetInfo){
  const { radius, xPosition, planetTexture, orbitSpeed, orbitOblique, spinOblique } = planetInfo;
  const geometry = new SphereGeometry( radius, 32, 16 );
  const material = createMaterial(planetTexture);
  const planet = new Mesh(geometry, material);

  if(!planetTexture.includes('sun')){
    planet.castShadow = true;
  };
  planet.receiveShadow = true;
  planet.name = planetInfo.name;

  const planetSpace = new Object3D();

  planetSpace.add(planet);
  planetSpace.name = planetInfo.name+'Space';
  planetSpace.originX = xPosition;
  planetSpace.orbitSpeed = orbitSpeed
  planetSpace.position.x = xPosition;
  planetSpace.rotation.z = spinOblique * (Math.PI / 180);

  if(planetInfo.ring) {
    const ring = createRing(planetInfo.ring);
    planetSpace.add(ring);
  };

  if(planetInfo.satellite) {
    const satellite = createSatellite(planetInfo.satellite);
    planetSpace.add(satellite);
  }

  let rotationAngle = 0;
  const tiltAngle = orbitOblique * (Math.PI / 180);
  planetSpace.orbit = (r, orbitSpeed) => {
    rotationAngle -= orbitSpeed;
    const {x, y, z} = calcCoordinate(r, rotationAngle, tiltAngle);
    planetSpace.position.set(x, y, z);
  };

  planet.spin = () => {
    planet.rotateY(0.004);
  };

  return { planet, planetSpace };
};

export { createPlanet }