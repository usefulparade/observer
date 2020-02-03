var test;
var vid;
var glass;
var halfWidth, halfHeight;
var rightEdge, leftEdge;

var vidSize, vidOffsetY;

var iconPositions = [];

var containerHalfWidth;

var icons = [];

var anAppIsActive;

var musicApp, messagesApp, mediaApp, calendarApp, bandcampApp, gmailApp, soundcloudApp, spotifyApp, notesApp, driveApp;
var socialRow, statusBar, htmlContainer;
var apps = [];

var homeButton;

var d, minutes, hours;
var statusTime;

var painting1, painting2, painting3;

var glassImg, phonebg;

var canv;

var extractionWindow, extractionHeader, extractionClose, extractionContent, extractionPos, extractionSize;
var greyOut;
var extractionWindowIsOpen;

var extractionTexts;

var originalTexts, splitTexts;
var printingCodeBlock;

var extractionBuffer;
var extractedP, extractedPString, extractedCodeBlock;
var bufferInterval;

var touching;

function preload() {
    painting1 = loadImage('./img/painting4.png');
    painting2 = loadImage('./img/painting5.png');
    painting3 = loadImage('./img/bottom-painted.png');
    glassImg = loadImage('./img/glass-texture-half-opacity.png');
    phonebg = loadImage('./img/phonebg/droplets.png');
    // gifLoad = createImg('./img/190403_ianloop-newframe1-GIF.gif');
}

function setup() {

    canv = createCanvas(windowWidth, windowHeight);
    canv.parent('canv');
    canv.style('z-index', 0);
    doTime();

    

    vid = createVideo(['img/newloop1.mp4'], vidLoad);
    vid.volume(0);
    vid.elt.muted = true;
    vid.elt.setAttribute("muted", "true");
    vid.elt.setAttribute("preload", "auto");
    vid.elt.setAttribute("autoplay", "true");
    vid.elt.setAttribute("playsinline", "true");
    vid.loop();
    vid.hide();

    touching = false;

    if (height < 500){
        vidOffsetY = 20;
    } else {
        vidOffsetY = 40;
    }

    if (height > 500){
        vidSize = new p5.Vector(height*0.2, height);
    } else {
        vidSize = new p5.Vector(720, 600);
    }

    if (height > 800){
        if (width > 500){
            containerHalfWidth = 250;
        } else {
            containerHalfWidth = width*0.5;
        }
    } else {
        containerHalfWidth = height * 0.3;
    }

    containerHalfWidth = constrain(containerHalfWidth, 0, width*0.5);

    halfWidth = width/2;
    halfHeight = height/2;
    rightEdge = halfWidth + containerHalfWidth;
    leftEdge = halfWidth - containerHalfWidth;

    anAppIsActive = false;

    positions();
    //MAKE ICONS
    for (i=0;i<10;i++){
        icons[i] = new Icon(iconPositions[i].x, iconPositions[i].y, i);
    }

    musicApp = select('.music');
    messagesApp = select('.messages');
    mediaApp = select('.media');
    calendarApp = select('.calendar');
    socialRow = select('.social-media-row');
    bandcampApp = select('.bandcamp');
    gmailApp = select('.gmail');
    soundcloudApp = select('.soundcloud');
    spotifyApp = select('.spotify');
    notesApp = select('.notes')
    driveApp = select('.drive')
    greyOut = select('.greyout');
    htmlContainer = select('.mainContainer');
    
    apps[0] = musicApp;
    apps[1] = messagesApp;
    apps[2] = mediaApp;
    apps[3] = calendarApp;
    apps[4] = bandcampApp;
    apps[5] = gmailApp;
    apps[6] = soundcloudApp;
    apps[7] = spotifyApp;
    apps[8] = notesApp;
    apps[9] = driveApp;

    sizes();

    homeButton = select('.home-button');
    homeButton.mousePressed(homeButtonPressed);

    extractionWindow = select('.extraction-window');
    extractionHeader = document.getElementById('extraction-header');
    extractionClose = select('.close');
    extractionContent = select('.extraction-content');
    extractionWindowIsOpen = false;
    extractionTexts = [];
    extractionPos = new p5.Vector(width*0.1,100);
    extractionSize = new p5.Vector(400,300);

    originalTexts = [];
    splitTexts = [];
    printingCodeBlock = false;
    bufferInterval = 100;
    
    //ALL EXTRACTABLE TEXT!
    //ITUNES
    originalTexts[0] = "> <b>MUSIC</b><br>127.0.0.1 --  extracting link...<br>> <a target='_blank' href='https://goo.gl/8x46XC'>itunes/apple music</a><br>> repositories found on this platform <br>> to purchase or stream music from Wistappear<br>127.0.0.1 --  extraction complete<br>>";
    //MESSAGES
    originalTexts[1] = "> <b>MESSAGES</b><br>127.0.0.1 --  extracting plaintext...<br>> conversations retrieved ... 1 <br>> FROM: Wista <br>> 4:02PM <br>> Haven't really felt much like myself since summer <br>> FROM: Wista <br>> 4:03PM <br>> Didn't you notice I've been trembling? <br>> TO: Wista <br>> 4:08PM <br>> I KNEW it would happen before it would happen. <br>> FROM: Wista <br>> 4:21PM <br>> Your finish line is further than mine... <br>> FROM: Wista <br>> 4:22PM <br>> Nothing's gonna change. Everything equally strange <br>> TO: Wista <br>> 4:25PM <br>> It's fear at first fright. Better wake up before it overtakes and breaks you! <br>> FROM: Wista <br>> 4:33PM <br>> .. prove me wronger than wrong again. I think it's time to say goodnight<br>127.0.0.1 --  extraction complete<br>>";
    //PHOTOS
    originalTexts[2] = "> <b>PHOTOS</b><br>127.0.0.1 --  extracting EXIF metadata... <br>> IMG7029.jpg Captured Time 2019:02:18 14:31:02 Geolocation 34.062751, -118.135022 Dimensions 3264x2448px, 8MP Size 33.4MB <br>> IMG7028.jpg Captured Time 2019:02:18 14:31:02 Geolocation 34.11126, -118.188129 Dimensions 3264x2448px, 8MP Size 33.68MB <br>> IMG7027.jpg Captured Time 2019:02:18 14:31:02 Geolocation 34.129142, -118.114529 Dimensions 3264x2448px, 8MP Size 33.7MB<br>127.0.0.1 --  extraction complete<br>>";
    //CALENDAR
    originalTexts[3] = "> <b>CALENDAR</b><br>127.0.0.1 --  extracting...<br>> upcoming wistappear shows<br>> can be found on <a target='_blank' href='https://www.songkick.com/artists/7501544-wistappear'>songkick</a><br>127.0.0.1 -- extraction complete<br>>";
    //BANDCAMP
    originalTexts[4] = "> <b>BANDCAMP</b><br>127.0.0.1 --  extracting link...<br>> all wistappear recordings are available <br>> for streaming or purchase <br>> on <a target='_blank' href='https://wistappear.bandcamp.com'>bandcamp</a><br>127.0.0.1 --  extraction complete<br>>";
    //GMAIL
    originalTexts[5] = "> <b>GMAIL</b><br>127.0.0.1 -- extracting...<br>> contact: <a target='_blank' href='mailto:wistappear@gmail.com?Subject=From%20your%20hacked%20phone'>wistappear@gmail.com</a><br>127.0.0.1 -- extraction complete <br>>";
    //SOUNDCLOUD
    originalTexts[6] = "> <b>SOUNDCLOUD</b><br>127.0.0.1 -- extracting... <br>> Find Wistappear on <br>> <a target='_blank' href='https://soundcloud.com/wistappear/'>soundcloud</a><br>127.0.0.1 -- extraction complete<br>>";
    //SPOTIFY
    originalTexts[7] = "> <b>SPOTIFY</b><br>127.0.0.1 -- extracting... <br>> Stream Wistappear on<br>> <a target='_blank' href='https://open.spotify.com/artist/5Wyny9RZbWdfTGBDV6r6yz'>spotify</a><br>127.0.0.1 -- extraction complete<br>>";
    //NOTES
    originalTexts[8] = "> <b>NOTES</b><br>127.0.0.1 -- extracting... <br>> Wistappear is an LA-based psychadelic re-orientation.<br>> <a target='_blank' href='http://www.usefulparade.com'>A Useful Parade site.</a><br>127.0.0.1 --  extraction complete<br>>";
    //DRIVE
    originalTexts[9] = "> <b>GOOGLE DRIVE</b><br>127.0.0.1 -- extracting... <br>> a presskit for the band Wistappear <br>> was found in <a target='_blank' href='https://drive.google.com/open?id=1lRP2J8xsOSQ6tQWGj_0fN20X6DwlP_h7'>this</a> google drive folder<br>127.0.0.1 --  extraction complete<br>>";

    for (i=0;i<originalTexts.length;i++){
        splitTexts[i] = originalTexts[i].split("");
        extractionTexts[i] = splitTexts[i];
    }

    extractionBuffer = [];
    extractedPString = '';
    extractedCodeBlock = '';
    extractedP = createP(extractedPString).addClass('extractedP');
    extractedP.parent(extractionContent);
}

function draw() {
    background(0,0,0);
    
    dragElement(document.getElementById("extraction"));
    strokeWeight(5);
    behindVideoText();
    imageMode(CENTER);
    
    push();
        translate(halfWidth, halfHeight);
        rotate(HALF_PI);
        image(vid, -vidOffsetY, 0, vidSize.x, vidSize.y);

    pop();

    glass();

    for (i=0;i<icons.length;i++){
        icons[i].show();
    }

    positions();
    sizes();

    setInterval(doTime, 1000);

    // phoneBgDisplay();
    phoneFrame();
    //backgroundPainting();
    closeExtractionWindow();
    
    printToExtractionWindow();

    extractionOverlapsPhone();
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
    var dist4 = 40 + int(containerHalfWidth*0.78);
    var dist5 = 40 + int(containerHalfWidth*1.26);
    
    if (height > 800){
        if (width > 500){
            containerHalfWidth = 250;
        } else {
            containerHalfWidth = width*0.5;
        }
    } else {
        containerHalfWidth = height * 0.3;
    }

    containerHalfWidth = constrain(containerHalfWidth, 0, width*0.5);

    // icons are re-positioned
    iconPositions[0] = new p5.Vector (rightEdge - dist1, dist3);
    iconPositions[1] = new p5.Vector (rightEdge - dist2, dist3);
    iconPositions[2] = new p5.Vector (leftEdge + dist2, dist3);
    iconPositions[3] = new p5.Vector (leftEdge + dist1, dist3);
    iconPositions[4] = new p5.Vector (rightEdge - dist1, dist4);
    iconPositions[5] = new p5.Vector (rightEdge - dist2, dist4);
    iconPositions[6] = new p5.Vector (leftEdge + dist2, dist4);
    iconPositions[7] = new p5.Vector (leftEdge + dist1, dist4);
    iconPositions[8] = new p5.Vector (rightEdge - dist1, dist5);
    iconPositions[9] = new p5.Vector (rightEdge - dist2, dist5);
    
}

function sizes(){
    // icons are re-sized
    var smallSize = int(containerHalfWidth * 0.322);

    for (i=0;i<icons.length;i++){
        icons[i].smallSize = new p5.Vector (smallSize, smallSize);
        icons[i].bigSize = new p5.Vector (containerHalfWidth*2, height);
        icons[i].rounded = icons[i].smallSize.x*0.2;
        icons[i].initialPos = iconPositions[i];
        icons[i].centerPos = new p5.Vector(halfWidth, halfHeight);

        if (containerHalfWidth >= 250){
            icons[i].titleSize = 12;
        } else {
            icons[i].titleSize = 10;
        }
    }
        
    htmlContainer.style('max-width:' +  containerHalfWidth*2 + "px; ");

    if (height < 500){
        vidOffsetY = 20;
    } else {
        vidOffsetY = 40;
    }
    vidSize = new p5.Vector(constrain(height, 0, 5000), constrain(height*0.6, 0, 5000));

}

function phoneFrame(){
    //BLACK RECTANGLES
    push();
        rectMode(CORNER);
        noStroke();
        //LEFT
        fill(0,0,0);
        rect(0, 0, halfWidth - containerHalfWidth, height);
        //RIGHT
        fill(0,0,0);
        rect(halfWidth + containerHalfWidth, 0, halfWidth - containerHalfWidth, height);
        //TOP
        // fill(3,3,12);
        // rect(halfWidth -containerHalfWidth, 0, halfWidth + containerHalfWidth, 20);
    pop();

    //STATUS BAR
    push();
        rectMode(CORNER);
        fill(255,255,255, 210);
        noStroke();
        rect(leftEdge, 20, containerHalfWidth*2, 25);
    pop();
}

function phoneBgDisplay(){
    push();
        imageMode(CORNER);
        image(phonebg, (width*0.5 - containerHalfWidth), 10, containerHalfWidth*2, height);
    pop();
}

function glass(){
    push();
        imageMode(CORNER);
        image(glassImg, (width*0.5 - containerHalfWidth), 10, containerHalfWidth*2, height);
    pop();
}

function backgroundPainting(){
    var leftWidth = ((width - (containerHalfWidth*2))/2);
    var rightPos = ((width*0.5 + (containerHalfWidth)));
    if (containerHalfWidth < windowWidth*0.5){
        push();
            imageMode(CORNER);
            image(painting1, 0, 0, leftWidth, height);
            image(painting2, rightPos, 0, leftWidth, height);
            
        pop();
    }

    push();
        imageMode(CENTER);
        //image(painting3, width*0.5, -30, 600, 100);
    pop();

}

function extractionOverlapsPhone(){
    if (extractionWindowIsOpen){
        if (extractionPos.x+extractionSize.x < halfWidth-containerHalfWidth || extractionPos.x > halfWidth+containerHalfWidth){
            greyOut.style('display: none');
        } else {
            greyOut.style('display: block');
        }
    } else {
        greyOut.style('display: none');
    }
}

function extractionOver(x_,y_){
    if (extractionWindowIsOpen){
        if (x_ > extractionPos.x-10 && x_ < (extractionPos.x + extractionSize.x+10) && y_ > extractionPos.y-10 && y_ < extractionPos.y + extractionSize.y+10){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function mouseClicked(){
    //check to see if mouse is over extraction window
    if (!extractionOver(mouseX,mouseY) && touching == false){
    // EXPAND AN APP
        for (i=0;i<icons.length;i++){
            // if you click an icon, it expands
            if (icons[i].mOver){
                if (!icons[i].active && !anAppIsActive){
                    icons[i].active = true;
                    anAppIsActive = true;
                    socialRow.style("transform: scale(0); opacity: 0");
                    extractionWindow.style("display: block");
                    extractionWindowIsOpen = true;
                    //SHOW CONTENT
                    if (apps[i] != undefined){
                        apps[i].style('transform: scale(1); opacity: 1');
                        if (icons[i].external && !icons[i].externalLoaded){
                            var externalWebsite = createElement('object');
                            externalWebsite.elt.setAttribute('type', 'text/html');
                            externalWebsite.elt.setAttribute('data', icons[i].url);
                            externalWebsite.parent(apps[i]);
                            icons[i].externalLoaded = true;
                        }
                        addTextToBuffer(i);
                    }
                }
            
                
            } else {

            }
        }     
    } else {

    }

    // HOME BUTTON HELPER
    if (mouseX > halfWidth - 40 && mouseX < halfWidth + 40 && mouseY > height - 90 && mouseY < height - 10){
        //extractionWindow.style("display: none");
        // extractionWindowIsOpen = false;
        homeButtonPressed();
    }

    
}

function touchStarted(){
    touching = true;
    if (!extractionOver(touches[0].x,touches[0].y)){
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
                    extractionWindow.style("display: block");
                    extractionWindowIsOpen = true;
                    //SHOW CONTENT
                    if (apps[i] != undefined){
                        apps[i].style('transform: scale(1); opacity: 1');
                        if (icons[i].external && !icons[i].externalLoaded){
                            var externalWebsite = createElement('object');
                            externalWebsite.elt.setAttribute('type', 'text/html');
                            externalWebsite.elt.setAttribute('data', icons[i].url);
                            externalWebsite.parent(apps[i]);
                            icons[i].externalLoaded = true;
                        }
                        addTextToBuffer(i);
                    }
                }
            }
        }
    }
}

function touchEnded() {
    touching = false;
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

function vidLoad(){
    vid.volume(0);
    vid.elt.muted = true;
    vid.elt.setAttribute("muted", "true");
    vid.elt.setAttribute("autoplay", "true");
    vid.elt.setAttribute("playsinline", "true");
    vid.loop();
    vid.hide();
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


function closeExtractionWindow(){
    document.getElementById('close').onclick = function(){
        extractionWindow.style("display: none");
        extractionWindowIsOpen = false;
    }
    document.getElementById('close').ontouchend = function(){
        extractionWindow.style("display: none");
        extractionWindowIsOpen = false;
    }
}

function addTextToBuffer(x){
    if (extractionTexts[x] != undefined){
        // ADD ON TO PREVIOUS
        // extractionBuffer = concat(extractionBuffer, extractionTexts[x]);

        //HALT PREVIOUS EXTRACTION
        if (extractionBuffer.length > 0){
            //extractionBuffer.splice(0, extractionBuffer.length);
            var fullString = extractionBuffer.join('');
            printingCodeBlock = false;
            extractedCodeBlock = '';
            //extractedPString += fullString;
            extractionBuffer.splice(0, extractionBuffer.length);
            var abortText = "<br> 127.0.0.1 --  extraction interrupt <br>";
            var abortTextSplit = abortText.split("");
            extractionBuffer = concat(abortTextSplit, extractionTexts[x]);
        } else {
            extractionBuffer.splice(0, extractionBuffer.length);
            extractionBuffer = concat(extractionBuffer, extractionTexts[x]);
        }
        

        
        //OLD, ALL-AT-ONCE ADDITION CODE:
        
        // for (i=0;i<extractionTexts[x].length;i++){
        //     extractedString += extractionTexts[x][i];
        // }
        // var newP = createP(extractedString);
        // newP.parent(extractionContent);
    } 
}

function printToExtractionWindow(){
    setTimeout(function(){
        if (extractionBuffer.length > 0){
            bufferLoop();
        }
    }, bufferInterval);
}

function bufferLoop(){
    var newChar = extractionBuffer.shift();
    if (newChar == '<'){
        printingCodeBlock = true;
        bufferInterval = 1;
    }
    if (newChar == '>'){
        extractionContent.elt.scrollTop = extractionContent.elt.scrollHeight;
        extractedPString += extractedCodeBlock;
        extractedCodeBlock = '';
        printingCodeBlock = false;
        extractedP.html(extractedPString);
        bufferInterval = 100;
    }
    if (printingCodeBlock){
        extractedCodeBlock += newChar;
    } else {
        extractedPString += newChar;
        extractedP.html(extractedPString);
    }

}

function behindVideoText(){
    push();
        translate(width*0.5, height*0.5);
        noStroke();
        fill(255, 255, 255);
        textAlign(CENTER);
        scale(1, 1);
        textSize(icons[0].textSize);
        text("127.0.0.1 --  extracting internal vision access", 0, 0);
    pop();
}

function dragElement(elmnt) {
    
    document.getElementById("extraction-header").onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();

        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // set the element's new position:
        extractionPos = new p5.Vector(constrain((mouseX - 200), 0, width-200), constrain((mouseY - 10), 10, height-300));
        elmnt.style.top = extractionPos.y + "px";
        elmnt.style.left = extractionPos.x + "px";
        
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

