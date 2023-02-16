const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let x = 0;
let y = 0;
let dy = 0;

function update() {
  // update the position of the dinosaur based on its velocity
  y += dy;
  dy += 0.2; // add gravity
  if (y > canvas.height - 100) {
    // if the dinosaur hits the ground, reset its velocity
    y = canvas.height - 100;
    dy = -10;
  }

  // draw the dinosaur
  ctx.fillStyle = '#33cc33';
  ctx.fillRect(x, y, 50, 50);

  // request the next animation frame
  requestAnimationFrame(update);
}

// handle user input
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    dy = -10; // set the dinosaur's velocity to jump
  }
});