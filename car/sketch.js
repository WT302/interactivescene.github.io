// car
// Tony
// Oct 22, 2025
//
// 
// 


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  fill(80,80,80);
  drawRoad();
}

function drawRoad(){
  noStroke();
  rect(0, windowHeight/4, windowWidth, 500);
  for(let x = 0; x < windowWidth; x =+ 100){
    fill(255,255,255);
    rect(x,windowHeight/2, 70, 10);
  }
}