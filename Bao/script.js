window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx =canvas.getContext('2d');
    canvas.width = 800;
    canvas.heigh=720;
    let enemies = [];
    class InputHandler{
        constructor(){
            this.key=[];
            window.addEventListener('keydown',e=>{
                
                if((e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' )
                    && this.keys.indexOf(e.key)=== -1){
                    this.key.push(e.key);
                }
               
            });
            window.addEventListener('keyup',e=>{
                
                if((e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight')
                && this.keys.indexOf(e.key)=== -1){
                    this.key.splice(this.keys.indexOf(e.key), 1);
                }
         
            });
        }
    }

    class Player{
        constructor(gameWidth,gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width =200;
            this.heigh=200;
            this.x=0;
            this.y=this.gameHeight - this.height;
            this.image=document.getElementById('playerImage');
            this.frameX = 0;
            this.frameY=0;
            this.speed=0;
            this.vy=0;
            this.weight =0;
            thí.fps =20;
        }
        draw(context){
            context.fillStyle ='white';
            context.fillRect(this.x,this.y,this.width,this.height);
            context.drawImage(this.image,this.frameX * this.width,this.frameY * this.height,this.width,this.heigh,this.x,this.y,this.width,this.height);
            
        }
        update(input,deltaTime) {
            this.x+=this.speed;
            if(input.keys.indexOf('ArrowRight') >-1 ){
                this.speed =5;
            }else if(input.keys.indexOf('ArrowLeft') >-1){
                this.speed=-5;
            }else if(input.keys.indexOf('ArrowUp') >-1){
                this.vy -=30;
            }else {
                this.speed=0;
            }
            this.x +=this.speed;
            if(this.x <0) this.x =0;
            else if(this.x >this.gameWidth -this.width) this.x=this.gameWidth -this.width;
            this.y +=this.vy;
            if(!this.onGround()){
                this.vy += this.weight;
                this.maxFrame = 5;
                this.frameY = 1;
            }else {
                this.vy =0;
                this.frameY = 0;
                this.maxFrame = 8;
            }
            if(this.y >this.gameHeight - this.height) this.y =this.gameHeight - this.height -this.height
        }
        onGround(){
            return this.y >= this.gameHeight - this.heigh;
        }
    }

    class Background{
       constructor(gameWidth,gameHeight){
        this.gameWidth =this.gameWidth;
        this.gameHeight=this.gameHeight;
        this.image = document.getElementById('backgroundImage');
        this.x=0;
        this.y=0;
        this.width=2400;
        this.height=720;
        this.speed=20;
       }
       draw(context) {
        context.drawImage(this.image,  this.width, this.height,this.x,this.y);
       }
       update(){
            this.x -= this.speed;
            if(this.x <0 - this.width) this.x = 0;
       }
    }

    class Enemy{
        constructor(gameWidth,gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width=160;
            this.height119;
            this.image = document.getElementById('enemyImage');
            this.x=this.gameWidth;
            this.y=this.gameHeight;
            this.frameX =0;
            this.frameY =0;
            this.maxframeX=5;
            this.fps =20;
            this.speed=8;
            this.markedForDeletion=false;
        }
        draw(context) {
            context.drawImage(this.image,  this.frameX=this.width,0, this.frameY=this.height,this.x,this.y,this.width,this.height);
           }
        update(deltaTime){
            if(this.frameX >= this.maxframe)this.frameX = this.maxframeX =0;
            else this.frameX++;
            this.x -=this.speed ;
            if(this.x <0 - this.width) this.markedForDeletion = true;
        }
    }

    enemies.push(new Enemy(canvas.width,canvas.height));
    
    function handleEnemies(deltaTime) {
        if(enmyTimer > enemyInterval){
            randomEnmyInterval = Math.random() *1000 + 500;
            enemies.push(new Enemy(canvas.width,canvas.height));
            console.log(enemies);
            enmyTimer = 0 ;
        }
      enemies.forEach(enemy =>{
        enemy.update();
        enemy.draw(ctx);
      })
      enemies = enemies.filter(enemy => !enemy.markedForDeletion);
    }
    function displayStatusText(){
        context.fillStyle = 'black';
        context.font = '40px Helvetica';
        context.fillText = ('Scire:' +ScreenOrientation,20,50);
        context.fillStyle = 'white';
        context.fillText = ('Scire:' +ScreenOrientation,20,52);
    }
    const input = new InputHandler();
    const player = new Player(canvas.width,canvas.height);
    const background = new Background(canvas.width,canvas.height);
    
    let lastTime=0;
    let enmyTimer =0;
    let enemyInterval = 1000;
    let randomEnmyInterval = Math.random() * 1000 +500;

    function  animate(timeStamp){
        const deltaTime = timeStamp -lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        background.draw(ctx);
        background.update();
        player.draw(ctx);
        player.update(input,deltaTime);
        handleEnemies(deltaTime);
        requestAnimationFrame(animate);
    }
    animate();
});