var size = (window.devicePixelRatio || 1);

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1920,
    height: 1080,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
    
}
var game = new Phaser.Game(config);
var combat;
var player;
var enemies = [];
var selectedCard;
var emmiter;
var hand = [];

var discardDeck;
var mainDeck;
var energy;
var ending;
var tweenEnding;
var endResult;

//
//  PRELOAD
//
function preload(){

    combat = new Combat();
    this.load.image("bg", "view/img/bg.jpg");

    for(let i = 0; i < combat.enemies.length; i++){
        this.load.image("enemy_" + i, "view/img/" + combat.enemies[i].name + ".png");
    }
    this.load.image("player", "view/img/player.png");

    for(let c of combat.deck){
        this.load.image(c.name, "view/img/cards/" + c.name + ".png");
        //this.load.image(c.name, "view/img/empty_card.jpg");
    }

    this.load.image("endTurn", "view/img/assets/endTurn.png");
    this.load.image("discard", "view/img/assets/descartes.png");
    this.load.image("energy", "view/img/assets/Red_energy.png");
    this.load.image("deck", "view/img/assets/deck.png");

    this.load.image("background","view/img/bg2.png");
    this.load.image("ending", "view/img/end.jpg");

    combat.startTurn();
}

//
//  CREATE
//
function create(){
    window.addEventListener('resize', resize);
    resize();

    this.add.image(1920/2, 1080/2-100, "background");
 
    new EndTurn(this, 1750, 860);
    

    discardDeck = new DiscardDeck(this, 1750, 1000);
    


    mainDeck = new MainDeck(this, 130, 1000)
    mainDeck.val = this.add.text(150, 1005, combat.deck.length, {fontSize: 30, fontStyle: 'bold'});


    energy = this.add.image(130, 850,"energy");
    energy.val = this.add.text(110, 825, combat.player.mana, {fontSize: 60, fontStyle: 'bold', color: '#000000'});


    player = this.add.sprite(300, 450, "player").setScale(0.7 , 0.7);
    player.model = combat.player;

    for(let i = 0; i < combat.enemies.length; i++){
        enemies[i] = this.add.sprite(1500 + 245 * i, 450, "enemy_" + i);
    }

    //
    //  ADICIÓN DE SPRITES
    // 

    renderHand(this);   
    this.input.setTopOnly(true);

    //TWEEN

    //
    //  ARRASTRE
    //
    this.input.dragDistanceThreshold = 40;
    var origX = 0;
    var origY = 0;

    this.input.on("gameobjectdown", function(pointer, gameObject){
        if(gameObject.objectDown)
            gameObject.objectDown(pointer)
    })
    this.input.on("gameobjectup", function(pointer, gameObject){
        if(gameObject.gameObjectUp)
            gameObject.gameObjectUp(pointer)
        }
    );
    this.input.on('dragstart', function (pointer, gameObject) {
        if(gameObject.dragStart)
            gameObject.dragStart(pointer)
    }, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        console.log(gameObject)
        if(gameObject.drag)
            gameObject.drag(pointer, dragX, dragY)
    });

    this.input.on('dragend', function (pointer, gameObject) {
        if(gameObject.dragEnd)
            gameObject.dragEnd(pointer)
    });

    ending = this.add.image(1920/2, 1080/2, "ending").setAlpha(0);
    tweenEnding = this.tweens.add({
        targets: ending,
        scaleX: 4,
        scaleY: 3,
        //alpha: 1,
        ease: 'Sine.easeOut',
        duration: 3000,
        delay: 100,
        paused: true,
        onStart: onStartHandler,
        onStartParams: [ending],
        onComplete: onCompleteHandler,
        onCompleteParams: [this]
    }); 
}

//
//  UPDATE
//
function update ()
{   
    discardDeck.val.setText(combat.discard.length);
    mainDeck.val.setText(combat.deck.length);
    energy.val.setText(combat.player.mana);


    alive = false;
    for(let e of combat.enemies){
        if(e.hp > 0){
            alive = true; 
            break;
        }
    }
    if(combat.player.hp <= 0){
        endResult = "YOU LOSE!";
        tweenEnding.play();
        //console.log("El jugador ha perdido");
        
    } else if(!alive){
        endResult = "YOU WIN!";
        tweenEnding.play();
        //console.log("el jugador ha ganado")
    }
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

function resize() {
    var canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
    var wratio = width / height, ratio = canvas.width / canvas.height;
 
    //resize con ratio
    if (wratio < ratio) {
        canvas.style.width = width + "px";
        canvas.style.height = (width / ratio) + "px";
    } else {
        canvas.style.width = (height * ratio) + "px";
        canvas.style.height = height + "px";
    }
}



function renderHand(scene){
    for(let i = 0; i < combat.hand.length; i++){
        hand[i] = new Card(scene, 400+i*200, 950, combat.hand[i])
        scene.input.setDraggable(hand[i]);
    }
}
  
/*var fS =12
function showCard(pos, card, f){

    var bg = f.add.image(0, 0, card.name);

    var desc = f.add.text(-50, 40, function(card){    
        return card.descripcion;
    }(card), {fontSize: fS});
    var name = f.add.text(-20, -95, card.name, {fontSize: fS});
    var ty = f.add.text(-10, 10, card.type, {fontSize: fS*0.6, color: '#000000'});
    var cost = f.add.text(-75, -105, card.cost, {fontSize: fS*1.5, fontStyle: 'bold', color: '#000000'});


    var carta = f.add.container(pos.x, pos.y, [ bg, desc, name, ty , cost]);
    //ZONA EN LA QUE SE INTERACTUA CON EL CONTAINER
    carta.setInteractive(new Phaser.Geom.Rectangle(-bg.width/2, -bg.height/2, bg.width, bg.height), Phaser.Geom.Rectangle.Contains);
    f.input.setDraggable(carta);
    return carta;
}*/

function onStartHandler (tweenEnding, targets, gameObject){
    gameObject.setAlpha(1);
}
function onCompleteHandler (tweenEnding, targets, f){
    f.add.text(1920/2-220, 1080/2, endResult, {fontSize: 100, fontStyle: 'italic', color: '#000000'});

}

function discardHand(){
    combat.discardHand();
}

function drawHand(){
    combat.drawHand();
}


