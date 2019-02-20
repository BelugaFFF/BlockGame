window.addEventListener('load', initGame);

var canvas;
var ctx;

var refreshRate = 1000/60;

var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 500;

var ball = {};
var Block = function(x,y){
    this.x = x;
    this.y = y;
    this.HITPOINT = 1;
    this.width = 5;//todo I will check the size of blocks later.
    this.height = 3;
    this.image = new Image();
    this.image.src = './image/block.png';
    this.draw = function(){
        ctx.drawImage(this.image, this.x - (this.image.width / 2), this.y - (this.image.height / 2));
    };
};
var blocks = [];

function initGame(){
    canvas = document.getElementById('screen');
    ctx = canvas.getContext('2d');
  
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;

    ball.x = 0;
    ball.y = 0;
    ball.MOVESPEED = 3;
    ball.dx = ball.MOVESPEED;
    ball.dy = ball.MOVESPEED;
    ball.image = new Image();
    ball.image.src = './image/ball.png';
    ball.draw = function(){
        ctx.drawImage(this.image, this.x, this.y, 30, 30);
    };
    ball.move = function(){
        this.x += this.dx;
        this.y += this.dy;
    };
    ball.collision = function(){
        if(this.x < 0){
            this.x = 0;
            this.dx = ball.MOVESPEED;
        } else if(this.x > SCREEN_WIDTH - 30){
            this.x = SCREEN_WIDTH - 30;//todo imageの幅を入れる処理
            this.dx = -1 * this.MOVESPEED;
        }
        if(this.y < 0){
            this.y = 0;
            this.dy = ball.MOVESPEED;
        } else if(this.y > SCREEN_HEIGHT - 30){
            this.y = SCREEN_HEIGHT - 30;
            this.dy = -1 * this.MOVESPEED;
        }
    };

    for(let i = 0;i < 3; i++){
        for(let j = 0;j < 4; j++){
            var x = SCREEN_WIDTH / 5 * (j + 1);
            var y = SCREEN_HEIGHT / 8 * (i + 1);
            blocks[i * 4 + j] = new Block(x,y);
        }
    }

    update();
}

var dbgcount = 0;
function update(objArray){
    //dbg ずっとupdate走るのが心配
    if(dbgcount > 5000) {
        alert("5000 looped")
        return;
    }
    dbgcount++;

    setTimeout(this.update,refreshRate);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    ball.move();
    ball.collision();

    for(let block of blocks){
        block.draw();
    }
}