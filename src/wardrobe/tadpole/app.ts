import Tadpole from './tadpole';
import WaterParticle from './water-particle';
import Camera from './camera';

import { ModelType, MouseType } from './data';

const INSTANCE_APP = Symbol.for('instance');

const keyNav = { x: 0, y: 0 };

const keys = {
  esc: 27,
  enter: 13,
  space: 32,
  up: 38,
  down: 40,
  left:37,
  right:39
};

export default class App {
  canvas: any;
  ctx: any;
  model: ModelType;
  mouse: MouseType;

  static getInstance(canvas: any) {
    if (!window[INSTANCE_APP]) {
      window[INSTANCE_APP] = new App(canvas);
    }
    return window[INSTANCE_APP];
  }

  constructor(canvas: any) {
    // document.addEventListener('mousemove', 		this.mousemove, false);
    // document.addEventListener('mousedown', 		this.mousedown, false);
    // document.addEventListener('mouseup',			this.mouseup, false);
    
    // document.addEventListener('touchstart',   this.touchstart, false);
    // document.addEventListener('touchend',     this.touchend, false);
    // document.addEventListener('touchcancel',  this.touchend, false);
    // document.addEventListener('touchmove',    this.touchmove, false);	

    // document.addEventListener('keydown',    this.keydown, false);
    // document.addEventListener('keyup',    this.keyup, false);

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.mouse = { x: 0, y: 0, worldx: 0, worldy: 0, tadpole: null, clicking: false };

    const userTadpole = new Tadpole();
    userTadpole.id = -1;

    this.model = {
      tadpoles: {
        [userTadpole.id]: userTadpole
      },
      userTadpole,
      camera: new Camera(canvas, this.ctx, userTadpole.x, userTadpole.y),
      waterParticles: [],
      arrows: {}
    };

    for(var i = 0; i < 150; i++) {
      this.model.waterParticles.push(new WaterParticle());
    }
  }

  run() {
    requestAnimationFrame(() => {
      this.run();
    });
    this.update();
    this.draw();
  }

  getMouseWorldPosition() {
    return {
      x: (this.mouse.x + (this.model.camera.x * this.model.camera.zoom - this.canvas.width / 2)) / this.model.camera.zoom,
      y: (this.mouse.y + (this.model.camera.y * this.model.camera.zoom  - this.canvas.height / 2)) / this.model.camera.zoom
    }
  }

  update() {
    // Update usertadpole
    if(keyNav.x != 0 || keyNav.y != 0) {
      this.model.userTadpole.userUpdate(this.model.userTadpole.x + keyNav.x,this.model.userTadpole.y + keyNav.y);
    } else {
      var mvp = this.getMouseWorldPosition();
      this.mouse.worldx = mvp.x;
      this.mouse.worldy = mvp.y;
      this.model.userTadpole.userUpdate(this.mouse.worldx, this.mouse.worldy);
    }

    this.model.camera.update(this.model);

    // Update tadpoles
    for(let id in this.model.tadpoles) {
      this.model.tadpoles[id].update(this.mouse);
    }

    // Update waterParticles
    for(let i in this.model.waterParticles) {
      this.model.waterParticles[i].update(this.model.camera.getOuterBounds(), this.model.camera.zoom);
    }

    // Update arrows
    for(let i in this.model.arrows) {
      var arrow = this.model.arrows[i];
      arrow.update();
    }
  }

  draw() {
    this.model.camera.setupContext();

    

    // Draw waterParticles
    for(let i in this.model.waterParticles) {
      this.model.waterParticles[i].draw(this.ctx);
    }

    // Draw tadpoles
    for(let id in this.model.tadpoles) {
      this.model.tadpoles[id].draw(this.ctx);
    }

    // Start UI layer (reset transform matrix)
    this.model.camera.startUILayer();

    // Draw arrows
    for(let i in this.model.arrows) {
      this.model.arrows[i].draw(this.ctx, this.canvas);
    }
  }

  mousedown(e: MouseEvent) {
    this.mouse.clicking = true;

    if(this.mouse.tadpole && this.mouse.tadpole.hover && this.mouse.tadpole.onclick(e)) {
      return;
    }
    if(this.model.userTadpole && e.which == 1) {
      this.model.userTadpole.momentum = this.model.userTadpole.targetMomentum = this.model.userTadpole.maxMomentum;
    }
  }

  mouseup(e: MouseEvent) {
    if(this.model.userTadpole && e.which == 1) {
      this.model.userTadpole.targetMomentum = 0;
    }
  }

  mousemove(e: MouseEvent) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  keydown(e: KeyboardEvent) {
    if(e.keyCode == keys.up) {
      keyNav.y = -1;
      this.model.userTadpole.momentum = this.model.userTadpole.targetMomentum = this.model.userTadpole.maxMomentum;
      e.preventDefault();
    }
    else if(e.keyCode == keys.down) {
      keyNav.y = 1;
      this.model.userTadpole.momentum = this.model.userTadpole.targetMomentum = this.model.userTadpole.maxMomentum;
      e.preventDefault();
    }
    else if(e.keyCode == keys.left) {
      keyNav.x = -1;
      this.model.userTadpole.momentum = this.model.userTadpole.targetMomentum = this.model.userTadpole.maxMomentum;
      e.preventDefault();
    }
    else if(e.keyCode == keys.right) {
      keyNav.x = 1;
      this.model.userTadpole.momentum = this.model.userTadpole.targetMomentum = this.model.userTadpole.maxMomentum;
      e.preventDefault();
    }
  }

  keyup(e: KeyboardEvent) {
    if(e.keyCode == keys.up || e.keyCode == keys.down) {
      keyNav.y = 0;
      if(keyNav.x == 0 && keyNav.y == 0) {
        this.model.userTadpole.targetMomentum = 0;
      }
      e.preventDefault();
    }
    else if(e.keyCode == keys.left || e.keyCode == keys.right) {
      keyNav.x = 0;
      if(keyNav.x == 0 && keyNav.y == 0) {
        this.model.userTadpole.targetMomentum = 0;
      }
      e.preventDefault();
    }
  }

  touchstart(e: TouchEvent) {
    e.preventDefault();
    this.mouse.clicking = true;

    if(this.model.userTadpole) {
      this.model.userTadpole.momentum = this.model.userTadpole.targetMomentum = this.model.userTadpole.maxMomentum;
    }
    const touch: any = e.changedTouches[0];
    if (touch) {
      this.mouse.x = touch.x;
      this.mouse.y = touch.y;
    }
    console.log('====>>', touch, this.mouse)
  }


  touchend(e: TouchEvent) {
    if(this.model.userTadpole) {
      this.model.userTadpole.targetMomentum = 0;
    }
  }

  touchmove(e: TouchEvent) {
    e.preventDefault();
    const touch: any = e.changedTouches[0];
    if (touch) {
      this.mouse.x = touch.x;
      this.mouse.y = touch.y;
    }
  }
}