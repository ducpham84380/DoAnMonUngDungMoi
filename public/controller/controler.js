window.addEventListener('load',function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1400;
    canvas.height = 720;

    class InputHandler{
        constructor(){
            this.keys = [];
            window.addEventListener('keydown',(e)=>{
                if((e.key === 'ArrowDown' ||e.key === 'ArrowUp'||e.key === 'ArrowLeft'||e.key === 'ArrowRight') && this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key);
                }
                console.log(e.key,this.keys);
            });
            window.addEventListener('keyup',(e)=>{
                if(e.key === 'ArrowDown' ||e.key === 'ArrowUp'||e.key === 'ArrowLeft'||e.key === 'ArrowRight'){
                    this.keys.splice(this.keys.indexOf(e.key),1);
                }
                console.log(e.key,this.keys);
            });
        }
    }
    
    class Player{
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.height = 200;
            this.width = 200;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.img = document.getElementById('playerImg');
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.vy = 0;
            this.weight = 1;
        }
        draw(context){
            context.fillStyle ='white';
            context.fillRect(this.x,this.y,this.height,this.width);
            context.drawImage(this.img,this.frameX * this.width,this.frameY * this.height,this.width,this.height,this.x,this.y,this.width,this.height);
        }
        update(input){
            if(input.keys.indexOf('ArrowRight') > -1){
                this.speed = 5;
            }else{
                if(input.keys.indexOf('ArrowLeft') > -1){
                    this.speed = -5;
                }else{
                    if(input.keys.indexOf('ArrowUp') > -1 && this.onGround()){
                        this.vy -= 32;
                    }else{
                        this.speed = 0;
                    }
                }
            }
            // chuyển động ngang
            this.x += this.speed;
            if(this.x < 0){
                this.x = 0;
            }else{
                if(this.x > this.gameWidth - this.width){
                    this.x = this.gameWidth - this.width
                }
            }
            // chuyển động dọc
            this.y += this.vy;
            if(!this.onGround()){
                this.vy += this.weight;
                this.frameY = 1;
            }else{
                this.vy =0;
                this.frameY = 0;
            }
            if(this.y > this.gameHeight - this.height){
                this.y = this.gameHeight - this.height
            }
        }
        onGround(){
            return this.y >= this.gameHeight - this.height;
        }
    }
    
    class Backgroud{
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.height = 720;
            this.width = 2400;
            this.x = 0;
            this.y = 0;
            this.image = document.getElementById('backgroundImg');   
            this.speed = 7;
        }
        draw(context){
            context.drawImage(this.image,this.x,this.y,this.width,this.height);
            context.drawImage(this.image,this.x + this.width - this.speed,this.y,this.width,this.height);
        }
        update(){
            this.x -= this.speed; 
            if(this.x < 0 - this.height){
                this.x = 0;
            }
        }
    }
    
    class Enemy {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 160;
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
    
    function handleEnemies(deltaTime){
        if (enemyTimer > enemyInterval + randomEmemyInterval) {
            enemies.push(new Enemy(canvas.width, canvas.height));
            console.log(enemies);
            randomEmemyInterval = Math.random() * 1000 + 500;
            enemyTimer = 0;
        }else{
            enemyTimer += deltaTime;
        }
        enemies.forEach((enemy) => {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        });
        enemies = enemies.filter((enemy) => !enemy.markForDeletion);
    }
    
    function displayStausText(){
    
    }
    
    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Backgroud(canvas.width, canvas.height);

    function animete(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        background.draw(ctx);
        background.update();
        player.draw(ctx);
        player.update(input);
        requestAnimationFrame(animete);
    }
    animete();
});

