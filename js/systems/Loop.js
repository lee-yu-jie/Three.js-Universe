class Loop {
  constructor(camera, scene, renderer, controls) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.controls = controls;
    this.planets = [];
    this.spacePlanets = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.spin();
      this.orbit()
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  orbit() {
    for (const object of this.spacePlanets) {
        object.orbit();
    }
  }

  spin() {
    for (const object of this.planets) {
        object.spin();
    }
  }
}

export { Loop };