import { SphereGeometry, 
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


function createPlanet(planetInfo) {
  const { radius, xPosition, planetTexture, orbitSpeed, orbitOblique, spinOblique } = planetInfo;
  const geometry = new SphereGeometry( radius, 32, 16 );
  const material = createMaterial(planetTexture);
  const planet = new Mesh(geometry, material);
  let ringMesh

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
    const ringGeo = new RingGeometry(
      planetInfo.ring.innerRadius,
      planetInfo.ring.outerRadius,
      32
    );
    const ringMat = new MeshStandardMaterial({
      map: textureLoader.load(planetInfo.ring.texture),
      side: DoubleSide,
    });
    ringMesh = new Mesh(ringGeo, ringMat);
    ringMesh.receiveShadow = true;
    ringMesh.rotation.x = 1.5 * Math.PI;

    planetSpace.add(ringMesh);
  };

  if(planetInfo.satellite) {
    const { radius, xPosition, planetTexture, orbitSpeed } = planetInfo.satellite; 
    const geometry = new SphereGeometry( radius, 32, 16 );
    const material = createMaterial(planetTexture);
    const satellite = new Mesh(geometry, material);
    satellite.castShadow = true;
    satellite.receiveShadow = true;
    satellite.name = planetInfo.satellite.name;
    satellite.originX = xPosition;
    satellite.orbitSpeed = orbitSpeed
    satellite.position.x = xPosition;
    satellite.spin = () => {
      satellite.rotateY(0.4);
    };

    let rotationAngle = 0;
    const tiltAngle = 0 * (Math.PI / 180);
    satellite.orbit = (r, orbitSpeed) => {
      rotationAngle -= orbitSpeed;
      const x = r * Math.cos(rotationAngle);
      const z = r * Math.sin(rotationAngle);
      const y = x * Math.tan(tiltAngle);
  
      satellite.position.set(x, y, z);
    };
    planetSpace.add(satellite);
  }

  let rotationAngle = 0;
  const tiltAngle = orbitOblique * (Math.PI / 180);
  planetSpace.orbit = (r, orbitSpeed) => {
    rotationAngle -= orbitSpeed;
    const x = r * Math.cos(rotationAngle);
    const z = r * Math.sin(rotationAngle);
    const y = x * Math.tan(tiltAngle);

    planetSpace.position.set(x, y, z);
  };

  planet.spin = () => {
    planet.rotateY(0.004);
  };

  return { planet, planetSpace };
};

export { createPlanet }