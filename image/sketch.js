// Image
// Tony
// Nov 20, 2025
//
// 
// 

let myImage;
function setup() {
  createCanvas(601, 602); 
  loadAssets();
  pixelDensity(1);
} 
async function loadAssets() {

  myImage = await loadImage("A/chip.jpg");// choose one Image
  pilot.hide();

}

function draw(){
  background(0);
  image(myImage, 0, 0);
  loadPixels();

  majorityColor();//chip.jpg
  // //removeGreenRight(); race.jpg
  // //posterize5();  nuit.jpg
  // mirrorFromRight(); hand.jpg

  updatePixels();
}
 
function majorityColor(){
  for(let i = 0; i < pixels.length; i += 4){
    let r = pixels[i];
    let g = pixels[i+1];
    let b = pixels[i+2];
    
    let newR = 0;
    let newG = 0;
    let newB = 0;

    //R win ties
    if(r >= g && r >= b){
      newR = 255;
    }
    else if(g >= r && g >=b){
      newG = 255;
    }
    else{
      newB = 255;
    }
    pixels[i] = newR;
    pixels[i+1] = newG;
    pixels[i+2] = newB;
  }
}

function getAvg(x,y){//return the avg intensity of pixel(x,y)
  let i = (width * y + x) * 4; 
  let r = pixels[i];
  let g = pixels[i+1];
  let b = pixels[i+2];
  return (r + g+ b)/3;
}

function setPixelOneD(pos, r, g, b){//1D location in pixels array
  pixels[pos] = r;
  pixels[pos + 1] = g;
  pixels[pos + 2] = b;
}

function setPixel(x, y, r, g, b){
  //pixel location
  let index = (width * y+ x)*4;
  setPixelOneD(index, r, g, b);
}
