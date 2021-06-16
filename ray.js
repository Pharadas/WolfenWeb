class Ray {
    constructor(x1, y1, angle, numOfRay) {
        this.sourcePositionVector = createVector(x1, y1);
        this.directionVector = p5.Vector.fromAngle(radians(angle));
        this.directionVector.normalize();

        this.directionVector.mult(10000);

        this.directionVector.x += x1;
        this.directionVector.y += y1;

        this.collisionVector = createVector(Infinity, Infinity);

        this.numOfRay = numOfRay;
    }

    draw() {
        line(this.sourcePositionVector.x, this.sourcePositionVector.y, this.directionVector.x, this.directionVector.y);
        stroke(255, 255, 255);
    }

    handleCollision(color) {
        // line(this.sourcePositionVector.x, this.sourcePositionVector.y, this.collisionVector.x, this.collisionVector.y);
        circle(this.collisionVector.x, this.collisionVector.y, 3);
        let heightOfLine = 10000 / dist(this.sourcePositionVector.x, this.sourcePositionVector.y, this.collisionVector.x, this.collisionVector.y);
        stroke(color.x, color.y, color.z);
        line(this.numOfRay * 4 + 10, (windowHeight * 0.5) - heightOfLine, this.numOfRay * 4 + 10, (windowHeight * 0.5) + heightOfLine);

        console.log(heightOfLine);
    }

    checkIfCollision(x1, y1, x2, y2) {
        const x3 = this.sourcePositionVector.x;
        const y3 = this.sourcePositionVector.y;
        const x4 = this.directionVector.x;
        const y4 = this.directionVector.y;

        const denominator = (((x1 - x2) * (y3 - y4)) - ((y1 - y2) * (x3 - x4)));

        const t = (((x1 - x3) * (y3 - y4)) - ((y1 - y3) * (x3 - x4))) / denominator;
        const u = (((x2 - x1) * (y1 - y3)) - ((y2 - y1) * (x1 - x3))) / denominator;

        if (t > 0 && t < 1 && u > 0 && u < 1) {
            const pointX = x1 + t * (x2 - x1);
            const pointY = y1 + t * (y2 - y1);
        
            // circle(pointX, pointY, 10);

            return createVector(pointX, pointY);
        }

        return createVector(Infinity, Infinity);
    }
}