//board
const blockSize=10;
const rows=40;
const cols=40;
let board;
let context;

//Snake Head
let snakeX = blockSize*1;
let snakeY = blockSize*20;

let velocityX=0;
let velocityY=0;

let snakeBody = [];

//Food
let foodX
let foodY

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("highScoreDisplay").innerText = "High Score: " + highScore;
});

let gameOver = false;

window.onload = function () {
    board=document.getElementById('gameContainer');
    board.height = rows*blockSize;
    board.width = cols*blockSize;
    context = board.getContext("2d"); 

    velocityX = 1;
    velocityY = 0;

    placeFood();
    document.addEventListener("keyup",changeDirection);
    setInterval(update, 1000/10); //100 ms
}

function update(){
    if(gameOver) {
        return;
    }
    context.fillStyle="black"
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle="red";
    context.fillRect(foodX,foodY,blockSize,blockSize);

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([snakeX, snakeY]);
        score++;
        document.getElementById("scoreBoard").innerText = "Score: " + score;

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            document.getElementById("highScoreDisplay").innerText = "High Score: " + highScore;
        }

        placeFood();
    }

    for(let i=snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0]=[snakeX,snakeY];
    }

    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY,blockSize,blockSize);
    for(let i=0; i<snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }
    
    //Game over conditions
    if(snakeX < 0 || snakeX >= cols*blockSize || snakeY < 0 || snakeY >= rows*blockSize ){
        gameOver = true;
        if (confirm("GAME OVER\nDo you want to restart?")) {
            restartGame();
        }
    }
    for(let i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            if (confirm("GAME OVER\nDo you want to restart?")) {
                restartGame();
            }
            break;
        }
    }

}

function changeDirection(e){
    if(e.code == "ArrowUp" && velocityY !=1){
        velocityX=0;
        velocityY=-1;
    }
    else if(e.code == "ArrowDown" && velocityY !=-1){
        velocityX=0;
        velocityY=1;
    }
    else if(e.code == "ArrowLeft" && velocityX !=1){
        velocityX=-1;
        velocityY=0;
    }
    else if(e.code == "ArrowRight" && velocityX !=-1){
        velocityX=1;
        velocityY=0;
    }
}

function placeFood() {
    foodX=Math.floor(Math.random() * cols) * blockSize;
    foodY=Math.floor(Math.random() * rows) * blockSize;
}

function restartGame() {
    snakeX = blockSize * 1;
    snakeY = blockSize * 20;
    velocityX = 1;
    velocityY = 0;
    snakeBody = [];
    gameOver = false;
    score = 0;
    document.getElementById("scoreBoard").innerText = "Score: 0";
    placeFood();
}
