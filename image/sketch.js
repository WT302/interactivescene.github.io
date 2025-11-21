// Image
// Tony
// Nov 20, 2025
//
// 
// 

let pilot;

function setup() {
  createCanvas(891, 892);
  loadAssets();
  
}


function draw(){

  image(pilot, 0, 0);

}
  
async function loadAssets() {
  pilot = await loadImage("A/chip.jpg");


}

function setPixelOneD(pos, r, g, b) {
  pixels[pos] = r;
  pixels[pos + 1] = g;
  pixels[pos + 2] = b;
}
function setPixel(x, y, r, g, b) {
  let index = (width * y + x) * 4
  setPixelOneD(index, r, g, b);
}
