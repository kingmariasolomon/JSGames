function CircleCollision(p1x, p1y, r1, p2x, p2y, r2) {
    let radiusSum;
    let xDiff;
    let yDiff;
    radiusSum = r1 + r2;
    xDiff = p1x - p2x;
    yDiff = p1y - p2y;
    if(radiusSum > Math.sqrt((xDiff * xDiff) + (yDiff * yDiff))){
        return true;
    }else {
        return false;
    }
}

function DrawLifeShips() {
    let startX = 1250;
    let startY = 10;
    let points = [[19,19], [-19,19]];
    let livesColor = ['red', 'yellow', 'green'];
    // ctx.strokeStyle = 'white';
    for(let i = 0; i < lives; i++){
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.strokeStyle = livesColor[i];
        for(let j = 0; j < points.length; j++){
            ctx.lineTo(startX + points[j][0], startY + points[j][1]);
        }
        ctx.closePath();
        ctx.stroke();
        startX -= 50;
    }
}