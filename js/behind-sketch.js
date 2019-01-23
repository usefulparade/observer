var test;
var vid;
var glass;
var halfWidth, halfHeight;
var rightEdge, leftEdge;

var iconPositions = [];

var containerWidth;

var icons = [];

var anAppIsActive;

var musicApp;
var apps = [];

function preload() {
}

function setup() {
    var canv = createCanvas(windowWidth, windowHeight);
    canv.parent('canv');
    vid = createVideo('img/thumb-test.mov');
    vid.volume(0);
    vid.loop();
    vid.hide();
    containerWidth = 300;
    halfWidth = width/2;
    halfHeight = height/2;
    rightEdge = halfWidth + 300;
    leftEdge = halfWidth - 300;

    anAppIsActive = false;

    iconPositions[0] = new p5.Vector (rightEdge - 90, 90);
    iconPositions[1] = new p5.Vector (rightEdge - 230, 90);
    iconPositions[2] = new p5.Vector (rightEdge - 370, 90);
    iconPositions[3] = new p5.Vector (rightEdge - 510, 90);
    iconPositions[4] = new p5.Vector (rightEdge - 90, 230);
    iconPositions[5] = new p5.Vector (rightEdge - 230, 230);
    iconPositions[6] = new p5.Vector (rightEdge - 370, 230);
    for (i=0;i<iconPositions.length;i++){
        icons[i] = new Icon(iconPositions[i].x, iconPositions[i].y);
    }

    musicApp = select('.music');
    apps[0] = musicApp;
}

function draw() {
    strokeWeight(5);
    imageMode(CENTER);
    image(vid, halfWidth, halfHeight, height*1.2, height)

    

    for (i=0;i<icons.length;i++){
        icons[i].show();
    }

    phoneFrame();
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    halfWidth = width/2;
    halfHeight = height/2;
    rightEdge = halfWidth + 300;
    leftEdge = halfWidth - 300;

    // icons are resized & re-positioned
    iconPositions[0] = new p5.Vector (rightEdge - 90, 90);
    iconPositions[1] = new p5.Vector (rightEdge - 230, 90);
    iconPositions[2] = new p5.Vector (rightEdge - 370, 90);
    iconPositions[3] = new p5.Vector (rightEdge - 510, 90);
    iconPositions[4] = new p5.Vector (rightEdge - 90, 230);
    iconPositions[5] = new p5.Vector (rightEdge - 230, 230);
    iconPositions[6] = new p5.Vector (rightEdge - 370, 230);
    for (i=0;i<icons.length;i++){
        if (width > 600){
            icons[i].smallSize = new p5.Vector (100, 100);
        } else {
            icons[i].smallSize = new p5.Vector (100, 100);
        }

        icons[i].initialPos = iconPositions[i];
        icons[i].centerPos = new p5.Vector(halfWidth, halfHeight);
        
    }

}

function phoneFrame(){
    //BLACK RECTANGLES
    push();
        rectMode(CORNER);
        fill(0,0,0);
        noStroke();
        rect(0, 0, halfWidth - containerWidth, height);
        rect(halfWidth + containerWidth, 0, halfWidth - containerWidth, height);
        rect(halfWidth + containerWidth, 0, halfWidth - containerWidth, height);
    pop();

    //STATUS BAR
    push();
        rectMode(CORNER);
        fill(255,255,255, 210);
        noStroke();
        rect(leftEdge, 0, containerWidth*2, 15);
    pop();

    push();
        rectMode(CORNER);
        fill(255,255,255, 210);
        noStroke();
        rect(leftEdge, 0, containerWidth*2, 15);
    pop();

    //HOME BUTTON

    push();
        rectMode(CENTER);
        fill(0,0,0, 210);
        noStroke();
        ellipse(halfWidth, height - 50, 80, 80);
    pop();

    //ROUNDED CORNERS OF PHONE

    // push();
    //     rectMode(CENTER);
    //     noFill();
    //     stroke(0, 0, 0);
    //     rect(halfWidth, halfHeight, containerWidth*2, height, 50);
    // pop();
    
}

function mousePressed(){
    

    // EXPAND AN APP
    for (i=0;i<icons.length;i++){
        // if you click an icon, it expands
        if (icons[i].mOver){
            if (!icons[i].active && !anAppIsActive){
                icons[i].active = true;
                anAppIsActive = true;
                //SHOW CONTENT
                if (apps[i] != undefined){
                    apps[i].style('display: block');
                }
            }
        
            
        } else {

        }
    }

    // HOME BUTTON
    if (mouseX > halfWidth - 40 && mouseX < halfWidth + 40 && mouseY > height - 90 && mouseY < height - 10){
        console.log("yep!");
        for (i=0;i<icons.length;i++){
            
            //HIDE CONTENT
            if (icons[i].active){
                if (apps[i] != undefined){
                    apps[i].style('display: none');
                }
            }
            icons[i].active = false;
            
        }
        anAppIsActive = false;
    }

    
}

