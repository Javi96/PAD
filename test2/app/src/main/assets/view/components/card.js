var Card= new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize:
    function (scene, x, y, model){
        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture(model.name);
        this.model = model;
        this.setPosition(x, y);
        this.setInteractive()
        scene.children.add(this);
    },
    objectDown:function(pointer){
        selectedCard = this;
        origX = selectedCard.x;
        origY = selectedCard.y;
        this.scene.tweens.add({
            targets: selectedCard,
            scaleX : 2.5,
            scaleY: 2.5,
            y: selectedCard.y - 160,
            ease: 'Sine.easeOut',
            duration: 150,
            delay: 0,
        });
    },
    objectUp:function(pointer){
        this.scene.tweens.add({
            targets: selectedCard,
            scaleX : 1.6,
            scaleY: 1.6,
            y: origY,
            ease: 'Sine.easeIn',
            duration: 150,
            delay: 0,
        });
        selectedCard = null;
    },
    dragStart:function(pointer){
        this.scene.tweens.add({
            targets: selectedCard,
            scaleX : 0,
            scaleY: 0,
            ease: 'Sine.easeIn',
            duration: 300,
            delay: 0,
        });
    },
    drag: function (pointer, dragX, dragY) {
        this.x = dragX;
        this.y = dragY;
    },
    dragEnd:function (pointer) {
        target = combat.player
        if(isOn(pointer, player)){
            target = combat.player;
        }else{
            for(let i = 0; i < combat.enemies.length; i++){
                if(isOn(pointer, enemies[i])){
                    target = combat.enemies[i];
                }
            }
        }

        if(!combat.action(target, selectedCard.model)){
            this.x = origX;
            this.y = origY;
            this.setScale(1.6,1.6);
        }else{       
            combat.discard.push(selectedCard.model);
        }
    }
})