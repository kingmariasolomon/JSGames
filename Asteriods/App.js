let canvas;
let ctx;
let canvasWidth = 1300;
let canvasHeight = 600;
let ship;
let keys = [];
let bullets = [];
let asteriods = [];
let score = 0;
let lives = 3;

document.addEventListener('DOMContentLoaded', SetupCanvas);

function SetupCanvas(){
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ship = new Ship();

    for (let i = 0; i < 8; i++) { // create 8 asteriods
        asteriods.push(new Asteriods());
    }

    document.body.addEventListener("keydown", function (e){
        keys[e.keyCode] = true;
        // space bar key code = 32
        if(e.keyCode === 32){
            bullets.push(new Bullet(ship.angle));
        }
    });
    document.body.addEventListener("keyup", function (e){
        keys[e.keyCode] = false;
        
    });
    Render();
}

// class Ship {
//     constructor(){
//         this.visible = true;
//         this.x = canvasWidth / 2;
//         this.y = canvasHeight / 2;
//         this.movingForward = false;
//         this.speed = 0.1;
//         this.velX = 0;
//         this.velY = 0;
//         this.rotateSpeed = 0.001;
//         this.radius = 15;
//         this.angle = 0;
//         this.strokeColor = 'yellow';
//         this.noseX = canvasWidth / 2 + 15;
//         this.noseY = canvasHeight / 2;
//     }

//     Rotate(dir) {
//         this.angle += this.rotateSpeed * dir;
//     }

//     Update(){ //handle rotating and moving the ship around
//         let radians = this.angle / Math.PI * 180;

//         if(this.movingForward){ // handle the ship moving forward
//             this.velX += Math.cos(radians) * this.speed; //calculate the changing values of X
//             this.velY += Math.sin(radians) * this.speed;//calculate the changing values of Y
//         }

//         if(this.x < this.radius){ // move ship to the opposite side if it goes off game board accross (negative X) -X cordinate
//             this.x = canvas.width;
//         }
//         if(this.x > canvas.width){ // move ship to the opposite side if it goes off game board accross (negative X) -X cordinate
//             this.x = this.radius;
//         }
//         if(this.y < this.radius){ // move ship to the opposite side if it goes off game board accross (negative Y) -Y cordinate
//             this.y = canvas.height;
//         }
//         if(this.y > canvas.height){ // move ship to the opposite side if it goes off game board accross (negative Y) -Y cordinate
//             this.y = this.radius;
//         }

//         // simulate slowing down the ship when the key is not being held down
//         this.velX *= 0.99;
//         this.velY *= 0.99;
//         // use velocity to change the value of x and y
//         this.x -= this.velX;
//         this.y -= this.velY;
//     }

//     Draw() {
//         ctx.strokeStyle = this.strokeColor; //color of the ship
//         ctx.beginPath();
//         // PI * 2 gives 360 degrees ====  but we will draw a triangle having three sides as follows
//         let vertAngle = ((Math.PI * 2) / 3);// you can change the (3) in the equation to something like (6) if want to draw polygon 

//         let radians = this.angle / Math.PI * 180; // coverting angle to radians
        
//         this.noseX = this.x - this.radius * Math.cos(radians);// defineship nose position X
//         this.noseY = this.y - this.radius * Math.sin(radians);// defineship nose position Y
//         for (let i = 0; i < 3; i++) { // cycle the ship through, get diffrent points in our triangle and calculate the position based off of the X AND Y position, center and radius of our triangle
//             ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians)); //this draws line from one x/y value to another (this.x=center point of our triangle) (this.radius=radius of our triangle) 
//         }
//         ctx.closePath();
//         ctx.stroke();
//     }
// }

// class Bullet {
//     constructor(angle){
//         this.visible = true;
//         this.x = ship.noseX;
//         this.y = ship.noseY;
//         this.angle = angle;
//         this.height = 4;
//         this.width = 4;
//         this.speed = 9;
//         this.velX = 0;
//         this.velY = 0;
//     }

//     Update(){
//         var radians = this.angle / Math.PI * 180;
//         this.x -= Math.cos(radians) * this.speed;
//         this.y -= Math.sin(radians) * this.speed;
//     }

//     Draw() {
//         ctx.fillStyle = 'red';
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
// }

// class Asteriods {
//     constructor(x, y, radius, level, collisionRadius){
//         this.visible = true;
//         this.x = x || Math.floor(Math.random() * canvasWidth); //keeps asteriods within gameboard area
//         this.y = y || Math.floor(Math.random() * canvasHeight); //keeps asteriods within gameboard area
//         this.speed = 3;
//         this.radius = radius || 50;
//         this.angle = Math.floor(Math.random() * 359); //draws on random angles
//         this.strokeColor = 'white';
//         this.collisionRadius = collisionRadius || 46;
//         this.level = level || 1;
//     }

//     Update(){
//         var radians = this.angle / Math.PI * 180;
//         this.x += Math.cos(radians) * this.speed;
//         this.y += Math.sin(radians) * this.speed;
        
//         if(this.x < this.radius){ // move ship to the opposite side if it goes off game board accross (negative X) -X cordinate
//             this.x = canvas.width;
//         }
//         if(this.x > canvas.width){ // move ship to the opposite side if it goes off game board accross (negative X) -X cordinate
//             this.x = this.radius;
//         }
//         if(this.y < this.radius){ // move ship to the opposite side if it goes off game board accross (negative Y) -Y cordinate
//             this.y = canvas.height;
//         }
//         if(this.y > canvas.height){ // move ship to the opposite side if it goes off game board accross (negative Y) -Y cordinate
//             this.y = this.radius;
//         }
//     }

//     Draw() {
//         ctx.strokeStyle = this.strokeColor;
//         ctx.beginPath();
//         // PI * 2 gives 360 degrees ====  but we will draw a triangle having three sides as follows
//         let vertAngle = ((Math.PI * 2) / 6);// you can change the (3) in the equation to something like (6) if want to draw polygon 

//         let radians = this.angle / Math.PI * 180; // coverting angle to radians
        
//         for (let i = 0; i < 6; i++) { // cycle the ship through, get diffrent points in our triangle and calculate the position based off of the X AND Y position, center and radius of our triangle
//             ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians)); //this draws line from one x/y value to another (this.x=center point of our triangle) (this.radius=radius of our triangle) 
//         }
//         ctx.closePath();
//         ctx.stroke();
//     }
// }

// function CircleCollision(p1x, p1y, r1, p2x, p2y, r2) {
//     let radiusSum;
//     let xDiff;
//     let yDiff;
//     radiusSum = r1 + r2;
//     xDiff = p1x - p2x;
//     yDiff = p1y - p2y;
//     if(radiusSum > Math.sqrt((xDiff * xDiff) + (yDiff * yDiff))){
//         return true;
//     }else {
//         return false;
//     }
// }

// function DrawLifeShips() {
//     let startX = 1250;
//     let startY = 10;
//     let points = [[19,19], [-19,19]];
//     let livesColor = ['red', 'yellow', 'green'];
//     ctx.shadowBlur = 20;
//     ctx.shadowColor = "white";
//     // ctx.strokeStyle = 'white';
//     for(let i = 0; i < lives; i++){
//         ctx.beginPath();
//         ctx.moveTo(startX, startY);
//         ctx.strokeStyle = livesColor[i];
//         for(let j = 0; j < points.length; j++){
//             ctx.lineTo(startX + points[j][0], startY + points[j][1]);
//         }
//         ctx.closePath();
//         ctx.stroke();
//         startX -= 50;
//     }
// }

function Render() {
    // 87 = W used to move the ship forward
    // 68 = D used to rotate the ship clockwise
    // 65 = A used to rotate the ship anticlockwise
    // 32 = space bar used to fire bullets
    ship.movingForward = (keys[87]);
    if(keys[68]){
        ship.Rotate(1); //1 for clockwise
    }
    if(keys[65]){
        ship.Rotate(-1); //-1 for anticlockwise
    }
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'white';
    ctx.font = '21px Arial';
    ctx.fillText('SCORE: ' + score.toString(), 20, 35);
    
    DrawLifeShips();

    // check for collisions betwen ship and asteriods
    if(asteriods.length !== 0){
        for (let k = 0; k < asteriods.length; k++) {
            if(CircleCollision(ship.x, ship.y, 11, asteriods[k].x, asteriods[k].y, asteriods[k].collisionRadius)){
                asteriods.splice(k, 1);
                ship.x = canvasWidth / 2;
                ship.y = canvasHeight / 2;
                ship.velX = 0;
                ship.velY = 0;
                lives -= 1;
            }            
        }
    }
    // check for collisions betwen bullet and asteriods
    if(asteriods.length !== 0 && bullets.length != 0){
loop1:
        for(let l = 0; l < asteriods.length; l++){
            for(let m = 0; m < bullets.length; m++){
                if(CircleCollision(bullets[m].x, bullets[m].y, 3, asteriods[l].x, asteriods[l].y, asteriods[l].collisionRadius)){
                    if(asteriods[l].level === 1){
                        asteriods.push(new Asteriods(asteriods[l].x - 5, asteriods[l].y - 5, 25, 2, 22));
                        asteriods.push(new Asteriods(asteriods[l].x + 5, asteriods[l].y + 5, 25, 2, 22));
                    }else if(asteriods[l].level === 2){
                        asteriods.push(new Asteriods(asteriods[l].x - 5, asteriods[l].y - 5, 15, 3, 12));
                        asteriods.push(new Asteriods(asteriods[l].x + 5, asteriods[l].y + 5, 15, 3, 12));
                    }
                    asteriods.splice(l, 1);
                    bullets.splice(m, 1);
                    score += 20;
                    break loop1;
                }
            }
        }
    }else if(asteriods.length === 0){
        ship.x = canvasWidth / 2;
        ship.y = canvasHeight / 2;
        ship.velX = 0;
        ship.velY = 0;
        ctx.fillStyle = 'white';
        ctx.font = '50px Arial';
        ctx.fillText('LEVEL 1 COMPLETE', canvasWidth / 2 - 150, canvasHeight / 2);
    }

    if(ship.visible){
        ship.Update();
        ship.Draw();
    }
    
    if(bullets.length != 0){
        for (let i = 0; i < bullets.length; i++) {
            bullets[i].Update();
            bullets[i].Draw();            
        }
    }
    if(asteriods.length != 0){
        for (let j = 0; j < asteriods.length; j++) {
            asteriods[j].Update();
            asteriods[j].Draw(j);            
        }
    }

    if(lives <= 0){
        ship.visible = false;
        ctx.fillStyle = 'white';
        ctx.font = '50px Arial';
        ctx.fillText('GAME OVER ', canvasWidth / 2 - 150, canvasHeight / 2);
    }else{
        requestAnimationFrame(Render);
    }
}