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
    this.max_height = 250;
    this.height = this.max_height * Math.random() + this.min_height;
    this.width = 70;
    this.speed = 1;
    this.game = game;

    this.x = this.game.width - 50;
    this.y = 0;
  }

  draw() {
    this.drawTopPole();
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
      y: this.game.height,
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

const initial_poles_count = 1;
const poles = [];
for (let i = 0; i < initial_poles_count; i++) {
  poles.push(new Pole({ game }));
}

function animate() {
  game.ctx.clearRect(0, 0, game.width, game.height);
  background.draw();

  for (let i = 0; i < poles.length; i++) {
    poles[i].draw();
    poles[i].update();
  }

  requestAnimationFrame(animate);
}

window.onload = function () {
  animate();
};
