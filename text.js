class TextClass {
    constructor(x1, y1, letters) {
        this.letter = letters;
        this.initialPosition = createVector(x1, y1);

        this.finalPosition = createVector(x1 + (letters.length), y1);
        this.color = createVector(random(255), random(255), random(255));
    }

    draw() {
        stroke(255, 255, 255)
        line(this.initialPosition.x, this.initialPosition.y, this.finalPosition.x, this.finalPosition.y);
    }
}