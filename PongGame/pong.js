let canvas;
let ctx;

let DIRECTION = {
    STOPPED : 0,
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
}

// defines what the paddle lookes like and where it should be positioned in the screen
class Paddle{
    constructor(side){
        this.width = 15;
        this.height = 65;
        this.x = side === 'left' ? 150 : canvas.width - 150;
        this.y = canvas.height / 2;
        this.score = 0;
        this.move = DIRECTION.STOPPED;
        this.speed = 11;
    }
}

// defines what the ball lookes like and where it should be positioned in the screen
class Ball {
    constructor(newSpeed){
        this.width = 15;
        this.height = 15;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.moveX = DIRECTION.STOPPED;
        this.moveY = DIRECTION.STOPPED;
        this.speed = newSpeed;
    }
}

// neccessary game variables
let player;
let aiPlayer;
let ball;
let running = false;
let gameOver = false;
let delayAmount;
let targetForBall;
let beepSound;

//  start off function that is goin to be called when ever the page is loadded
document.addEventListener("DOMContentLoaded", SetupCanvas);

// SetupCanvas { initiantes the canvas }
function SetupCanvas() {
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 1300;
    canvas.height = 600;
    player = new Paddle('left');
    aiPlayer = new Paddle('right');
    ball = new Ball(7);
    aiPlayer.speed = 6.5;
    targetForBall = player;
    delayAmount = (new Date()).getTime();
    // beepSound = document.getElementById('beepSound');
    // beepSound.src = 'beep.wav';
    document.addEventListener('keydown', MovePlayerPaddle);
    document.addEventListener('keyup', StopPlayerPaddle);
    Draw();
}

// Draw { draws on the canvas }
function Draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillRect(aiPlayer.x, aiPlayer.y, aiPlayer.width, aiPlayer.height);
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);

    ctx.font = '80px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(player.score.toString(), (canvas.width/2) - 300, 100);
    ctx.fillText(aiPlayer.score.toString(), (canvas.width/2) + 300, 100);

    if (player.score ===5) {
        ctx.fillText("Player Wins", (canvas.width/2), 300);
        gameOver = true;
    }
    if (aiPlayer.score ===5) {
        ctx.fillText("AI Wins", (canvas.width/2), 300);
        gameOver = true;
    }
}

// Update  { moves the ball, moves the paddel, and whole bunch of things that makes the game alive and running }
function Update(){
    if(!gameOver){ //render if the game is not over yet
        if (ball.x <= 0) { //if player fails to bounce the ball back, he losses, then reset the ball
            ResetBall(aiPlayer, player);
        }
        if(ball.x >= canvas.width - ball.width) { //if aiPlayer fails to bounce the ball back, he losses, then reset the ball
            ResetBall(player, aiPlayer);
        }
        if(ball.y <= 0) { //if the ball hits the roof redirect it downwards
            ball.moveY = DIRECTION.DOWN;
        }
        if(ball.y >= canvas.height - ball.height) { //if the ball hits the floor redirect it upwards
            ball.moveY = DIRECTION.UP;
        }

        // change the player's paddle position
        if (player.move === DIRECTION.DOWN) {
            player.y += player.speed;
        } else if(player.move === DIRECTION.UP) {
            player.y -= player.speed;
        }

        // keep player from moving off the board
        if (player.y < 0) {
            player.y = 0;
        } else if(player.y >= (canvas.height - player.height)) {
            player.y = canvas.height - player.height;
        }

        // add a delay after a score and thigs like that; and also see that have a player that the ball is currently aimed at
        if(AddADelay() && targetForBall){
            ball.moveX = targetForBall === player ? DIRECTION.LEFT : DIRECTION.RIGHT;
            ball.moveY = [DIRECTION.UP, DIRECTION.DOWN][Math.round(Math.random())];
            ball.y = canvas.height / 2;
            targetForBall = null;
        }

        // move ball based off of movex or movey that we set on our code
        if(ball.moveY === DIRECTION.UP){
            ball.y -= ball.speed;
        }else if(ball.moveY === DIRECTION.DOWN){
            ball.y += ball.speed;
        }
        if(ball.moveX ===DIRECTION.LEFT){
            ball.x -= ball.speed;
        }else if(ball.moveX === DIRECTION.RIGHT){
            ball.x += ball.speed;
        }

        // handle the AI up and dpwn movement
        if(aiPlayer.y > ball.y - (aiPlayer.height / 2)){
            if(ball.moveX === DIRECTION.RIGHT){
                aiPlayer.y -= aiPlayer.speed;
            }
        }
        if(aiPlayer.y < ball.y - (aiPlayer.height / 2)){
            if(ball.moveX === DIRECTION.RIGHT){
                aiPlayer.y += aiPlayer.speed;
            }
        }
        
        // keep aiPlayer from moving off the board
        if (aiPlayer.y < 0) {
            aiPlayer.y = 0;
        } else if(aiPlayer.y >= (canvas.height -aiPlayer.height)){
            aiPlayer.y = canvas.height - aiPlayer.height;
        }

        // handle when the ball collides with the player paddle
        if (ball.x - ball.width <= player.x && ball.x >= player.x - player.width) {
            if (ball.y <= player.y + player.height && ball.y + ball.height >= player.y) {
                ball.moveX = DIRECTION.RIGHT;
                // beepSound.play();
            }
        }

        // handle if the ball collides with the AI paddle
        if (ball.x - ball.width <= aiPlayer.x && ball.x >= aiPlayer.x - aiPlayer.width) {
            if (ball.y <= aiPlayer.y + aiPlayer.height && ball.y + ball.height >= aiPlayer.y) {
                ball.moveX = DIRECTION.LEFT;
                // beepSound.play();
            }
        }
    }
}

// MovePlayerPaddle { move player paddle around }
function MovePlayerPaddle(key){
    if (running === false) {
        running = true;
        window.requestAnimationFrame(GameLoop);
    }
    if(key.keyCode === 38 || key.keyCode === 87) player.move = DIRECTION.UP;
    if(key.keyCode === 40 || key.keyCode === 83) player.move = DIRECTION.DOWN;
}

// StopPlayerPaddle  { stop the palyer paddel }
function StopPlayerPaddle(evt){
    player.move = DIRECTION.STOPPED;
}

// GameLoop  { calls update and draw functions over and over again }
function GameLoop(){
    Update();
    Draw();
    if(!gameOver) requestAnimationFrame(GameLoop);
}

// ResetBall  { reset the ball position in the middle of the screen }
function ResetBall(whoScored, whoLost) {
    whoScored.score++; //increse the score of the winner
    let newBallSpeed = ball.speed + .2; //increase ball speed
    ball = new Ball(newBallSpeed); //create new ball object
    targetForBall = whoLost; //target the loser to begin the next round
    delayAmount = (new Date()).getTime();
}

// AddADelay { adds delay after acreen opportunity has commenced }
function AddADelay(){
    return ((new Date()).getTime() - delayAmount >= 1000);
}