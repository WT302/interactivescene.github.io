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

function posterize5(){//nuit.jpg
  for(let x = 0; x < width; x++){
    for(let y = 0; y < height; y++){
      let avg = getAvg(x,y);
      let r, g, b;
      if(avg >= 205){
        r = 170; g = 230; b = 220;
      }
      else if (avg >=155){
        r = 255; g = 150; b = 210;
      }
      else if(avg >= 105){
        r = 120; g = 180; b =60;
      }
      else if(avg >= 55){
        r = 130; g = 30; b = 130;
      }
      else{
        r = 90; g = 10; b = 50;
      }
      setPixel(x,y,r,g,b);
    }
  }
}

function removeGreenRight(){//race.jpg
  for(let x = 0; x < width; x++){
    for(let y = 0; y < height; y++){
      if(x >= width/2){
        let index = (y*width+x)*4;
        pixels[index + 1]= 0;
      }
    }
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
