let font;
let pathSampleFactor = 1.0;  // Range between 0.0 and 1.0, controls the amount of points used to draw the letter.
let fontSize = 100;  // Controls the dimensions of each letter.
let letters = [];

let textTyped = "hello , world!";

function preload() {
  font = loadFont("data/NotoSans-Bold.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  createLetters();  // Initializes the letters based on the textTyped string.
}

function draw() {
  background(255);

  translate(0, height * 0.5);  // Translate to position the letters/sentence on the screen.

  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    for (let j = 0; j < letter.pathData.length; j++) {
      let point = letter.pathData[j];
      let xOffset = random(-1, 1);
      let yOffset = random(-1, 1);
      ellipse(point.x + xOffset, point.y + yOffset, 1, 1);  // Draws each point of the letter shape.
    }
  }
}

function Letter(char, x, y) {
  this.char = char;
  this.x = x;
  this.y = y;
  this.pathData = [];

  // Check for invalid pathSampleFactor
  if (pathSampleFactor < 0.0) {
    console.log("sample factor below 0. Please adjust");
    return;
  }

  // Extracts path data from the font and stores it in pathData.
  this.extractPathData = function() {
    this.pathData = font.textToPoints(this.char, this.x, this.y, fontSize, {
      sampleFactor: pathSampleFactor
    });
  };

  this.extractPathData();  // Fills pathData for the Letter object.
}


function createLetters() {
  letters = [];
  let chars = textTyped.split("");
  let x = 0;

  for (let i = 0; i < chars.length; i++) {
    if (i > 0) {
      let charsBefore = textTyped.substring(0, i);
      x = font.textBounds(charsBefore, 0, 0, fontSize).w;  // Calculate the width for positioning.
    }
    let newLetter = new Letter(chars[i], x, 0);
    letters.push(newLetter);  // Add new Letter object to the array.
  }
}

function keyPressed() {
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    if (textTyped.length > 0) {
      textTyped = textTyped.substring(0, textTyped.length - 1);
      createLetters();  // Updates the letters array when text is deleted.
    }
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
    createLetters();  // Updates the letters array when a new key is typed.
  }
}

function keyReleased() {
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), "png");

  // Various key controls for adjusting density and fontSize.
  if (keyCode == LEFT_ARROW) density *= 1.25;
  if (keyCode == RIGHT_ARROW) density /= 1.25;
  if (keyCode == UP_ARROW) {
    fontSize *= 1.1;
    createLetters();  // Updates the letters array with new fontSize.
  }
  if (keyCode == DOWN_ARROW) {
    fontSize /= 1.1;
    createLetters();  // Updates the letters array with new fontSize.
  }
  if (keyCode == ENTER) createLetters();  // Can manually update letters array.
}
