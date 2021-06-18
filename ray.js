class Ray {
    constructor(x1, y1, angle, numOfRay, resolution, drawWalls) {
        this.sourcePositionVector = createVector(x1, y1);
        this.directionVector = p5.Vector.fromAngle(radians(angle));
        this.directionVector.normalize();

        this.directionVector.mult(10000);

        this.directionVector.x += x1;
        this.directionVector.y += y1;

        this.collisionVector = createVector(Infinity, Infinity);

        this.numOfRay = numOfRay;

        this.rayResolution = windowWidth / resolution;
        this.drawWalls = drawWalls;
    }

    draw() {
        line(this.sourcePositionVector.x, this.sourcePositionVector.y, this.directionVector.x, this.directionVector.y);
        stroke(255, 255, 255);
    }

    handleCollision(color, words, wordUsed) {
        // line(this.sourcePositionVector.x, this.sourcePositionVector.y, this.collisionVector.x, this.collisionVector.y);
        let distanceToWall = dist(this.sourcePositionVector.x, this.sourcePositionVector.y, this.collisionVector.x, this.collisionVector.y) * Math.cos(radians(50 - this.numOfRay));
        let heightOfLine = (distanceToWall);
        heightOfLine = 25000 / heightOfLine;

        if (this.drawWalls) {
            circle(this.collisionVector.x, this.collisionVector.y, 3);
        }

        const linePosition = this.rayResolution * this.numOfRay;

        if (!this.drawWalls) {
            let colorOffset = distanceToWall * 0.2;

            // HAVE 'LIGHTING'
            // stroke(0, 0, 0);
            stroke(color.x - colorOffset, color.y - colorOffset, color.z - colorOffset);
            fill(color.x - colorOffset, color.y - colorOffset, color.z - colorOffset);

            // NO 'LIGHTING'
            // stroke(color.x, color.y, color.z);
            // fill(color.x, color.y, color.z);

            rect(linePosition, (windowHeight * 0.5) - heightOfLine, linePosition + 17, (windowHeight * 0.5) + heightOfLine)
        }

        if (wordUsed) {
            return true;
        } else {
            if (words != '') {
                // fill(0, 0, 0);
                // stroke(0, 0, 0);
                // text(words, linePosition, windowHeight * 0.5);
                return true, linePosition, words;
            }
        }

        return false;
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
