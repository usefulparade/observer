function Icon(x, y, ind){
    this.initialPos = new p5.Vector(x, y);
    this.centerPos = new p5.Vector(halfWidth, halfHeight);
    this.actualPos = this.initialPos;
    if (width > 600){
        this.smallSize = new p5.Vector(100, 100);
    } else {
        this.smallSize = new p5.Vector(int(width*0.166), int(width*0.166));
    }
    this.goneSize = new p5.Vector(0, 0);
    this.bigSize = new p5.Vector (containerHalfWidth*2, height);
    this.actualSize = this.smallSize;
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
    this.icon = loadImage('./img/icons/icon' + this.ind + '.png');
    if (this.ind === 0){
        this.smallColor = color(255, 255, 255, 200);
        this.bigColor = color(255, 255, 255, 200);
        this.color = this.smallColor;
    } else if (this.ind === 1){
        this.smallColor = color(84, 228, 77, 200);
        this.bigColor = color(255, 255, 255, 200);
        this.color = this.smallColor;
    } else if (this.ind === 2){
        this.smallColor = color(170, 170, 170, 200);
        this.bigColor = color(255, 255, 255, 200);
        this.color = this.smallColor;
    } else if (this.ind === 3){
        this.smallColor = color(255, 255, 255, 200);
        this.bigColor = color(255, 255, 255, 200);
        this.color = this.smallColor;
    } else {
        this.smallColor = color(int(random(0, 255)), int(random(0, 255)), int(random(0, 255)), 200);
        this.bigColor = color(int(random(0, 255)), int(random(0, 255)), int(random(0, 255)), 200);
        this.color = this.smallColor;
    }
    

    this.show = function(){
        push();
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



    this.easeInOutQuad = function (t) { 
        return t<.5 ? 2*t*t : -1+(4-2*t)*t 
    }


}