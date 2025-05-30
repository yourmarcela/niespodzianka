const canvas = document.getElementById("heartsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function randomPastelColor() {
  const colors = ['#ffb6c1', '#ffc0cb', '#ffe4e1', '#f8bbd0', '#f3e5f5'];
  return colors[Math.floor(Math.random() * colors.length)];
}

class Heart {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = 12 + Math.random() * 8;
    this.speed = 0.5 + Math.random() * 0.8;
    this.opacity = 0.6 + Math.random() * 0.4;
    this.color = randomPastelColor();
    this.swing = Math.random() * 2;
  }

  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(
      this.x + this.size / 2, this.y - this.size / 2,
      this.x + this.size, this.y + this.size / 3,
      this.x, this.y + this.size
    );
    ctx.bezierCurveTo(
      this.x - this.size, this.y + this.size / 3,
      this.x - this.size / 2, this.y - this.size / 2,
      this.x, this.y
    );
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  update() {
    this.y -= this.speed;
    this.x += Math.sin(this.y / 40) * this.swing;
    if (this.y < -this.size) {
      this.y = canvas.height + Math.random() * 100;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  }
}

function initHearts() {
  hearts = [];
  for (let i = 0; i < 50; i++) {
    hearts.push(new Heart());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart) => heart.update());
  requestAnimationFrame(animate);
}

initHearts();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initHearts();
});
