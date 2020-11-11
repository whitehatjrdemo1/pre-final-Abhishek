class Sprite{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.body=createSprite(x,y,10,10);
        this.health = 100;
        //this.image = loadImage("../images/car1.png");

    }
    display(){
        drawSprites();
    }
}