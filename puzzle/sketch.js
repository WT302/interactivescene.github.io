// Puzzle
// Tony
// Nov 17, 2025

// 0 (black)     255 (white)
// grid is 5 x 4 in dimension
//copy from demo
let grid = [
  [0,     0,   0,  255,   0],
  [255,   0, 255,    0, 255],
  [255, 255,   0,  255, 255],
  [0,   255,   0,    0,   0]
];

let rows = grid.length;
let cols = grid[0].length;
let squareSize = 60;
let showWin = false;
let pattern = "cross";  

function setup() {
  createCanvas(cols*squareSize, rows*squareSize);
  randomizeGrid(); // random
}

function draw() {
  background(220);
  renderGrid();
  drawOverlay();

  if(showWin){
    textSize(32);
    fill(0, 255, 0);
    textAlign(CENTER, CENTER);
    text("You Win", width / 2, height/2);
  }
}

function mousePressed(){
  if (mouseX < 0 || mouseX >= width || mouseY < 0 || mouseY >= height) {
    return;
  }

  // flip current tile
  let x = getCurrentX();
  let y = getCurrentY();

  // cheater
  if (keyIsDown(SHIFT)) {
    flip(x, y);
  } else {
    // normal click
    if (pattern === "cross") {
      // cross pattern 
      flip(x, y);                          // center 
      if (x + 1 < cols) flip(x + 1, y);    // right 
      if (x - 1 >= 0)   flip(x - 1, y);    // left 
      if (y + 1 < rows) flip(x, y + 1);    // down
      if (y - 1 >= 0)   flip(x, y - 1);    // up 
    } else if (pattern === "square") {
      // square 
      for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
          let nx = x + i;
          let ny = y + j;
          if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
            flip(nx, ny);
          }
        }
      }
    }
  }

  // check win 
  showWin = checkWin();
}


function getCurrentX(){
  //determine current col of mouse position
  let constrainedX = constrain(mouseX, 0, width-1);
  return floor(constrainedX / squareSize);
}

function getCurrentY(){
  //determine current row of mouse position
  let constrainedY = constrain(mouseY, 0, height-1);
  return floor(constrainedY / squareSize);
}


function flip(x,y){
  //takes a tile @ x,y and inverts its value
  if(grid[y][x] === 0) grid[y][x] = 255;
  else grid[y][x] = 0;
}

function renderGrid(){
  // interpret the information in the 2D array, and draw
  // a grid of square on the screen to reflect it.
  for (let y = 0; y < rows; y++){
    for (let x = 0; x < cols; x++){
      let fillColor = grid[y][x];
      fill(fillColor);
      square(x*squareSize,y*squareSize,squareSize);
    }
  }
}

//-------My own code
//random board
function randomizeGrid(){
  for(let y = 0; y < rows; y++){
    for(let x = 0; x < cols; x++){
      grid[y][x] = random([0,255]);
    }
  }
}

function checkWin(){
  let first = grid[0][0];
  for (let y = 0; y < rows; y++){
    for (let x = 0; x < cols; x++){
      if (grid[y][x] != first){
        return false;
      }
    }
  }
  return true;
}

//highlight
function drawOverlay(){
  let x = getCurrentX();
  let y = getCurrentY();
  fill(100, 100, 255, 150);
  noStroke();
  if(pattern === "cross"){                 
    highlightSquare(x, y);               
    highlightSquare(x-1, y);
    highlightSquare(x+1, y);
    highlightSquare(x, y-1);
    highlightSquare(x, y+1);
  }
  else if(pattern === "square"){           
    for(let j = -1; j <=1; j++){
      for(let i = -1; i <= 1; i++){
        highlightSquare(x+i, y+j);
      }
    }
  }
}

function highlightSquare(x, y){
  if (x >= 0 && x < cols && y >= 0 && y < rows){
    square(x * squareSize, y * squareSize, squareSize);
  }
}

// key controls 
function keyPressed(){
  // space change pattern cross / square
  if (key === ' ') {
    if (pattern === "cross") pattern = "square";
    else pattern = "cross";
  }

  // reset 
  if (key === 'r' || key === 'R') {
    randomizeGrid();
    showWin = false;
  }
}
