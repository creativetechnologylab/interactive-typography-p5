# Understanding Text Rendering in p5.js: A Deep Dive

## Table of Contents

1. Introduction
2. Letter Function
3. createLetters Function
4. Inside the Draw Loop
5. Exploring Translation
6. Additional Operations

---

## 1 Introduction

This repository contains a JavaScript file that leverages the power of p5.js to transform font paths into a canvas that you can manipulate. This document provides some insight 
into how the script works. You are encouraged to have the [p5.js sketch](https://github.com/creativetechnologylab/interactive-typography-p5/blob/main/sketch.js) open in conjunction with this README.


## 2 Letter Function

The `Letter` function is your workhorse. This function runs an algorithm that extracts path data from the font for each letter.

```javascript
function Letter(char, x, y) {
  this.char = char;
  this.x = x;
  this.y = y;
  // ... more code
}
```

Users do not have to concern themselves with the inner workings of this function but two variables listed at the top of the page do have an impact on the function.

```javascript
let pathSampleFactor = 1.0;
let fontSize = 100;
```

### pathSampleFactor

This variable ranges between 0.0 and 1.0 and describes the density of points used to draw each letter. A value closer to 1.0 will render the letter as solid with many points to manipulate, while a lower value will make the letter appear more fragmented.

### fontSize

This variable controls the size of the letters. The dimensions of each letter will scale according to this value.


## 3 createLetters Function

The `createLetters` function iterates over each `Letter` and adds it to an array. The logic inside this function isn't something you'll need to modify, but feel free to study it for educational purposes.

```javascript
function createLetters() {
  letters = [];
  // ... more code
}
```


## 4 Inside the Draw Loop

The `draw` function contains a single nested loop that operates on each letter of the text. Here, you can define your algorithms to interact with each point that defines a letter.

```javascript
for (let i = 0; i < letters.length; i++) {
  let letter = letters[i];
  for (let j = 0; j < letter.pathData.length; j++) {
    // ... main operation occurs here
  }
}
```

**A Closer Look**: Inside this nested loop, you need to store the x and y position of each point tracing the letter. Once you have each point, you can use it to manipulate the rendering in numerous ways.
In this example , point.x and point.y are used to reference, in sequence, each point along the path. We use point.x and point.y as inputs into the ellipse, and also give a random offset to each point to 
make it jitter. 

```javascript
let point = letter.pathData[j];
let xOffset = random(-1, 1);
let yOffset = random(-1, 1);
ellipse(point.x + xOffset, point.y + yOffset, 1, 1);
```

## 5 Exploring Translation

Understanding translation is crucial. While our functions solely deal with the characteristics of letters, the `translate` function allows us to position these letters on the screen.

```javascript
translate(0, height * 0.5);
```

For a deeper understanding of translation, it's advised to [read the p5.js documentation on translate](https://p5js.org/reference/#/p5/translate).

## 6 Additional Operations

The code also contains functionality for deleting letters, updating the sentence, and even saving your canvas. These functionalities are mainly triggered by keyboard events, and they offer an additional layer of interaction.
