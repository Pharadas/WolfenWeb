var walls = [];
var rays = [];
var lookingAngle = 180;

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
}

function draw() {
    background(0);

    if (keyIsDown(LEFT_ARROW)) {
        lookingAngle -= 1;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        lookingAngle += 1;
    }

    // let thisRay = new Ray(mouseX, mouseY, lookingAngle);
    for (let i = 0; i < 60; i++) {
        rays[i] = new Ray(mouseX, mouseY, lookingAngle - i, i);
    }

    for (let ray of rays) {
        for (let item of walls) {
            let wallCollisionVector = ray.checkIfCollision(item.initialPosition.x,item.initialPosition.y, item.finalPosition.x, item.finalPosition.y);

            if (wallCollisionVector.dist(ray.sourcePositionVector) < ray.collisionVector.dist(ray.sourcePositionVector)) {
                ray.collisionVector = wallCollisionVector;
            }

        }

        ray.handleCollision();
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