const canvas = document.getElementById('heartsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Heart {
  constructor() {
    this.x = random(0, canvas.width);
    this.y = canvas.height + random(0, 100);
    this.size = random(10, 20);
    this.speed = random(1, 3);
    this.opacity = random(0.5, 1);
  }

  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x + this.size / 2, this.y - this.size, this.x + this.size * 2, this.y - this.size / 2, this.x, this.y + this.size);
    ctx.bezierCurveTo(this.x - this.size * 2, this.y - this.size / 2, this.x - this.size / 2, this.y - this.size, this.x, this.y);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  update() {
    this.y -= this.speed;
    if (this.y < -this.size) {
      this.y = canvas.height + this.size;
      this.x = random(0, canvas.width);
    }
    this.draw();
  }
}

function init() {
  for (let i = 0; i < 100; i++) {
    hearts.push(new Heart());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(heart => heart.update());
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});