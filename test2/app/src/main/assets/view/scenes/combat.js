var CombatScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function CombatScene(params){
        Phaser.Scene.call(this, {key: 'CombatScene'})
        this.discardDeck;
        this.mainDeck;
        this.energy;
        this.enemies = [];
        this.player;
        this.hand = [];
    },
    preload: function(){

        

        this.load.image("bg", "view/img/bg.jpg");

        for(let i = 0; i < combat.enemies.length; i++){
            this.load.image("enemy_" + i, "view/img/" + combat.enemies[i].name + ".png");
        }
        this.load.image("player", "view/img/player.png");

        for(let c of combat.deck){
            this.load.image(c.name, "view/img/cards/" + c.name + ".png");
        }

        this.load.image("endTurn", "view/img/assets/endTurn.png");
        this.load.image("discard", "view/img/assets/descartes.png");
        this.load.image("energy", "view/img/assets/Red_energy.png");
        this.load.image("deck", "view/img/assets/deck.png");

        this.load.image("background","view/img/bg2.png");
 

        combat.startTurn();
    },

    create:function(){
        window.addEventListener('resize', resize);
        resize();
    
        
        this.add.image(1920/2, 1080/2-100, "background");
     
        new EndTurn(this, 1750, 860);
        
        this.discardDeck = new DiscardDeck(this, 1750, 1000);
        
        this.mainDeck = new MainDeck(this, 130, 1000)
        this.mainDeck.val = this.add.text(150, 1005, combat.deck.length, {fontSize: 30, fontStyle: 'bold'});
    
    
        this.energy = this.add.image(130, 850,"energy");
        this.energy.val = this.add.text(110, 825, player.mana, {fontSize: 60, fontStyle: 'bold', color: '#000000'});
    
    
        //player = this.add.sprite(300, 450, "player").setScale(0.7 , 0.7);
        //var playerHP = new HpBar(this, 250, 200, 300, 200);
        this.player  = new Entity(this, 300, 450, "player", player);      
    
        for(let i = 0; i < combat.enemies.length; i++){
            this.enemies[i] = new Entity(this, 1500 + 245 * i, 450, "enemy_" + i, combat.enemies[i]);
        }
    
        //
        //  ADICIÓN DE SPRITES
        // 
    
        this.renderHand(this);   
        this.input.setTopOnly(true);
    
        //TWEEN
    
        //
        //  ARRASTRE
        //
        this.input.dragDistanceThreshold = 40;
        var origX = 0;
        var origY = 0;
    
        let those = this;
        this.input.on("gameobjectdown", function(pointer, gameObject){
            if(gameObject.objectDown)
                gameObject.objectDown(pointer, those)
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
            if(gameObject.drag)
                gameObject.drag(pointer, dragX, dragY)
        });
        
        this.input.on('dragend', function (pointer, gameObject) {
            if(gameObject.dragEnd)
                gameObject.dragEnd(pointer, those.enemies.concat([those.player]))
        });
    
    },

    update: function(){   
        this.discardDeck.val.setText(combat.discard.length);
        this.mainDeck.val.setText(combat.deck.length);
        this.energy.val.setText(player.mana);
        this.player.setHp();
        for(let e of this.enemies){
            e.setHp();
        }

        var alive = false;
        for(let e of combat.enemies){
            if(e.hp > 0){
                alive = true; 
                break;
            }
        }
        if(player.hp <= 0){
            endResult = "YOU LOSE!";
            
            
            this.scene.start('loseCombatScene');
            
            
        } else if(!alive){
            endResult = "YOU WIN!";
            this.restartCombat();
            combat.deck = combat.deck.concat(combat.hand)
            combat.hand = []
            //console.log(combat)
            this.scene.start('MapScene');
            
        }
    },
    restartCombat : function(){
        
    },
    renderHand: function(){
        console.log(combat.hand.length)
        for(let i = 0; i < combat.hand.length; i++){
            this.hand.push(new Card(this, 400+i*200, 950, combat.hand[i]))
        }
    }
})


function isOn(pointer, elem){
    leftLimit = elem.x - elem.displayWidth/2;
    rightLimit = elem.x + elem.displayWidth/2;
    topLimit = elem.y - elem.displayHeight/2;
    bottomLimit = elem.y + elem.displayHeight/2;

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
