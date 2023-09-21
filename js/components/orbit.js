import {  Vector3, BufferGeometry, LineBasicMaterial, Line, MathUtils } from "../../node_modules/three/build/three.module.js";

function createOrbit(r, orbitOblique){
  const tiltAngle = orbitOblique * (Math.PI / 180);
  const pathPoints = [];

  for (let i = 0; i <= 360; i += 5) {
    const radians = MathUtils.degToRad(i);
    const x = r * Math.cos(radians);
    const y = x * Math.tan(tiltAngle);
    const z = r * Math.sin(radians);
    pathPoints.push(new Vector3(x, y, z));
  };

  const pathGeometry = new BufferGeometry().setFromPoints(pathPoints);

  const pathMaterial = new LineBasicMaterial({ color: '#595959' });

  const pathLine = new Line(pathGeometry, pathMaterial);

  return pathLine;
};

export { createOrbit };