// Interactive Scene
// Tony
// sep 23
//
//


let x = 200, y = 200; // position
let currentBack = 0;  // background state
let size = 200;        // size of protagonist

function setup() {
  createCanvas(windowWidth, windowHeight);
  size = 200; // initial size
}

function draw() {
  
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
  //mountains
  
  fill(144, 238, 144);
  ellipse(150,height-30,1500,700);
  fill(144, 238, 144);
  ellipse(1000,height-30,2500,700);
  //green ground
  fill(38, 153, 0);
  rect(0, height-70, width, 80);
  //tree
  fill(38,153, 0);
  triangle(30, 1000, 58, 600, 100, 1000);
  fill(38,153, 0);
  triangle(530, 1000, 558, 600, 600, 1000);
  fill(38,153, 0);
  triangle(1030, 1000, 1058, 600, 1100, 1000);
  fill(38,153, 0);
  triangle(1530, 1000, 1558, 600, 1600, 1000);
   //sun
   fill(255, 255, 0);
   ellipse(120,100,200,200);
 
 

  movement();
  keyPressed();

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
  print(mouseButton);
  if (mouseButton.center) {
    currentBack = (currentBack + 1) % 4;
  }
}

function keyPressed(){
  if (key == 'r' || key == 'R'){
    currentBack = 0;
  }
}