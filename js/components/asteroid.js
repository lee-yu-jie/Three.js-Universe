import { 
  Mesh, 
  MeshStandardMaterial, 
  TextureLoader,
  Object3D,
  TetrahedronGeometry,
  MathUtils
} from "../../node_modules/three/build/three.module.js";
import rockTexture from "/assets/planet/rock.jpeg";

function getRandomIntegers(min, max) {
  return (Math.random() * (max - min + 1)) + min;
}

function createAsteroid(){
  const asteroidBelt = new Object3D();
  const textureLoader = new TextureLoader();
  const rockLoadedTexture = textureLoader.load(rockTexture);

  for(let i=0; i < 800; i++){
    const rockRadius = getRandomIntegers(1, 3) * 0.1
    const detail = Math.floor(getRandomIntegers(1, 3))
    const geo = new  TetrahedronGeometry(rockRadius, detail);
    const mat = new MeshStandardMaterial({
      map: rockLoadedTexture,
    });
    const rock = new Mesh(geo, mat);
    const randomDeg = getRandomIntegers(1, 360);
    const radians = MathUtils.degToRad(randomDeg);
    const randomRadius = getRandomIntegers(29, 31)
    const x = randomRadius * Math.cos(radians);
    const z = randomRadius * Math.sin(radians);
    const y = 0

    rock.position.set(x, y, z);
    rock.receiveShadow = true;
    rock.castShadow = true;
    asteroidBelt.add(rock);
  }

  return asteroidBelt;
}

export { createAsteroid };