var EndTurn = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize:
    function EndTurn(scene, x, y){
        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture('endTurn');
        this.setPosition(x, y);
        this.setInteractive();
        scene.children.add(this)
    },
    objectDown:function(pointer){
        combat.endTurn();
        for(let h of hand){
            h.destroy();
        }
        combat.startTurn();
        renderHand(this.scene);
    }
})