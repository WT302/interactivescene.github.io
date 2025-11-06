// car
// Tony
// Oct 22, 2025
//
// 
// 
let eastbound = [];
let westbound = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

 // eastbound 
  for (let i = 0; i < 15; i++) {
    eastbound.push(new Vehicle( 0,color(random(255), random(255), random(255)),random(width),windowHeight / 2 + random(80, 130),1,random(2, 5)));                                         
  }

  // westbound 
  for (let i = 0; i < 15; i++) {
    westbound.push(new Vehicle(1,color(random(255), random(255), random(255)),random(width),windowHeight / 2 - random(80, 130),  0,random(-5, -2) ));                                                       
  }
}

function draw() {
  background(220);
  fill(80, 80, 80);
  drawRoad();

  // process all eastbound vehicles
  for (let car of eastbound) {
    car.display(); 
  }

  // process all westbound vehicles
  for (let car of westbound) {
    car.display();
  }
}

// draw road with lane divider
function drawRoad() {
  noStroke();
  fill(80, 80, 80);
  rect(0, windowHeight / 4, windowWidth, 500);

  // dashed white line in middle
  fill(255);
  for (let x = 0; x < windowWidth; x += 100) {
    rect(x, windowHeight / 2, 70, 10);
  }
}

// click to add new cars
function mousePressed() {
  // Shift + click  westbound
  if (keyIsDown(SHIFT)) {
    westbound.push(new Vehicle(1,color(random(255), random(255), random(255)),mouseX,windowHeight / 2 - 100,0,random(-5, -2)));                                                   
  } 
  else {
    // Normal click eastbound
    eastbound.push(new Vehicle(0,color(random(255), random(255), random(255)),mouseX,windowHeight / 2 + 100, 1, random(2, 5)));                                                    
  }
}

// Vehicle Class
class Vehicle {
  constructor(type, col, x, y, direction, xSpeed) {
    this.type = type; // 0 = car, 1 = truck
    this.col = col; // color
    this.x = x; // x position
    this.y = y; // y position
    this.direction = direction; // 0 = left, 1 = right
    this.xSpeed = xSpeed; // speed
  }

  display() {
    fill(this.col);
    noStroke();
    if (this.type === 0) {
      rect(this.x, this.y, 40, 20); // car
    } else {
      rect(this.x, this.y, 60, 25); // truck
    }
  }

  move() {
    this.x += this.xSpeed; // fixed
    // wrap around
    if (this.x > width) this.x = -60;
    if (this.x < -60) this.x = width;
  }

  speedUp() {
    if (this.xSpeed < 10 && this.direction === 1) this.xSpeed += 0.2;
    if (this.xSpeed > -10 && this.direction === 0) this.xSpeed -= 0.2;
  }

  speedDown() {
    if (this.direction === 1) this.xSpeed = max(this.xSpeed - 0.2, 1);
    else this.xSpeed = min(this.xSpeed + 0.2, -1);
  }

  changeColor() {
    this.col = color(random(255), random(255), random(255));
  }

  action() {
    this.move();
    if (random(100) < 1) this.speedUp();
    if (random(100) < 1) this.speedDown();
    if (random(100) < 1) this.changeColor();
    this.display();
  }
}


