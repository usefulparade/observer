function Icon(x, y, ind){
    this.initialPos = new p5.Vector(x, y);
    this.centerPos = new p5.Vector(halfWidth, halfHeight);
    this.actualPos = this.initialPos;
    this.smallSize = containerHalfWidth * 0.322;
    this.goneSize = new p5.Vector(0, 0);
    this.bigSize = new p5.Vector (containerHalfWidth*2, height);
    this.actualSize = this.smallSize;
    this.titleSize = 12;
    this.mOver = false;
    this.touched = false;
    this.active = false;
    this.gone = false;
    this.stateChange = 0;
    this.stateChangeEased = 0;
    this.disappearChange = 0;
    this.disappearChangeEased = 0;
    this.easeSpeed = 0.1;
    this.rounded = this.smallSize.x*0.2;
    this.ind = ind;
    this.opacity = 127;
    this.external = false;
    this.externalLoaded = false;
    this.url = '';
    this.icon = loadImage('./img/icons/icon' + this.ind + '.png');
    this.unreadImage = loadImage('./img/icons/unread.png');
    this.unread = false;
    if (this.ind === 0){
        //ITUNES
        this.smallColor = color(255, 255, 255, this.opacity);
        this.bigColor = color(255, 255, 255, this.opacity);
        this.color = this.smallColor;
        this.title = 'Music';
    } else if (this.ind === 1){
        //MESSAGES
        this.smallColor = color(84, 228, 77, this.opacity);
        this.bigColor = color(255, 255, 255, this.opacity);
        this.color = this.smallColor;
        this.title = 'Messages';
    } else if (this.ind === 2){
        //PHOTOS
        this.smallColor = color(255, 255, 255,this.opacity);
        this.bigColor = color(255, 255, 255, this.opacity);
        this.color = this.smallColor;
        this.title = 'Photos';
    } else if (this.ind === 3){
        //CALENDAR
        this.smallColor = color(255, 255, 255, this.opacity);
        this.bigColor = color(255, 255, 255, this.opacity);
        this.color = this.smallColor;
        this.title = 'Calendar';
    } else if (this.ind === 4){
        //BANDCAMP
        this.smallColor = color(255, 255, 255, this.opacity);
        this.bigColor = color(255, 255, 255, this.opacity);
        this.color = this.smallColor;
        this.title = 'Bandcamp';
        this.external = false;
        this.url = 'http://wistappear.bandcamp.com';
    } else if (this.ind === 5){
        //GMAIL
        this.smallColor = color(255, 255, 255, this.opacity);
        this.bigColor = color(255, 255, 255, this.opacity);
        this.color = this.smallColor;
        this.title = 'Gmail';
        this.unread = true;
    } else if (this.ind === 6){
        //SOUNDCLOUD
        this.smallColor = color(252, 57, 8, this.opacity);
        this.bigColor = color(255, 255, 255, this.opacity);
        this.color = this.smallColor;
        this.title = 'SoundCloud';
        this.external = false;
        this.url = 'http://www.soundcloud.com/wistappear';
    } else if (this.ind === 7){
        //SPOTIFY
        this.smallColor = color(0, 0, 0, this.opacity);
        this.bigColor = color(255, 255, 255, this.opacity);
        this.color = this.smallColor;
        this.title = 'Spotify';
    } else if (this.ind === 8){
        //NOTES
        this.smallColor = color(0, 0, 0, 0);
        this.bigColor = color(255, 255, 255, this.opacity);
        this.color = this.smallColor;
        this.title = 'Notes';
    } else if (this.ind === 9){
        //DRIVE
        this.smallColor = color(255, 255, 255, this.opacity);
        this.bigColor = color(255, 255, 255, this.opacity);
        this.color = this.smallColor;
        this.title = 'Drive';
    } else {
        this.smallColor = color(int(random(0, 255)), int(random(0, 255)), int(random(0, 255)), this.opacity);
        this.bigColor = color(int(random(0, 255)), int(random(0, 255)), int(random(0, 255)), this.opacity);
        this.color = this.smallColor;
    }
    

    this.show = function(){
        push();
            if (!anAppIsActive){
                this.showTitle();
                if (this.unread){
                    this.showUnread();
                }
            }

            //SHOW THE ACTUAL APP
            rectMode(CENTER);
            fill(this.color);
            noStroke();
            rect(this.actualPos.x, this.actualPos.y, this.actualSize.x, this.actualSize.y, this.rounded);

            if (this.active){
                this.grow();
            } else {
                this.shrink();
            }

            if (!this.active && anAppIsActive){
                this.disappear();
                this.gone = true;
            } else {
                this.gone = false;
            }

            if (!this.active){
                if (mouseX > this.initialPos.x - this.smallSize.x*0.5 && mouseX < this.initialPos.x + this.smallSize.x*0.5 && mouseY > this.initialPos.y - this.smallSize.y*0.5 && mouseY < this.initialPos.y + this.smallSize.y*0.5){
                    this.mOver = true;
                } else {
                    this.mOver = false;
                }
            } else {
                this.mOver = false;
            }
        pop();
    }

    this.shrink = function(){
        // decrement state change variable
        if (this.stateChange > 0){
            this.stateChange -= this.easeSpeed;
        }

        //round the corners
        if (this.rounded < this.smallSize.x * 0.2){
            this.rounded += 2;
        }
        this.stateChangeEased = constrain(this.easeInOutQuad(constrain(this.stateChange, 0, 1)), 0, 1);

        this.actualPos = p5.Vector.lerp(this.initialPos, this.centerPos, this.stateChangeEased);
        this.actualSize = p5.Vector.lerp(this.smallSize, this.bigSize, this.stateChangeEased);
        this.color = lerpColor(this.smallColor, this.bigColor, this.stateChangeEased);

        push();
        if (!this.gone){
            image(this.icon, this.initialPos.x, this.initialPos.y, this.smallSize.x, this.smallSize.y);
        }
        pop();
    }

    this.grow = function(){
        // increment state change variable
        if (this.stateChange < 1){
            this.stateChange += this.easeSpeed;
        }
        
        //sharpen the corners
        if (this.rounded > 0){
            this.rounded -= 2;
        }
        this.stateChangeEased = this.easeInOutQuad(constrain(this.stateChange, 0, 1));

        this.actualPos = p5.Vector.lerp(this.initialPos, this.centerPos, this.stateChangeEased);
        this.actualSize = p5.Vector.lerp(this.smallSize, this.bigSize, this.stateChangeEased);
        this.color = lerpColor(this.smallColor, this.bigColor, this.stateChangeEased);

    }

    this.disappear = function(){
            if (this.disappearChange < 1){
                this.disappearChange += this.easeSpeed;
            }
            this.disappearChangeEased = constrain(this.easeInOutQuad(constrain(this.disappearChange, 0, 1)), 0, 1);
            this.actualSize = p5.Vector.lerp(this.smallSize, this.goneSize, this.disappearChangeEased);
    }

    this.showTitle = function(){
        push();
            translate(this.actualPos.x, this.actualPos.y + (this.actualSize.y*0.5 + this.actualSize.y*0.25));
            fill(255, 255, 255, this.opacity*1.5);
            textAlign(CENTER);
            scale(-1, 1);
            textSize(this.titleSize);
            text(this.title, 0, 0);
        pop();
    }

    this.showUnread = function(){
        push();
            translate(this.actualPos.x - (this.actualSize.x*0.5), this.actualPos.y - (this.actualSize.y*0.5));
            image(this.unreadImage, 0, 0, this.actualSize.x*0.5, this.actualSize.y*0.21);
        pop();
    }



    this.easeInOutQuad = function (t) { 
        return t<.5 ? 2*t*t : -1+(4-2*t)*t 
    }


}