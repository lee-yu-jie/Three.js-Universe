import {
  SphereGeometry,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
} from  "../../node_modules/three/build/three.module.js";
  
function createMeshGroup() {
  // a group holds other objects
  // but cannot be seen itself
  const group = new Group();

  const geometry = new SphereGeometry(0.25, 16, 16);

  const material = new MeshStandardMaterial({
  color: 'indigo',
  flatShading: true,
  });

  // create one prototype sphere
  const protoSphere = new Mesh(geometry, material);

  // add the sphere to the group
  group.add(protoSphere);

  // create twenty clones of the protoSphere
  // and add each to the group
  for (let i = 0; i < 1; i += 0.05) {
    const sphere = protoSphere.clone();
  
    sphere.material = new MeshStandardMaterial({
      color: 'green',
      });
    // position the spheres on around a circle
    sphere.position.x = Math.cos(3 * Math.PI * i);
    sphere.position.y = Math.sin(3 * Math.PI * i);
    sphere.position.z = -i * 3;

    sphere.scale.multiplyScalar(0.01 + i);

    group.add(sphere);
  }
  
  const radiansPerSecond = MathUtils.degToRad(30);

  // each frame, rotate the entire group of spheres
  group.tick = (delta) => {
    group.rotation.z -= delta * radiansPerSecond;
  };

  return group;
}
  
  export { createMeshGroup };