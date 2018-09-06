var Card= new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize:
    function (scene, x, y, model){
        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture(model.name);
        this.model = model;
        this.setPosition(x, y);
        this.setInteractive()
        scene.input.setDraggable(this);
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
    dragEnd:function (pointer, targets) {
        target = targets[targets.length - 1]
        for(t of targets)
            if(isOn(pointer, t)){
                target = t;
                break;
            }

        targetPlayer = target == targets[targets.length - 1] && this.model.type == "attack"
        if(targetPlayer || !combat.action(target.model, selectedCard.model)){
            this.x = origX;
            this.y = origY;
            this.setScale(1,1);
        }else{       
            combat.discard.push(selectedCard.model);
            let arr = combat.hand;
            var index = arr.indexOf(selectedCard.model);
            if (index > -1) {
                arr.splice(index, 1);
            }
            this.scene.tweens.add({
                targets: target,
                x: '-=10',
                y: '-=10',
                ease: 'Linear',
                duration: 20,
                repeat:10,
                yoyo: true
            });
        }
    }
})