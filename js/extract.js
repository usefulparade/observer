function Extraction(x_, y_, w_, h_, name_){
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.h = h_;
    this.name = name_;
    this.text;
    this.mOver = false;

    this.create = function(){

    }

    this.destroy = function(){

    }
    
    // this.show = function(){
    //     push();
    //         translate(this.x, this.y);
    //         //THE WINDOW
    //         push();
    //             fill(0,0,0);
    //             strokeWeight(3);
    //             stroke(255,255,255);
    //             rect(0,0,this.w,this.h);
    //         pop();
    //         //THE TOP BAR
    //         push();
    //             fill(100,100,100);
    //             strokeWeight(5);
    //             stroke(255,255,255);
    //             rect(0,0,this.w,40);
    //         pop();
    //         //THE CLOSE BUTTON
    //         push();
    //             fill(180,2,6)
    //             strokeWeight(3);
    //             stroke(255,255,255);
    //             rect(this.w-5,5,30,30);
    //             line(this.w-30, 10, this.w-10, 25);
    //             line(this.w-10, 10, this.w-30, 25);
    //         pop();
    //         //THE INNER TEXT
    //         push();
    //             fill()
    //         pop();
    //     pop();
    // }


}