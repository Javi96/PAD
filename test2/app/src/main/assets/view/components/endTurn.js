var EndTurn = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize:
    function EndTurn(scene, x, y){
        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture('endTurn');
        this.setPosition(x, y);
        this.setInteractive();
        this.setScale(1.4, 1.4)
        this.scene = scene
        scene.children.add(this)
    },
    objectDown:function(pointer){
        combat.endTurn();
        for(let h of this.scene.hand){
            h.destroy();
        }
        combat.startTurn();
        this.scene.renderHand(this.scene);
    }
})