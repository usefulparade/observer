var test;

function preload() {
  test = loadImage("./img/window-test.png");
}

function setup() {
    var canv = createCanvas(windowWidth, windowHeight);
    canv.parent('canv');
    image(test, 0 , 0, width, height);
    // put setup code here
  }
  
  function draw() {
    
    // put drawing code here
  }

  function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
  }