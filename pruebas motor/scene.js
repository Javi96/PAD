var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics:{
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create
    }
    
}

var game = new Phaser.Game(config);

function preload(){
    this.load.image("card1", "cards_small/R_anger.png");
    //this.load.image("card2", "cards_small/R_armaments.png");
    this.load.image("playerSprite", "wotisdis.png");
    this.load.image("enemySprite", "enemy.png");
}
var player;
var enemy;
var card1;
function create(){
    player = this.physics.add.sprite(100, 200, "playerSprite").setDisplaySize(200,250).setInteractive;
    enemy = this.physics.add.sprite(700, 200, "enemySprite").setDisplaySize(200,250);
    
    /*var cards = this.make.group({
        key: 'card', 
        x: 400,
        y:500,

    })*/
    card1 = this.physics.add.sprite(400, 500, "card1").setInteractive();

    this.input.setDraggable(card1);
    this.input.topOnly = true;


    this.input.dragDistanceThreshold = 20;

    this.input.on('dragstart', function (pointer, gameObject) {
        //gameObject.displayWidth = Math.round(gameObject.width * 0.7);
        //gameObject.displayHeight = Math.round(gameObject.height * 0.7);

    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });

    this.input.on('dragend', function (pointer, gameObject) {
        /*gameObject.setActive(false);
        gameObject.setVisible(false);*/

        /*gameObject.x = 400;
        gameObject.y = 500;*/
        if(checkOverlap(card1, player)){
            console.log("hago cosas");
            player.setTint(0x00ff00);
        }
    });

    this.physics.add.collider(card1, player, goodEffect, null, this);
    this.physics.add.collider(card1, enemy, badEffect, null, this);
}


function goodEffect(card, player){
    this.card.on('dragend', function (pointer, gameObjects) {
        console.log("hasta qui llego");
                    
    });
}

function badEffect(card, enemy){
    enemy.setTint(0xff0000);
}

function checkOverlap(A, B){
    var boundsA = A.getBounds();
    var boundsB = B.getBounds();

    return Phaser.Geom.Rectangle.intersects(boundsA, boundsB);

}