
window.addEventListener("load", function () {

  const socket = io.connect('http://localhost:3000');
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1400;
  canvas.height = 700;

  let otherPlayers = {};
  let enemies = [];
  let score = 0;
  let gameOver = false;
  
  class InputHandler {
    constructor() {
      this.keys = [];
      window.addEventListener("keydown", (e) => {
        if (
          (e.key === "ArrowDown" ||
            e.key === "ArrowUp" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight") &&
          this.keys.indexOf(e.key) === -1
        ) {
          this.keys.push(e.key);
        }
        console.log(e.key, this.keys);
      });

      window.addEventListener("keyup", (e) => {
        if (
          e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight"
        ) {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
        console.log(e.key, this.keys);
      });
    }
  }

  class Player {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 200;
      this.height = 200;
      this.x = 0;
      this.y = this.gameHeight - this.height;
      this.image = document.getElementById("playerImg");
      this.frameX = 0;
      this.maxFrame = 8;
      this.frameY = 0;
      this.fps = 30;
      this.frameTimer = 0;
      this.frameInterval = 1000 / this.fps;
      this.speed = 0;
      this.vy = 0;
      this.weight = 1;
    }
    draw(context) {
      // context.strokeStyle = "white";
      // context.strokeRect(this.x, this.y, this.width, this.height);
      // context.beginPath();
      // context.arc(
      //   this.x + this.width / 2,
      //   this.y + this.height / 2,
      //   this.width / 2,
      //   0,
      //   2 * Math.PI
      // );
      // context.stroke();
      // context.strokeStyle = "blue";
      // context.beginPath();
      // context.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
      // context.stroke();
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    update(input, deltaTime, enemies) {
      //Collision detection
      enemies.forEach((enemy) => {
        const dx = enemy.x + enemy.width / 2 - (this.x + this.width / 2);
        const dy = enemy.y + enemy.height / 2 - (this.y + this.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < enemy.width / 2 + this.width / 2) {
          gameOver = true;
        }
      });

      //Sprite animation
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX >= this.maxFrame) {
          this.frameX = 0;
        } else {
          this.frameX++;
        }
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }

      //Movement
      if (input.keys.indexOf("ArrowRight") > -1) {
        this.speed = 6;
      } else if (input.keys.indexOf("ArrowLeft") > -1) {
        this.speed = -4;
      } else if (input.keys.indexOf("ArrowUp") > -1 && this.onGround()) {
        this.vy -= 28;
      } else if (input.keys.indexOf("ArrowDown") > -1 && !this.onGround()) {
        this.weight = 3;
      } else {
        this.speed = 0;
        this.weight = 1;
      }
      //Horizon movement
      this.x += this.speed;
      if (this.x < 0) {
        this.x = 0;
      } else if (this.x > this.gameWidth - this.width) {
        this.x = this.gameWidth - this.width;
      }
      //vertical movement
      this.y += this.vy;
      if (!this.onGround()) {
        this.vy += this.weight;
        this.maxFrame = 5;
        this.frameY = 1;
      } else {
        this.vy = 0;
        this.maxFrame = 8;
        this.frameY = 0;
      }
      if (this.y > this.gameHeight - this.height) {
        this.y = this.gameHeight - this.height;
      }
    }
    onGround() {
      return this.y >= this.gameHeight - this.height;
    }
  }

  class InputHandler2 {
    constructor() {
      this.keys = [];
      window.addEventListener("keydown", (e) => {
        console.log(e);
        if (
          (e.key === "s" || e.key === "w" || e.key === "a" || e.key === "d") &&
          this.keys.indexOf(e.key) === -1
        ) {
          this.keys.push(e.key);
        }
        console.log(e.key, this.keys);
      });

      window.addEventListener("keyup", (e) => {
        if (e.key === "s" || e.key === "w" || e.key === "a" || e.key === "d") {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
        console.log(e.key, this.keys);
      });
    }
  }

  class Player2 {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 200;
      this.height = 200;
      this.x = 0;
      this.y = this.gameHeight - this.height;
      this.image = document.getElementById("playerImg");
      this.frameX = 0;
      this.maxFrame = 8;
      this.frameY = 0;
      this.fps = 30;
      this.frameTimer = 0;
      this.frameInterval = 1000 / this.fps;
      this.speed = 0;
      this.vy = 0;
      this.weight = 1;
    }
    draw(context) {
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    update(input2, deltaTime, enemies) {
      //Collision detection
      enemies.forEach((enemy) => {
        const dx = enemy.x + enemy.width / 2 - (this.x + this.width / 2);
        const dy = enemy.y + enemy.height / 2 - (this.y + this.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < enemy.width / 2 + this.width / 2) {
          gameOver = true;
        }
      });

      //Sprite animation
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX >= this.maxFrame) {
          this.frameX = 0;
        } else {
          this.frameX++;
        }
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }

      //Movement
      if (input2.keys.indexOf("d") > -1) {
        this.speed = 6;
      } else if (input2.keys.indexOf("a") > -1) {
        this.speed = -4;
      } else if (input2.keys.indexOf("w") > -1 && this.onGround()) {
        this.vy -= 28;
      } else if (input2.keys.indexOf("s") > -1 && !this.onGround()) {
        this.weight = 3;
      } else {
        this.speed = 0;
        this.weight = 1;
      }
      //Horizon movement
      this.x += this.speed;
      if (this.x < 0) {
        this.x = 0;
      } else if (this.x > this.gameWidth - this.width) {
        this.x = this.gameWidth - this.width;
      }
      //vertical movement
      this.y += this.vy;
      if (!this.onGround()) {
        this.vy += this.weight;
        this.maxFrame = 5;
        this.frameY = 1;
      } else {
        this.vy = 0;
        this.maxFrame = 8;
        this.frameY = 0;
      }
      if (this.y > this.gameHeight - this.height) {
        this.y = this.gameHeight - this.height;
      }
    }
    onGround() {
      return this.y >= this.gameHeight - this.height;
    }
  }

  class Background {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.image = document.getElementById("backgroundImg");
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 720;
      this.speed = 10;
    }
    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        this.x + this.width - this.speed,
        this.y,
        this.width,
        this.height
      );
    }
    update() {
      this.x -= this.speed;
      if (this.x < 0 - this.width) {
        this.x = 0;
      }
    }
  }

  class Enemy {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 158;
      this.height = 119;
      this.image = document.getElementById("enemyImg");
      this.x = this.gameWidth;
      this.y = this.gameHeight - this.height;
      this.frameX = 0;
      this.maxFrame = 5;
      this.fps = 20;
      this.frameTimer = 0;
      this.frameInterval = 1000 / this.fps;
      this.speed = 5;
      this.markForDeletion = false;
    }
    draw(context) {
      // context.strokeStyle = "white";
      // context.strokeRect(this.x, this.y, this.width, this.height);
      // context.beginPath();
      // context.arc(
      //   this.x + this.width / 2,
      //   this.y + this.height / 2,
      //   this.width / 2,
      //   0,
      //   2 * Math.PI
      // );
      // context.stroke();
      // context.strokeStyle = "blue";
      // context.beginPath();
      // context.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
      // context.stroke();
      context.drawImage(
        this.image,
        this.frameX * this.width,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    update(deltaTime) {
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX >= this.maxFrame) {
          this.frameX = 0;
        } else {
          this.frameX++;
        }
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }

      this.x -= this.speed;
      if (this.x < 0 - this.width) {
        this.markForDeletion = true;
        score++;
      }
    }
  }

  function handleEnemies(deltaTime) {
    if (enemyTimer > enemyInterval + randomEmemyInterval) {
      enemies.push(new Enemy(canvas.width, canvas.height));
      console.log(enemies);
      randomEmemyInterval = Math.random() * 1000 + 500;
      enemyTimer = 0;
    } else {
      enemyTimer += deltaTime;
    }
    enemies.forEach((enemy) => {
      enemy.draw(ctx);
      enemy.update(deltaTime);
    });
    enemies = enemies.filter((enemy) => !enemy.markForDeletion);
  }

  function displayStatusText(context) {
    context.font = "40px Helvetica";

    context.fillStyle = "black";
    context.fillText("Score: " + score, 20, 50);
    context.fillStyle = "white";
    context.fillText("Score: " + score, 22, 52);

    if (gameOver) {
      context.textAlign = "center";
      context.fillStyle = "black";
      context.fillText("GAME OVER: " + score, canvas.width / 2, 200);
      context.fillStyle = "white";
      context.fillText("GAME OVER: " + score, canvas.width / 2 + 2, 200);
      context.fillStyle = "black";
      context.fillText("Press 'SPACE' to try again", canvas.width / 2, 333);
      context.fillStyle = "white";
      context.fillText("Press 'SPACE' to try again", canvas.width / 2 + 2, 333);
    }
  }

  const input = new InputHandler();
  const input2 = new InputHandler2();
  const player = new Player(canvas.width, canvas.height);
  const player2 = new Player2(canvas.width, canvas.height);
  const background = new Background(canvas.width, canvas.height);
  var clientPlayer=[];

  let lastTime = 0;
  let enemyTimer = 0;
  let enemyInterval = 2000;
  let randomEmemyInterval = Math.random() * 1000 + 500;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    //console.log(deltaTime);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    background.update();
    player.draw(ctx);
    player.update(input, deltaTime, enemies);
    // player2.draw(ctx);
    // player2.update(input2, deltaTime, enemies);
    socket.on('update', (data) => {
      player.draw(ctx);
      player.update(input, deltaTime, enemies);
    });

    handleEnemies(deltaTime);
    displayStatusText(ctx);

    if (!gameOver) {
      requestAnimationFrame(animate);
    }
  }
  animate(0);
  
  this.addEventListener("keydown", (e) => {
    if (gameOver && e.code === "Space") {
      console.log("reload");
      this.location.reload();
    }
  });

  let players = {};
    io.on('connection', (socket) => {
        console.log('a user connected');

        players[socket.id] = {
            player
        };

        socket.on('update', (data) => {
            players[socket.id] = data;
            socket.broadcast.emit('update', players[socket.id]);
        });

        socket.on('disconnect', () => {
            console.log('a user disconnected');
            delete players[socket.id];
        });
    });

});