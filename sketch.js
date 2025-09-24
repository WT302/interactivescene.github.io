// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let x = 200, y = 200; // position
let currentBack = 0;  // background state
let size = 50;        // size of protagonist

function setup() {
  createCanvas(windowWidth, windowHeight);
  size = 50; // initial size
}

function draw() {
  mousePressed();
  // Change background based on currentBack
  if (currentBack == 0) {
    background(135, 206, 235); // blue sky
  } else if (currentBack == 1) {
    background(255, 204, 153); // sunrise
  } else if (currentBack == 2) {
    background(100, 149, 237); // afternoon
  } else {
    background(25, 25, 112);   // night
  }

  movement();

  // Draw protagonist with dynamic size
  fill(255, 150, 0);
  ellipse(x, y, size, size);

  // Draw name text
  fill(0);
  textSize(16);
  text("By Tony", 10, height - 10);
  
}

function movement() {
  if (keyIsDown(LEFT_ARROW)) x -= 10;
  if (keyIsDown(RIGHT_ARROW)) x += 10;
  if (keyIsDown(UP_ARROW)) y -= 10;
  if (keyIsDown(DOWN_ARROW)) y += 10;

  // Keep protagonist inside canvas bounds
  x = constrain(x, size / 2, width - size / 2);
  y = constrain(y, size / 2, height - size / 2);
}

function mouseMoved() {
  size = map(mouseX, 0, width, 20, 60);
}

function mousePressed() {
  if (mouseButton === CENTER) {
    currentBack = (currentBack + 1) % 4;
  }
}
