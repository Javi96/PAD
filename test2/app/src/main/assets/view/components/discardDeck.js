var DiscardDeck = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize:
    function DiscardDeck(scene, x, y){
        Phaser.GameObjects.Image.call(this, scene);
        
        this.setTexture('discard');
        this.setPosition(x, y);
        this.setInteractive();
        
        scene.children.add(this)
        this.val = scene.add.text(1700, 1010, combat.discard.length, {fontSize: 30, fontStyle: 'bold'});
    },
    objectDown:function(pointer){
        console.log(this)
        console.log("mostrar descarte")
    }
})