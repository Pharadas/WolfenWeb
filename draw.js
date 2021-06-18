// window.location.replace("http://www.w3schools.com");
var drawWalls = false;
var walls = [];
var rays = [];
var lookingAngle = 180;
var playerPosition;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    // push border walls
    walls.push(new Wall(0, windowHeight - 10, windowWidth, windowHeight - 10, ''));
    walls.push(new Wall(0, 0, 0, windowHeight, ''));
    walls.push(new Wall(0, 0, windowWidth, 0, ''));
    walls.push(new Wall(windowWidth, 0, windowWidth - 10, windowHeight - 10, ''));

    // push text wall
    walls.push(new Wall(windowWidth * 0.5, windowHeight * 0.5, (windowWidth * 0.5) + 5, windowHeight * 0.5, 'words\nwords\nwords'));

    // fill with random walls
    // for (let i = 0; i < 8; i++) {
    //     walls.push(new Wall(randNumRange(0, windowWidth), randNumRange(0, windowHeight), randNumRange(0, windowWidth), randNumRange(0, windowHeight), ''))
    // }

    playerPosition = createVector(windowWidth * 0.5, windowHeight * 0.5);
    rectMode(CORNERS);
    textSize(30);
    textAlign(CENTER, CENTER);
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

    let rayWords;

    if (!drawWalls) {
        fill(56, 56, 56);
        rect(0, 0, windowWidth, windowHeight * 0.5);
        fill(112, 112, 112);
        rect(0, windowHeight * 0.5, windowWidth, windowHeight);
    }

    if (keyIsDown(LEFT_ARROW)) {
        lookingAngle += 3;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        lookingAngle -= 3;
    }

    if (keyIsDown(UP_ARROW)) {
        let thisViewVector = p5.Vector.fromAngle(radians(lookingAngle - 50));
        thisViewVector.mult(3);

        thisViewVector.x += playerPosition.x;
        thisViewVector.y += playerPosition.y;

        const validationRay = new Ray(playerPosition.x, playerPosition.y, lookingAngle - 50, false);
        let canMove = true;

        for (wall of walls) {
            if (validationRay.checkIfCollision(wall.initialPosition.x,wall.initialPosition.y, wall.finalPosition.x, wall.finalPosition.y).dist(playerPosition) < 3) {
                canMove = false;
                break
            }
        }
        
        if (canMove) {
            playerPosition.x = thisViewVector.x;
            playerPosition.y = thisViewVector.y;
        }
    }

    if (keyIsDown(DOWN_ARROW)) {
        let thisViewVector = p5.Vector.fromAngle(radians(lookingAngle + 130));
        thisViewVector.mult(3);

        thisViewVector.x += playerPosition.x;
        thisViewVector.y += playerPosition.y;

        const validationRay = new Ray(playerPosition.x, playerPosition.y, lookingAngle + 130, false);
        let canMove = true;

        for (wall of walls) {
            if (validationRay.checkIfCollision(wall.initialPosition.x,wall.initialPosition.y, wall.finalPosition.x, wall.finalPosition.y).dist(playerPosition) < 3) {
                canMove = false;
            }
        }

        if (canMove) {
            playerPosition.x = thisViewVector.x;
            playerPosition.y = thisViewVector.y;
        }

    }

    if (drawWalls) {
        circle(playerPosition.x, playerPosition.y, 5);
    }

    for (let i = 0; i < 100; i += 1) {
        rays[i] = new Ray(playerPosition.x, playerPosition.y, lookingAngle - i, i, 100, drawWalls);
    }

    for (let ray of rays) {
        let wallCollided = walls[0];
        for (let item of walls) {
            let wallCollisionVector = ray.checkIfCollision(item.initialPosition.x, item.initialPosition.y, item.finalPosition.x, item.finalPosition.y);

            if (wallCollisionVector.dist(ray.sourcePositionVector) < ray.collisionVector.dist(ray.sourcePositionVector)) {
                ray.collisionVector = wallCollisionVector;
                wallCollided = item;
            }

            if (drawWalls) {
                item.draw();
            }

        }

        ray.handleCollision(wallCollided.color, wallCollided.words, false);
        // let handleRayCollisionAnswer = ray.handleCollision(wallCollided.color, wallCollided.words, rayWords[0]);
        // if (handleRayCollisionAnswer[0]) {
        //     rayWords = handleRayCollisionAnswer;
        // }
        // if (drawWalls) {
        //     ray.draw();
        // }
    }

    if (drawWalls) {
        rays[49].draw();
    }


    // fill(0, 0, 0);
    // stroke(0, 0, 0);
    // text(rayWords[2], rayWords[1], windowHeight * 0.5);

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
