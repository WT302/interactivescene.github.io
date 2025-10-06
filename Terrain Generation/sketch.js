// Terrain Generation
// Tony
// oct 2, 2025
//
// 


let rectWidth = 10;      // Rectangle width
let terrainHeights = []; // Store terrain heights
let start = 0;           // Noise offset (for animation)

function setup() {
  createCanvas(windowWidth, windowHeight); // Full window canvas
}

function draw() {
  background(255);     
  generateTerrain();      // Generate terrain and draw bars
  drawAverage();
  start += 0.01;          // Animate terrain by shifting noise
}

// Generate terrain + draw bars and flag
function generateTerrain() {
  terrainHeights = [];    // Clear array each frame

  let highestIndex = 0;   // Index of highest bar
  let highestH = 0;       // Highest height

  let nCols = floor(width / rectWidth); // Calculate number of columns each frame

  for (let i = 0; i < nCols; i++) {
    let h = noise(i * 0.01 + start) * height;  // Height from Perlin noise
    terrainHeights.push(h);

    rect(i * rectWidth, height, rectWidth, -h);  // Draw bar

    // Find highest point
    if (h > highestH) {
      highestH = h;
      highestIndex = i;
    }
  }

  // Place flag at the highest point
  let flagX = highestIndex * rectWidth + rectWidth / 2;
  let flagY = height - highestH;
  drawFlag(flagX, flagY);
}

// Draw flag
function drawFlag(x, y) {
  stroke(0);
  line(x, y, x, y - 20);   // Flagpole
  fill(0);
  triangle(x, y - 20, x + 15, y - 15, x, y - 10); // Flag
}

//Draw average Line
function drawAverage(){
  if (terrainHeights.length === 0) return;
  let sum = 0;
  for(let h of terrainHeights){
    sum += h;
  }
  let  avg = sum/terrainHeights.length;
  stroke(0, 0, 255); //line
  line(0, height - avg, width, height - avg);
  noStroke();
}

// Keyboard interaction
function keyPressed(){
  if (keyCode === RIGHT_ARROW){
    rectWidth = max(2, rectWidth + 2);//increase width
  }else if (keyCode === LEFT_ARROW){
    rectWidth = max(2, rectWidth - 2);//decrease width
  }
}