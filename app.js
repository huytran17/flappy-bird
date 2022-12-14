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
    const image_pattern = this.game.ctx.createPattern(this.img, "repeat");
    this.game.ctx.fillStyle = image_pattern;
    this.game.ctx.fillRect(0, 0, this.game.width, this.game.height);
  }
}

class Pole {
  constructor({ game }) {
    this.min_height = 100;
    this.max_height = 160;
    this.top_pole_height = this.max_height * Math.random() + this.min_height;
    this.bottom_pole_height = this.max_height * Math.random() + this.min_height;
    this.width = 70;
    this.speed = 1;
    this.game = game;

    this.x = this.game.width;
    this.top_pole_y = 0;
    this.bottom_pole_y = 0;
  }

  draw() {
    this.drawTopPole();
    this.drawBottomPole();
  }

  drawTopPole() {
    this.drawPole({
      x: this.x,
      y: this.top_pole_y,
      width: this.width,
      height: this.top_pole_height,
      direction: POLE_DIRECTION.TOP,
    });
  }

  drawBottomPole() {
    this.bottom_pole_y = this.game.height - this.bottom_pole_height;
    this.drawPole({
      x: this.x,
      y: this.bottom_pole_y,
      width: this.width,
      height: this.bottom_pole_height,
      direction: POLE_DIRECTION.BOTTOM,
    });
  }

  drawPole({ x, y, width, height, direction = POLE_DIRECTION.TOP }) {
    const image = new Image();
    image.src = "./assets/pole-top.png";

    const is_pole_bottom = direction === POLE_DIRECTION.BOTTOM;
    if (is_pole_bottom) {
      image.src = "./assets/pole-bottom.png";
    }

    this.game.ctx.drawImage(image, x, y, width, height);
  }

  update() {
    this.x -= this.speed;
    this.draw();
  }
}

class Bird {
  constructor({ game }) {
    this.size = 40;
    this.game = game;
    this.up_step = 45;
    this.down_step = 2.3;
    this.x = 20;
    this.y = this.game.height / 2 - this.size;
    this.image = new Image();
    this.image.src = "./assets/bird.png";
    this.falling_distance = 0;
  }

  draw() {
    this.game.ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
  }

  update() {
    this.y += this.down_step;
    this.falling_distance += 1;
    if (this.falling_distance >= FALLING_DISTANCE.FALLING_DOWN) {
      this.image.src = "./assets/bird-down.png";
    }

    this.draw();
  }
}

class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = 400;
    this.height = 613;
    this.score = 0;

    this.init();
  }

  init() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  gameOver() {
    const score_board = document.getElementById("score_board");
    score_board.classList.remove("d-none");
    return;
  }
}

let is_key_long_press = false;

const game = new Game();
const background = new Background({ game });
const bird = new Bird({ game });

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

  const need_to_set_new_first_pole = first_pole.x < bird.x;
  if (need_to_set_new_first_pole) {
    first_pole = poles[FIRST_INDEX + 1];
  }

  const need_to_remove_first_pole = first_pole.x <= 0 && poles.length > 1;
  if (need_to_remove_first_pole) {
    poles.shift();
  }

  for (let i = 0; i < poles.length; i++) {
    poles[i].draw();
    poles[i].update();
  }

  bird.update();

  //check collision
  const is_collided_with_top_pole =
    bird.x >= first_pole.x - first_pole.width / 2 &&
    bird.y <= first_pole.top_pole_y + first_pole.top_pole_height;

  const is_collided_with_bottom_pole =
    bird.x >= first_pole.x - first_pole.width / 2 &&
    bird.y + bird.size >= first_pole.bottom_pole_y;

  const is_out_of_game_container = bird.y >= game.height - bird.size;

  if (
    is_collided_with_top_pole ||
    is_collided_with_bottom_pole ||
    is_out_of_game_container
  ) {
    return game.gameOver();
  }

  requestAnimationFrame(animate);
}

window.onload = () => animate();

window.onkeydown = () => {
  if (!is_key_long_press) {
    is_key_long_press = true;

    bird.image.src = "./assets/bird-up.png";
    bird.y -= bird.up_step;
    bird.falling_distance = 0;
  }

  return;
};

window.onkeyup = () => (is_key_long_press = false);
