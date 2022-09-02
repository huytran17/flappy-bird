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
    this.img.onload = () => {
      this.game.ctx.drawImage(this.img, 0, 0);
    };
  }
}

class Pole {
  constructor({ game }) {
    this.min_height = 100;
    this.max_height = 300;
    this.width = 50;
    this.game = game;

    this.x = 0;
    this.y = 0;
  }

  draw() {
    this.drawTopPole();
  }

  drawTopPole() {
    const height = this.max_height * Math.random() + this.min_height;
    this.drawPole({
      x: this.x,
      y: this.y,
      width: 100,
      height,
    });
  }

  drawBottomPole() {
    const height = this.max_height * Math.random() + this.min_height;
    this.drawPole({
      x: this.x,
      y: this.game.height,
      width: this.width,
      height,
    });
  }

  drawPole({ x, y, width, height }) {
    this.game.ctx.fillStyle = "red";
    this.game.ctx.fillRect(x, y, width, height);
  }

  update() {}
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
background.draw();

window.onload = function () {
  const pole = new Pole({ game });
  pole.draw();
};
