class Wall {
    constructor(x1, y1, x2, y2, words) {
        this.initialPosition = createVector(x1, y1);
        this.finalPosition = createVector(x2, y2);
        this.color = createVector(random(255), random(255), random(255));
        this.words = words;
    }

    draw() {
        stroke(this.color.x, this.color.y, this.color.z);
        line(this.initialPosition.x, this.initialPosition.y, this.finalPosition.x, this.finalPosition.y);
        stroke(255, 255, 255)
    }
}