var drawWalls = false;
var walls = [];
var rays = [];
var lookingAngle = 180;
var playerPosition;

// walls.push(new Wall(0, 0, windowWidth, 0));
// walls.push(new Wall(0, 0, 0, windowHeight));

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    
    walls.push(new Wall(0, windowHeight - 10, windowWidth, windowHeight - 10));
    walls.push(new Wall(0, 0, 0, windowHeight));
    walls.push(new Wall(0, 0, windowWidth, 0));
    walls.push(new Wall(windowWidth, 0, windowWidth - 10, windowHeight - 10));

    for (let i = 0; i < 10; i++) {
        walls.push(new Wall(randNumRange(0, windowWidth), randNumRange(0, windowHeight), randNumRange(0, windowWidth), randNumRange(0, windowHeight)))
    }

    playerPosition = createVector(windowWidth * 0.5, windowHeight * 0.5);
}

function keyPressed() {
    if (keyCode === 72) {
        if (drawWalls) {
            drawWalls = false;
        } else {
            drawWalls = true;
        }
    }
}

function draw() {
    background(0);

    if (keyIsDown(LEFT_ARROW)) {
        lookingAngle += 3;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        lookingAngle -= 3;
    }

    if (keyIsDown(UP_ARROW)) {
        let thisViewVector = p5.Vector.fromAngle(radians(lookingAngle - 50));
        thisViewVector.normalize();
        thisViewVector.mult(3);

        playerPosition.x += thisViewVector.x;
        playerPosition.y += thisViewVector.y;
    }

    if (keyIsDown(DOWN_ARROW)) {
        let thisViewVector = p5.Vector.fromAngle(radians(lookingAngle - 50));
        thisViewVector.normalize();
        thisViewVector.mult(2);

        playerPosition.x -= thisViewVector.x;
        playerPosition.y -= thisViewVector.y;
    }


    circle(playerPosition.x, playerPosition.y, 5);

    for (let i = 0; i < 100; i += 1) {
        rays[i] = new Ray(playerPosition.x, playerPosition.y, lookingAngle - i, i, 100, drawWalls);
    }

    for (let ray of rays) {
        let wallCollided = walls[0];
        for (let item of walls) {
            let wallCollisionVector = ray.checkIfCollision(item.initialPosition.x,item.initialPosition.y, item.finalPosition.x, item.finalPosition.y);

            if (wallCollisionVector.dist(ray.sourcePositionVector) < ray.collisionVector.dist(ray.sourcePositionVector)) {
                ray.collisionVector = wallCollisionVector;
                wallCollided = item;
            }

            if (drawWalls) {
                item.draw();
            }

        }

        ray.handleCollision(wallCollided.color);
        if (drawWalls) {
            ray.draw();
        }
    }
    
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
    
    walls[0] = new Wall(0, windowHeight - 10, windowWidth, windowHeight - 10);
    walls[1] = new Wall(0, 0, 0, windowHeight);
    walls[2] = new Wall(0, 0, windowWidth, 0);
    walls[3] = new Wall(windowWidth, 0, windowWidth - 10, windowHeight - 10);
}

function randNumRange(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}