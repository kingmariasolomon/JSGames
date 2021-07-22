
class Asteriods {
    constructor(x, y, radius, level, collisionRadius){
        this.visible = true;
        this.x = x || Math.floor(Math.random() * canvasWidth); //keeps asteriods within gameboard area
        this.y = y || Math.floor(Math.random() * canvasHeight); //keeps asteriods within gameboard area
        this.speed = 2;
        this.radius = radius || 50;
        this.angle = Math.floor(Math.random() * 359); //draws on random angles
        this.strokeColor = 'white';
        this.collisionRadius = collisionRadius || 46;
        this.level = level || 1;
    }

    Update(){
        var radians = this.angle / Math.PI * 180;
        this.x += Math.cos(radians) * this.speed;
        this.y += Math.sin(radians) * this.speed;
        
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
    }

    Draw() {
        ctx.strokeStyle = this.strokeColor;
        ctx.beginPath();
        // PI * 2 gives 360 degrees ====  but we will draw a triangle having three sides as follows
        let vertAngle = ((Math.PI * 2) / 6);// you can change the (3) in the equation to something like (6) if want to draw polygon 

        let radians = this.angle / Math.PI * 180; // coverting angle to radians
        
        for (let i = 0; i < 6; i++) { // cycle the ship through, get diffrent points in our triangle and calculate the position based off of the X AND Y position, center and radius of our triangle
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians)); //this draws line from one x/y value to another (this.x=center point of our triangle) (this.radius=radius of our triangle) 
        }
        ctx.closePath();
        ctx.stroke();
    }
}