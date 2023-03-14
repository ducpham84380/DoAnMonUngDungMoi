window.addEventListener('load',function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
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
    
    }
    
    class Enemy{
    
    }
    
    function handleEnemies(){
    
    }
    
    function displayStausText(){
    
    }
    
    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);

    function animete(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        player.draw(ctx);
        player.update(input);
        requestAnimationFrame(animete);
    }
    animete();
});

