import { SphereGeometry, 
        Mesh, 
        MeshStandardMaterial, 
        TextureLoader,
        MeshBasicMaterial,
        Object3D,
        RingGeometry,
        DoubleSide
      } from "../../node_modules/three/build/three.module.js";

const textureLoader = new TextureLoader();

function createMaterial(planetTexture) {
  let material;
  const texture = textureLoader.load(
    planetTexture,
  );

  if(planetTexture.includes('sun')){
    material = new MeshBasicMaterial({ map: texture, });
  }else{
    material = new MeshStandardMaterial({ map: texture, });
  };
  
  return material;
};

function createPlanet(planetInfo) {
  const { name, radius, xPosition, planetTexture, orbit } = planetInfo;
  const geometry = new SphereGeometry( radius, 32, 16 );
  const material = createMaterial(planetTexture);
  const planet = new Mesh(geometry, material);

  if(!planetTexture.includes('sun')){
    planet.castShadow = true;
  };

  planet.receiveShadow = true;
  const planetSpace = new Object3D();

  planetSpace.add(planet);

  planet.position.x = xPosition;

  if(planetInfo.ring) {
    const ringGeo = new RingGeometry(
      planetInfo.ring.innerRadius,
      planetInfo.ring.outerRadius,
      32
    );
    const ringMat = new MeshBasicMaterial({
      map: textureLoader.load(planetInfo.ring.texture),
      side: DoubleSide
    });
    const ringMesh = new Mesh(ringGeo, ringMat);
    ringMesh.receiveShadow = true;
    planetSpace.add(ringMesh);
    ringMesh.position.x = xPosition;
    ringMesh.rotation.x = -0.5 * Math.PI;
  };


  planetSpace.orbit = () => {
    planetSpace.rotateY(orbit);
  };

  planet.spin = () => {
    planet.rotateY(0.004);
  };

  return {planet, planetSpace};
};

export { createPlanet }