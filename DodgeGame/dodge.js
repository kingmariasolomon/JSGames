var myGamePiece;
var myObstacles = [];
var myScore;

function startGame() {
    myGamePiece = new component(20, 20, 'red', 10, 120);
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    // myObstacle = new component(10, 200, "green", 300, 120);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement('canvas'),
    start : function () {
        this.canvas.width = 500;
        this.canvas.height = 300;
        this.canvas.style.cursor = "none"; //hide the original cursor
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        });
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        });
        // window.addEventListener('mousemove', function (e) { // moving with your mouse
        //     myGameArea.x = e.pageX;
        //     myGameArea.y = e.pageY;
        // })
        // window.addEventListener('touchmove', function (e) {// moving with your touch screen
        //     myGameArea.x = e.touches[0].screenX;
        //     myGameArea.y = e.touches[0].screenY;
        // })
    },
    clear : function () {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
      clearInterval(this.interval);
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.bounce = 0.6;
    this.update = function(){
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    this.newPos = function(){
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;this.hitBottom();
    }
    this.hitBottom = function() {
      var rockbottom = myGameArea.canvas.height - this.height;
      if (this.y > rockbottom) {
        this.y = rockbottom;
        this.gravitySpeed = -(this.gravitySpeed * this.bounce);
      }
    }

    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, y;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        }
    }
        myGameArea.clear();
        myGameArea.frameNo += 1;
        myGamePiece.speedX *= 0.99;
        myGamePiece.speedY *= 0.99;
        // if (myGameArea.x && myGameArea.y) { // moving with your mouse
        //     myGamePiece.x = myGameArea.x;
        //     myGamePiece.y = myGameArea.y;
        // }
        // if (myGameArea.x && myGameArea.y) { // moving with your touch screen
        //     myGamePiece.x = myGameArea.x;
        //     myGamePiece.y = myGameArea.y;
        // }
        if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -1; }
        if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 1; }
        if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -1; }
        if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 1; }
        
        if (myGameArea.frameNo == 1 || everyinterval(150)) {
            x = myGameArea.canvas.width;
            minHeight = 20;
            maxHeight = 200;
            height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
            minGap = 50;
            maxGap = 200;
            gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
            myObstacles.push(new component(10, height, "green", x, 0));
            myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
        }
        for (i = 0; i < myObstacles.length; i += 1) {
            myObstacles[i].x += -1;
            myObstacles[i].update();
        }

        myScore.text = "SCORE: " + myGameArea.frameNo;
        myScore.update();
        myGamePiece.newPos();
        myGamePiece.update();
}

function accelerate(n) {
    myGamePiece.gravity = n;
}

function moveup() {
    myGamePiece.speedY -= 1;
}

function movedown() {
    myGamePiece.speedY += 1;
}

function moveleft() {
    myGamePiece.speedX -= 1;
}

function moveright() {
    myGamePiece.speedX += 1;
}

function stopMove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}
  