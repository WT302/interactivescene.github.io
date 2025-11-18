// car
// Tony
// Oct 22, 2025
//
// 
// 
let eastbound = [];
let westbound = [];
let trafficLight;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Eastbound cars moving right
  for (let i = 0; i < 15; i++) {
    eastbound.push(new Vehicle( 0,color(random(255), random(255), random(255)),random(width),windowHeight / 2 + random(80, 130),1, random(2, 5)));
  }

  // Westbound cars moving left
  for (let i = 0; i < 15; i++) {
    westbound.push(new Vehicle(1,color(random(255), random(255), random(255)),random(width),windowHeight / 2 - random(80, 130),0, random(-5, -2)));
  }

  // Create a traffic light
  trafficLight = new TrafficLight(width / 2, windowHeight / 2 - 200);
}

function draw() {
  background(220);
  drawRoad();

  // Show and update the traffic light
  trafficLight.display();
  trafficLight.update();

  // Move eastbound cars
  for (let car of eastbound) {
    if (!trafficLight.isRed) car.action();
    else car.display();
  }

  // Move westbound cars
  for (let car of westbound) {
    if (!trafficLight.isRed) car.action();
    else car.display();
  }
}

// Draw the road
function drawRoad() {
  noStroke();
  fill(80, 80, 80);
  rect(0, windowHeight / 4, windowWidth, 500);

  // Middle dashed line
  fill(255);
  for (let x = 0; x < windowWidth; x += 100) {
    rect(x, windowHeight / 2, 70, 10);
  }
}

// Add a new car when the mouse is pressed
function mousePressed() {
  if (keyIsDown(SHIFT)) {
    // Shift click adds westbound car
    westbound.push(new Vehicle ( 1, color(random(255), random(255), random(255)), mouseX, windowHeight / 2 - random(80, 130), 0, random(-5, -2)));
  } 
  else {
    // Normal click adds eastbound car
    eastbound.push( new Vehicle( 0, color(random(255), random(255), random(255)), mouseX,  windowHeight / 2 + random(80, 130), 1, random(2, 5)));
  }
}

// Press space to turn the light red
function keyPressed() {
  if (key === " ") {
    trafficLight.turnRed();
  }
}

// Vehicle class
class Vehicle {
  constructor(type, col, x, y, direction, xSpeed) {
    this.type = type; // 0 car 1 truck
    this.col = col; // color
    this.x = x;
    this.y = y;
    this.direction = direction; // 0 left 1 right
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
    this.x += this.xSpeed;

    // Wrap around edges
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

  action() {
    this.move();
    if (random(100) < 1) this.speedUp();
    if (random(100) < 1) this.speedDown();
    this.display();
  }
}

// Traffic light class
class TrafficLight {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isRed = false;
    this.timer = 0;
    this.redDuration = 120;
  }

  display() {
    fill(50);
    rect(this.x - 15, this.y - 20, 30, 80, 5);

    fill(this.isRed ? "red" : "grey");
    ellipse(this.x, this.y, 20);

    fill(!this.isRed ? "green" : "grey");
    ellipse(this.x, this.y + 40, 20);
  }

  update() {
    if (this.isRed) {
      this.timer--;
      if (this.timer <= 0) {
        this.isRed = false;
      }
    }
  }

  turnRed() {
    if (!this.isRed) {
      this.isRed = true;
      this.timer = this.redDuration;
    }
  }
}
