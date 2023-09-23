class Loop {
  constructor(camera, scene, renderer, controls) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.controls = controls;
    this.spinList = [];
    this.orbitList = [];
  };

  start() {
    this.renderer.setAnimationLoop(() => {
      this.spin();
      this.orbit();
      this.renderer.render(this.scene, this.camera);
    });
  };

  stop() {
    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera);
    });
  };

  orbit() {
    for (const object of this.orbitList) {
      object.orbit(object.originX, object.orbitSpeed);
    }
  };

  spin() {
    for (const object of this.spinList) {
      object.spin();
    };
  };
};

export { Loop };