var test;
var vid;
var glass;
var halfWidth, halfHeight;
var rightEdge, leftEdge;

var vidSize;

var iconPositions = [];

var containerHalfWidth;

var icons = [];

var anAppIsActive;

var musicApp, messagesApp, mediaApp, calendarApp;
var socialRow;
var apps = [];

var homeButton;

var d, minutes, hours;
var statusTime;

var painting1, painting2;

function preload() {
    painting1 = loadImage('./img/painting4.png');
    painting2 = loadImage('./img/painting5.png');
}

function setup() {

    var canv = createCanvas(windowWidth, windowHeight);
    canv.parent('canv');

    doTime();

    vid = createVideo('img/loop.mp4');
    vid.volume(0);
    vid.elt.muted = true;
    vid.loop();
    vid.hide();
    if (height > 600){
        vidSize = new p5.Vector(height*1.2, height);
    } else {
        vidSize = new p5.Vector(720, 600);
    }

    if (width > 600){
        containerHalfWidth = 300;
    } else {
        containerHalfWidth = width/2;
    }
    halfWidth = width/2;
    halfHeight = height/2;
    rightEdge = halfWidth + containerHalfWidth;
    leftEdge = halfWidth - containerHalfWidth;

    anAppIsActive = false;

    positions();
    iconPositions[0] = new p5.Vector (rightEdge - containerHalfWidth*0.3, containerHalfWidth*0.4);
    iconPositions[1] = new p5.Vector (rightEdge - containerHalfWidth*0.77, containerHalfWidth*0.4);
    iconPositions[2] = new p5.Vector (leftEdge + containerHalfWidth*0.77, containerHalfWidth*0.4);
    iconPositions[3] = new p5.Vector (leftEdge + containerHalfWidth*0.3, containerHalfWidth*0.4);
    iconPositions[4] = new p5.Vector (rightEdge - containerHalfWidth*0.3, containerHalfWidth*0.87);
    iconPositions[5] = new p5.Vector (rightEdge - containerHalfWidth*0.77, containerHalfWidth*0.87);
    iconPositions[6] = new p5.Vector (leftEdge + containerHalfWidth*0.77, containerHalfWidth*0.87);
    for (i=0;i<4;i++){
        icons[i] = new Icon(iconPositions[i].x, iconPositions[i].y, i);
        // if (width > 600){
        //     icons[i].smallSize = new p5.Vector (100, 100);
        // } else {
        //     icons[i].smallSize = new p5.Vector (width/6, width/6);
        // }
    }
    sizes();
    

    musicApp = select('.music');
    messagesApp = select('.messages');
    mediaApp = select('.media');
    calendarApp = select('.calendar');
    socialRow = select('.social-media-row');
    apps[0] = musicApp;
    apps[1] = messagesApp;
    apps[2] = mediaApp;
    apps[3] = calendarApp;

    homeButton = select('.home-button');
    homeButton.mousePressed(homeButtonPressed);
}

function draw() {
    strokeWeight(5);
    imageMode(CENTER);
    image(vid, halfWidth, halfHeight, vidSize.x, vidSize.y);

    for (i=0;i<icons.length;i++){
        icons[i].show();
    }

    positions();
    sizes();

    setInterval(doTime, 1000);

    phoneFrame();
    backgroundPainting();
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    

}

function positions(){
    halfWidth = width*0.5;
    halfHeight = height*0.5;
    rightEdge = halfWidth + containerHalfWidth;
    leftEdge = halfWidth - containerHalfWidth;
    var dist1 = int(containerHalfWidth*0.3);
    var dist2 = int(containerHalfWidth*0.77);
    var dist3 = 40 + int(containerHalfWidth*0.3);
    var dist4 = 40 + int(containerHalfWidth*0.77);
    
    console.log(dist1, dist2, dist3, dist4);

    if (windowWidth > 600){
        containerHalfWidth = 300;
    } else {
        containerHalfWidth = width*0.5;
    }

    // icons are re-positioned
    iconPositions[0] = new p5.Vector (rightEdge - dist1, dist3);
    iconPositions[1] = new p5.Vector (rightEdge - dist2, dist3);
    iconPositions[2] = new p5.Vector (leftEdge + dist2, dist3);
    iconPositions[3] = new p5.Vector (leftEdge + dist1, dist3);
    iconPositions[4] = new p5.Vector (rightEdge - dist1, dist4);
    iconPositions[5] = new p5.Vector (rightEdge - dist2, dist4);
    iconPositions[6] = new p5.Vector (leftEdge + dist2, dist4);

    
}

function sizes(){
    // icons are re-sized
    var smallSize = int(width*0.166);

    for (i=0;i<icons.length;i++){
        if (width > 600){
            icons[i].smallSize = new p5.Vector (100, 100);
        } else {
            icons[i].smallSize = new p5.Vector (smallSize, smallSize);
        }

        icons[i].bigSize = new p5.Vector (containerHalfWidth*2, height);
        icons[i].rounded = icons[i].smallSize.x*0.2;
        icons[i].initialPos = iconPositions[i];
        icons[i].centerPos = new p5.Vector(halfWidth, halfHeight);
        
    }

    if (height > 600){
        vidSize = new p5.Vector(height*1.2, height);
    } else {
        vidSize = new p5.Vector(720, 600);
    }
}

function phoneFrame(){
    //BLACK RECTANGLES
    push();
        rectMode(CORNER);
        fill(1,3,15);
        noStroke();
        rect(0, 0, halfWidth - containerHalfWidth, height);
        fill(1,5,9);
        rect(halfWidth + containerHalfWidth, 0, halfWidth - containerHalfWidth, height);
        fill(3,3,12);
        rect(halfWidth -containerHalfWidth, 0, halfWidth + containerHalfWidth, 20);
    pop();

    //STATUS BAR
    push();
        rectMode(CORNER);
        fill(255,255,255, 210);
        noStroke();
        rect(leftEdge, 20, containerHalfWidth*2, 25);
    pop();

    //HOME BUTTON

    // push();
    //     rectMode(CENTER);
    //     fill(0,0,0, 210);
    //     noStroke();
    //     ellipse(halfWidth, height - 50, 80, 80);
    // pop();

    //ROUNDED CORNERS OF PHONE

    // push();
    //     rectMode(CENTER);
    //     fill(0,0,0);
    //     noStroke();
    //     rect(halfWidth, height-50, containerHalfWidth*2, 100);
    // pop();
    // push();
    //     rectMode(CENTER);
    //     noFill();
    //     stroke(0, 0, 0);
    //     strokeWeight(20);
    //     rect(halfWidth, halfHeight, containerHalfWidth*2, height, 50);
    // pop();
}

function backgroundPainting(){
    var leftWidth = ((width - (containerHalfWidth*2))/2);
    var rightPos = ((width*0.5 + (containerHalfWidth)));
    if (width > 600){
        push();
            imageMode(CORNER);
            image(painting1, 0, 0, leftWidth, height);
            image(painting2, rightPos, 0, leftWidth, height);
        pop();
    }
}

function touchStarted(){
    for (i=0;i<icons.length;i++){
        if (touches[0].x > icons[i].initialPos.x - icons[i].smallSize.x*0.5 && touches[0].x < icons[i].initialPos.x + icons[i].smallSize.x*0.5 && touches[0].y > icons[i].initialPos.y - icons[i].smallSize.y*0.5 && touches[0].y < icons[i].initialPos.y + icons[i].smallSize.y*0.5){
            icons[i].touched = true;
        } else {
            icons[i].touched = false;
        }
        if (icons[i].touched){
            if (!icons[i].active && !anAppIsActive){
                icons[i].active = true;
                anAppIsActive = true;
                socialRow.style("transform: scale(0); opacity: 0");
                //SHOW CONTENT
                if (apps[i] != undefined){
                    apps[i].style('transform: scale(1); opacity: 1');
                }
            }
        }
    }
}

function mousePressed(){
    
    // EXPAND AN APP
    for (i=0;i<icons.length;i++){
        // if you click an icon, it expands
        if (icons[i].mOver){
            if (!icons[i].active && !anAppIsActive){
                icons[i].active = true;
                anAppIsActive = true;
                socialRow.style("transform: scale(0); opacity: 0");
                //SHOW CONTENT
                if (apps[i] != undefined){
                    apps[i].style('transform: scale(1); opacity: 1');
                }
            }
        
            
        } else {

        }
    }

    // HOME BUTTON HELPER
    if (mouseX > halfWidth - 40 && mouseX < halfWidth + 40 && mouseY > height - 90 && mouseY < height - 10){

        homeButtonPressed();
    }

    
}

function doTime(){
    d = new Date();
    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes();
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours();
    statusTime = hours + ":" + minutes;
    document.getElementById('time').innerHTML = statusTime;
    // statusTime = createElement('h6', hours + ":" + minutes);
    // statusTime.parent('time');
}

function expandApp(){
   
}

function homeButtonPressed(){
    
    for (i=0;i<icons.length;i++){
        //HIDE CONTENT
        if (icons[i].active){
            if (apps[i] != undefined){
                apps[i].style("transform: translateX(100px); transform: scale(0); opacity: 0");
            }
            
        }
        icons[i].active = false;
    }
    socialRow.style("transform: scale(1); opacity: 1");
    anAppIsActive = false;
    
}

