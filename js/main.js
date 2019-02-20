window.addEventListener('load', initGame);

var canvas;
var ctx;

var refreshRate = 1000/60;

var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 500;

var imageFactory = {};

var Ball = function(x,y,image){
    this.x = x;
    this.y = y;
    this.MOVESPEED = 3;
    this.dx = this.MOVESPEED;
    this.dy = this.MOVESPEED;
    this.image = image;
    this.colwidth = this.image.width;
    this.colheight = this.image.height;
    this.draw = function(){
        ctx.drawImage(this.image, this.x - (this.image.width / 2), this.y  - (this.image.height / 2));
    };
    this.getColWidthMin = function(){
        return (this.x - (this.image.width / 2));
    };
    this.getColHeightMin = function(){
        return (this.y - (this.image.height / 2));
    }
    this.getColWidthMax = function(){
        return (this.x + (this.image.width / 2));
    };
    this.getColHeightMax = function(){
        return (this.y + (this.image.height / 2));
    }//todo getCol()が block とかぶってるので後で継承
    this.move = function(){
        this.x += this.dx;
        this.y += this.dy;
    };
    this.collision = function(block){
        if(this.x < 0 + (this.image.width / 2)){
            this.x = 0 + (this.image.width / 2);
            this.dx = ball.MOVESPEED;
        } else if(this.x > SCREEN_WIDTH - (this.image.width / 2)){
            this.x = SCREEN_WIDTH - (this.image.width / 2);
            this.dx = -1 * this.MOVESPEED;
        }
        if(this.y < 0 + (this.image.height / 2)){
            this.y = 0 + (this.image.height / 2);
            this.dy = ball.MOVESPEED;
        } else if(this.y > SCREEN_HEIGHT - (this.image.height / 2)){
            this.y = SCREEN_HEIGHT - (this.image.height / 2);
            this.dy = -1 * this.MOVESPEED;
        }

        if(block.getColWidthMin() < this.getColWidthMin() 
        && this.getColWidthMin() < block.getColWidthMax() 
        && block.getColHeightMin() < this.getColHeightMin() 
        && this.getColHeightMin() < block.getColHeightMax() 
        || block.getColWidthMax() > this.getColWidthMax() 
        && this.getColWidthMax() > block.getColWidthMin() 
        && block.getColHeightMax > this.getColHeightMax() 
        && this.getColHeightMax > block.getColHeightMin){
            block.crash(); 
        }
    };
};
var Block = function(x,y,image){
    this.x = x;
    this.y = y;
    this.crashed = false;
    this.image = image;
    
    this.draw = function(){
        if(this.crashed) return;
        ctx.drawImage(this.image, this.x - (this.image.width / 2), this.y - (this.image.height / 2));
    };
    this.getColWidthMin = function(){
        return (this.x - (this.image.width / 2));
    };
    this.getColHeightMin = function(){
        return (this.y - (this.image.height / 2));
    }
    this.getColWidthMax = function(){
        return (this.x + (this.image.width / 2));
    };
    this.getColHeightMax = function(){
        return (this.y + (this.image.height / 2));
    }
    this.crash = function(){
        this.crashed = true;
    }
};
var ball = {};
var blocks = [];

function initGame(){
    canvas = document.getElementById('screen');
    ctx = canvas.getContext('2d');
  
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;

    imageFactory.ball = new Image();
    imageFactory.ball.addEventListener("load",function(){
        ball = new Ball(0,0,imageFactory.ball);    
    },false)
    imageFactory.ball.src = './image/ball.png';

    imageFactory.block = new Image();
    imageFactory.block.addEventListener("load",function(){
        for(let i = 0;i < 3; i++){
            for(let j = 0;j < 4; j++){
                var x = SCREEN_WIDTH / 5 * (j + 1);
                var y = SCREEN_HEIGHT / 8 * (i + 1);
                blocks[i * 4 + j] = new Block(x,y,imageFactory.block);
            }
        }
        update();
    },false);
    imageFactory.block.src = './image/block.png';
}

function update(objArray){
    setTimeout(this.update,refreshRate);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.move();
    for(let block of blocks){
        ball.collision(block);
        block.draw();
    }
    ball.draw();
}