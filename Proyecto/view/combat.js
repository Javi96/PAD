var config = {
    type: Phaser.WEBGL,
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


//
//  PRELOAD
//
function preload(){

    combat = new Combat();
    this.load.image("bg", "view/img/bg.jpg");

    for(i = 0; i < combat.enemies.length; i++){
        this.load.image("enemy_" + i, "view/img/" + combat.enemies[i].name + ".png");
    }
    this.load.image("player", "view/img/player.png");

    for(c of combat.deck){
        this.load.image(c.name, "view/img/cards/" + c.name + ".png");
    }

    combat.startTurn();
}

//
//  CREATE
//
function create(){
    window.addEventListener('resize', resize);
    resize();
    //this.add.image(1920/2, 1080/2, "bg");

    player = this.add.sprite(495, 615, "player").setDisplaySize(100,175);
    player.model = combat.player;

    for(i = 0; i < combat.enemies.length; i++){
        enemies[i] = this.add.sprite(1090 + 245 * i, 584, "enemy_" + i);
    }

    //
    //  ADICIÓN DE SPRITES
    // 
    /*for(i = 0; i < combat.hand.length; i++){
        hand[i] = this.add.sprite(400 + i*100, 950, combat.hand[i].name).setInteractive().setScale(1.6, 1.6);
        this.input.setDraggable(hand[i]);
        hand[i].modelCard = combat.hand[i];
    }*/
    for(i = 0; i < combat.hand.length; i++){
        hand[i] = showCard({x:400+i*200, y:950}, combat.hand[i], this);
        hand[i].modelCard = combat.hand[i];
    }
    this.input.setTopOnly(true);

    //emmiter = new Phaser.EventEmitter();
    //emmiter.on('cardEffect', cardEffect);

    //TWEEN

    //
    //  ARRASTRE
    //
    this.input.dragDistanceThreshold = 40;
    var origX = 0;
    var origY = 0;
    
    var tweens = this.tweens;
    this.input.on("gameobjectdown", function(pointer, gameObject){
        selectedCard = gameObject;
        origX = selectedCard.x;
        origY = selectedCard.y;
        tweens.add({
            targets: selectedCard,
            scaleX : 2.5,
            scaleY: 2.5,
            y: selectedCard.y - 160,
            ease: 'Sine.easeOut',
            duration: 150,
            delay: 0,

        });
    })
    this.input.on("gameobjectup", function(pointer, gameObject){
        tweens.add({
            targets: selectedCard,
            scaleX : 1.6,
            scaleY: 1.6,
            y: origY,
            ease: 'Sine.easeIn',
            duration: 150,
            delay: 0,
        });
        selectedCard = null;
    })
    this.input.on('dragstart', function (pointer, gameObject) {
       // POR QUÉ NO FUNCIONA???
        //this.children.bringToTop(gameObject);
        //gameObject.setVisible(false);
        

        tweens.add({
            targets: selectedCard,
            scaleX : 0,
            scaleY: 0,
            ease: 'Sine.easeIn',
            duration: 300,
            delay: 0,
        });
    }, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });

    this.input.on('dragend', function (pointer, gameObject) {
        let target = combat.player;

        //effect from selectedCard
        if(isOn(pointer, player)){
            target = combat.player;
        }else{
            for(i = 0; i < combat.enemies.length; i++){
                if(isOn(pointer, enemies[i])){
                    target = combat.enemies[i];
                }
            }
        }

        if(!combat.action(target, selectedCard.modelCard)){
            //gameObject.setVisible(true);
            gameObject.x = origX;
            gameObject.y = origY;
            gameObject.setScale(1.6,1.6);
        }else{
            combat.deck.push(selectedCard.modelCard);
            selectedCard.destroy();
        }
        //emmiter.emit('cardEffect', selectedCard);
    });

    /*
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
    };*/
    
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
    alive = false;
    for(e of combat.enemies){
        if(e.hp > 0){
            alive = true; 
            break;
        }
    }
    if(combat.player.hp <= 0){
        console.log("El jugador ha perdido");
        
    } else if(!alive){
        console.log("el jugador ha ganado")
    }

    /*var length = graphicsPath.length;

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

    time += 0.01;*/
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
    
        //resize sin ratio 
    /*canvas.style.width = width + "px";
    canvas.style.height = height + "px";*/
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

var fS =12
function showCard(pos, card, f){

    var bg = f.add.image(0, 0, card.name);
    var desc = f.add.text(-50, 40, card.descripcion, {fontSize: fS});
    var name = f.add.text(-20, -95, card.name, {fontSize: fS});
    var ty = f.add.text(-10, 10, card.type, {fontSize: fS*0.6, color: '#000000'});
    var cost = f.add.text(-75, -105, card.cost, {fontSize: fS*1.5, fontStyle: 'bold'});

    var carta = f.add.container(pos.x, pos.y, [ bg, desc, name, ty , cost]);
    //ZONA EN LA QUE SE INTERACTUA CON EL CONTAINER
    carta.setInteractive(new Phaser.Geom.Rectangle(-bg.width/2, -bg.height/2, bg.width, bg.height), Phaser.Geom.Rectangle.Contains);
    f.input.setDraggable(carta);
    return carta;
}