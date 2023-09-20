import {
  SphereGeometry,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
} from  "../../node_modules/three/build/three.module.js";
  
function createMeshGroup() {
  const group = new Group();

  const geometry = new SphereGeometry(0.25, 16, 16);

  const material = new MeshStandardMaterial({
  color: 'indigo',
  flatShading: true,
  });

  const protoSphere = new Mesh(geometry, material);

  group.add(protoSphere);

  for (let i = 0; i < 1; i += 0.05) {
    const sphere = protoSphere.clone();
  
    sphere.material = new MeshStandardMaterial({
      color: 'green',
      });

    sphere.position.x = Math.cos(3 * Math.PI * i);
    sphere.position.y = Math.sin(3 * Math.PI * i);
    sphere.position.z = -i * 3;

    sphere.scale.multiplyScalar(0.01 + i);

    group.add(sphere);
  }
  ;
  const radiansPerSecond = MathUtils.degToRad(30);

  group.tick = (delta) => {
    group.rotation.z -= delta * radiansPerSecond;
  };

  return group;
}
  
export { createMeshGroup };