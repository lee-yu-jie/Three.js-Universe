import { Universe } from './Universe.js';

function main() {
  const container = document.querySelector('#scene-container');
  const btn = document.querySelector('.control-btn');
  let isStop = false;

  const universe = new Universe(container);

  universe.start();

  btn.addEventListener('click', () => {
    if(isStop){
      universe.start();
      isStop = false;
      btn.innerHTML = 'Pause';
    }else{
      universe.stop();
      isStop = true;
      btn.innerHTML = 'Start';
    }
  })
};

main();
