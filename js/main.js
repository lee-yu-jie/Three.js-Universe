import { Universe } from './Universe.js';

function main() {
  const container = document.querySelector('#scene-container');

  const universe = new Universe(container);

  universe.start();
};

main();
