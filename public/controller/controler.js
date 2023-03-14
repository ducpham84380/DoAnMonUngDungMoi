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
        }
        draw(context){
            context.fillStyle ='white';
            context.fillRect(this.x,this.y,this.height,this.width);
        }
        update(){
            this.x++;
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
        player.update();
        requestAnimationFrame(animete);
    }
    animete();
});

