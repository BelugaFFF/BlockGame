window.addEventListener('load', initGame);

var canvas;
var ctx;

var refreshRate = 1000/60;

var SCREEN_WIDTH = 600;
var SCREEN_HEIGHT = 400;

var ball = {};
var block = {};

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
    ball.image.src = 'E:/workspace/js_ballgame/image/ball.png';
    ball.drawBall = function(){
        ctx.drawImage(this.image, this.x, this.y, 30, 30);
    };
    ball.move = function(){
        this.x += this.dx;
        this.y += this.dy;
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
    
    draw();
}

// function drawBall(dx,dy){
//     // ctx.drawImage(img, dx, dy, 30, 30);
//     ctx.drawImage(ball.image, dx, dy, 30, 30);
// }

function draw(){   
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //drawBall(x,y);
    ball.drawBall();
    ball.move();

    return;
}
