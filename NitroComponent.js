class NitroButton { 
    constructor(x,y,w,h,s,r,op) {
       this.x = x;
       this.y = y;
       this.w = w;
       this.h = h;
       this.s = s;
       this.r = r;
       this.op = op;
       this.image = loadImage("assets/NitroIcSo.png");
       this.figure = createSprite(this.x,this.y,this.w,this.h);
       this.figure.addAnimation("catchy", this.image);
       this.figure.scale = this.s;
    }

    

    

    display() {
///add that cooldown/re-working time for nitro is 10 s.
        noFill();
        stroke(0,this.op);
        ellipse(this.x,this.y,this.r);
        if(mousePressed(this.figure)) {
          this.op = this.op+30;
          ground.velocityX = -(6 + 7*score/100);
        }
      drawSprites();
    }
}