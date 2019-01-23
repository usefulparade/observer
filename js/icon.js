function Icon(x, y){
    this.initialPos = new p5.Vector(x, y);
    this.centerPos = new p5.Vector(halfWidth, halfHeight);
    this.actualPos = this.initialPos;
    this.smallSize = new p5.Vector(100, 100);
    this.goneSize = new p5.Vector(0, 0);
    this.bigSize = new p5.Vector (containerWidth*2, height);
    this.actualSize = this.smallSize;
    this.mOver = false;
    this.active = false;
    this.gone = false;
    this.stateChange = 0;
    this.stateChangeEased = 0;
    this.disappearChange = 0;
    this.disappearChangeEased = 0;
    this.easeSpeed = 0.1;
    this.rounded = 20;

    this.show = function(){
        rectMode(CENTER);
        fill(255, 255, 255, 200);
        noStroke();
        rect(this.actualPos.x, this.actualPos.y, this.actualSize.x, this.actualSize.y, this.rounded);

        if (this.active){
            this.grow();
        } else {
            this.shrink();
        }

        if (!this.active && anAppIsActive){
            this.disappear();
        }

        if (!this.active){
            if (mouseX > this.actualPos.x - this.actualSize.x*0.5 && mouseX < this.actualPos.x + this.actualSize.x*0.5 && mouseY > this.actualPos.y - this.actualSize.y*0.5 && mouseY < this.actualPos.y + this.actualSize.y*0.5){
                this.mOver = true;
            } else {
                this.mOver = false;
            }

        }
    }

    this.shrink = function(){
        // decrement state change variable
        if (this.stateChange > 0){
            this.stateChange -= this.easeSpeed;
        }

        //round the corners
        if (this.rounded < 20){
            this.rounded += 2;
        }
        this.stateChangeEased = this.easeInOutQuad(constrain(this.stateChange, 0, 1));

        this.actualPos = p5.Vector.lerp(this.initialPos, this.centerPos, this.stateChangeEased);
        this.actualSize = p5.Vector.lerp(this.smallSize, this.bigSize, this.stateChangeEased);
        
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
    }

    this.disappear = function(){
            if (this.disappearChange < 1){
                this.disappearChange += this.easeSpeed;
            }
            this.disappearChangeEased = this.easeInOutQuad(constrain(this.disappearChange, 0, 1));
            this.actualSize = p5.Vector.lerp(this.smallSize, this.goneSize, this.disappearChangeEased);
    }



    this.easeInOutQuad = function (t) { 
        return t<.5 ? 2*t*t : -1+(4-2*t)*t 
    }


}