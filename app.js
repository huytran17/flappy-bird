class Background {
  constructor({ game }) {
    this.img = new Image();
    this.game = game;

    this.init();
  }

  init() {
    this.img.src = "./assets/background.jpg";
  }

  draw() {
    const image_pattern = this.game.ctx.createPattern(this.img, "repeat"); // Create a pattern with this image, and set it to "repeat".
    this.game.ctx.fillStyle = image_pattern;
    this.game.ctx.fillRect(0, 0, this.game.width, this.game.height); // context.fillRect(x, y, width, height);
  }
}

class Pole {
  constructor({ game }) {
    this.min_height = 100;
    this.max_height = 160;
    this.height = this.max_height * Math.random() + this.min_height;
    this.width = 70;
    this.speed = 1;
    this.game = game;

    this.x = this.game.width;
    this.y = 0;
  }

  draw() {
    this.drawTopPole();
    this.drawBottomPole();
  }

  drawTopPole() {
    this.drawPole({
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    });
  }

  drawBottomPole() {
    this.drawPole({
      x: this.x,
      y: this.game.height - this.height,
      width: this.width,
      height: this.height,
    });
  }

  drawPole({ x, y, width, height }) {
    this.game.ctx.fillStyle = "red";
    this.game.ctx.fillRect(x, y, width, height);
  }

  update() {
    this.x -= this.speed;
    this.draw();
  }
}

class Bird {
  constructor() {}

  draw() {}

  update() {}
}

class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = 400;
    this.height = 613;

    this.init();
  }

  init() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
}
const game = new Game();
const background = new Background({ game });

const poles = [];
poles.push(new Pole({ game }));

const FIRST_INDEX = 0;
const LAST_INDEX = poles.length - 1;

let first_pole = poles[FIRST_INDEX];
let last_pole = poles[LAST_INDEX];

function animate() {
  game.ctx.clearRect(0, 0, game.width, game.height);
  background.draw();

  const need_add_new_pole = last_pole.x <= game.width / 1.7;
  if (need_add_new_pole) {
    poles.push(new Pole({ game }));
    last_pole = poles[poles.length - 1];
  }

  const need_remove_first_pole =
    first_pole.x <= 0 - first_pole.width && poles.length > 1;
  if (need_remove_first_pole) {
    poles.shift();
    first_pole = poles[FIRST_INDEX];
  }

  for (let i = 0; i < poles.length; i++) {
    poles[i].draw();
    poles[i].update();
  }

  requestAnimationFrame(animate);
}

window.onload = function () {
  animate();
};
