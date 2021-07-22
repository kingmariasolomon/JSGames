

class Ship {
    constructor(){
        this.visible = true;
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.movingForward = false;
        this.speed = 0.1;
        this.velX = 0;
        this.velY = 0;
        this.rotateSpeed = 0.001;
        this.radius = 15;
        this.angle = 0;
        this.strokeColor = 'yellow';
        this.noseX = canvasWidth / 2 + 15;
        this.noseY = canvasHeight / 2;
    }

    Rotate(dir) {
        this.angle += this.rotateSpeed * dir;
    }

    Update(){ //handle rotating and moving the ship around
        let radians = this.angle / Math.PI * 180;

        if(this.movingForward){ // handle the ship moving forward
            this.velX += Math.cos(radians) * this.speed; //calculate the changing values of X
            this.velY += Math.sin(radians) * this.speed;//calculate the changing values of Y
        }

        if(this.x < this.radius){ // move ship to the opposite side if it goes off game board accross (negative X) -X cordinate
            this.x = canvas.width;
        }
        if(this.x > canvas.width){ // move ship to the opposite side if it goes off game board accross (negative X) -X cordinate
            this.x = this.radius;
        }
        if(this.y < this.radius){ // move ship to the opposite side if it goes off game board accross (negative Y) -Y cordinate
            this.y = canvas.height;
        }
        if(this.y > canvas.height){ // move ship to the opposite side if it goes off game board accross (negative Y) -Y cordinate
            this.y = this.radius;
        }

        // simulate slowing down the ship when the key is not being held down
        this.velX *= 0.99;
        this.velY *= 0.99;
        // use velocity to change the value of x and y
        this.x -= this.velX;
        this.y -= this.velY;
    }

    Draw() {
        ctx.strokeStyle = this.strokeColor; //color of the ship
        ctx.beginPath();
        // PI * 2 gives 360 degrees ====  but we will draw a triangle having three sides as follows
        let vertAngle = ((Math.PI * 2) / 3);// you can change the (3) in the equation to something like (6) if want to draw polygon 

        let radians = this.angle / Math.PI * 180; // coverting angle to radians
        
        this.noseX = this.x - this.radius * Math.cos(radians);// defineship nose position X
        this.noseY = this.y - this.radius * Math.sin(radians);// defineship nose position Y
        for (let i = 0; i < 3; i++) { // cycle the ship through, get diffrent points in our triangle and calculate the position based off of the X AND Y position, center and radius of our triangle
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians)); //this draws line from one x/y value to another (this.x=center point of our triangle) (this.radius=radius of our triangle) 
        }
        ctx.closePath();
        ctx.stroke();
    }
}