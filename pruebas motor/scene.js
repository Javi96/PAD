var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
    
}
var game = new Phaser.Game(config);


//
//  PRELOAD
//
function preload(){
    this.load.image("card1", "cards_small/R_anger.png");
    this.load.image("card2", "cards_small/R_armaments.png");
    this.load.image("playerSprite", "wotisdis.png");
    this.load.image("enemySprite", "enemy.png");
}

var player;
var enemy;
var cards;
var handcards = ["card1", "card2"];
var selectedCard;
var emmiter;

var graphicsPath = [];
var isMouseDown = false;
var isKeyDown = false;
var time = 0;
var graphics;

//
//  CREATE
//
function create(){
    window.addEventListener('resize', resize);
    resize();

    //
    //  ADICIÓN DE SPRITES
    //    
    player = this.add.sprite(100, 200, "playerSprite").setDisplaySize(200,250).setInteractive();
    enemy = this.add.sprite(700, 200, "enemySprite").setDisplaySize(200,200); 
    
    cards = this.add.group();
    let x = 400;
    for (let i = 0; i < handcards.length; i++){

        var sprite = cards.create(x, 500, handcards[i]).setInteractive();
        this.input.setDraggable(sprite);
        x += 50;
    }
    this.input.setTopOnly(true);

    emmiter = new Phaser.EventEmitter();
    emmiter.on('cardEffect', cardEffect);

    //
    //  ARRASTRE
    //
    this.input.dragDistanceThreshold = 20;
    var origX = 0;
    var origY = 0;
    this.input.on('dragstart', function (pointer, gameObject) {
       // POR QUÉ NO FUNCIONA???
        this.children.bringToTop(gameObject);
        
        selectedCard = gameObject;
        origX = selectedCard.x;
        origY = selectedCard.y;
    }, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });

    this.input.on('dragend', function (pointer, gameObject) {
        gameObject.x = origX;
        gameObject.y = origY;

        //effect from selectedCard
        if(isOn(pointer, player)){
            console.log("power up");
        }else if(isOn(pointer, enemy)){
            console.log("attack");
        }else{
            console.log("magic");
        }

        emmiter.emit('cardEffect', selectedCard);
    });

    
    //
    //  GRAPHICS (línea amarilla)
    //    
    graphics = this.add.graphics({x: 0, y:0});
    game.canvas.onmousedown = function (e) {
        isMouseDown = true;
        graphics.clear();
        graphicsPath.length = 0;
    };
    game.canvas.onmouseup = function (e) {
        isMouseDown = false;
    };
    game.canvas.onmousemove = function (e) {
        var mouseX = e.clientX - game.canvas.offsetLeft;
        var mouseY = e.clientY - game.canvas.offsetTop;
        if (isMouseDown)
            graphicsPath.push({x: mouseX, y: mouseY});
    };
    
    /*this.input.on('pointermove', function(pointer){
        if(isOn(pointer, player)){
            console.log("lo pillo");
       }
    });*/
}

//
//  UPDATE
//
function update ()
{
    var length = graphicsPath.length;

    graphics.clear();
    graphics.lineStyle(10.0, 0xFFFF00, 1.0);
    graphics.beginPath();
    for (var i = 0; i < length; ++i)
    {
        var node = graphicsPath[i];

        if (i !== 0)
        {
            graphics.lineTo(node.x, node.y);
        }
        else
        {
            graphics.moveTo(node.x, node.y);
        }
    }
    graphics.strokePath();
    graphics.closePath();

    time += 0.01;
}

//
//  EFECTO DE CARTAS
//

function cardEffect(card, affected){
    console.log('wololo');
}


//
//  SOBRE QUIÉN ESTÁ LA CARTA
//

function isOn(pointer, elem){
    leftLimit = elem.x - elem.displayWidth/2;
    rightLimit = elem.x + elem.displayWidth/2;
    topLimit = elem.y - elem.displayHeight/2;
    bottomLimit = elem.y + elem.displayHeight/2;
    //console.log("dimensions: " + leftLimit+ " " + rightLimit +" "+ topLimit + " "+ bottomLimit)

    if(pointer.x > leftLimit && pointer.x < rightLimit
    && pointer.y > topLimit && pointer.y < bottomLimit){
        return true;
    }else{
        return false;
    }
}

//modificar resize (mantiene ratio, no válido para pantallas alargadas)
function resize() {
    var canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
    var wratio = width / height, ratio = canvas.width / canvas.height;
 
    if (wratio < ratio) {
        canvas.style.width = width + "px";
        canvas.style.height = (width / ratio) + "px";
    } else {
        canvas.style.width = (height * ratio) + "px";
        canvas.style.height = height + "px";
    }
}

/*function goodEffect(card, player){
    this.card.on('dragend', function (pointer, gameObjects) {
        console.log("hasta qui llego");
                    
    });
}

function badEffect(card, enemy){
    enemy.setTint(0xff0000);
}
*/