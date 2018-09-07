var DiscardDeck = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize:
    function DiscardDeck(scene, x, y){
        Phaser.GameObjects.Image.call(this, scene);
        
        this.setTexture('discard');
        this.setPosition(x, y);
        this.setInteractive();
        this.setScale(1.5, 1.5)
        
        scene.children.add(this)
        this.val = scene.add.text(1665, 1010, combat.discard.length, {fontSize: 40, fontStyle: 'bold'});
    },
    objectDown:function(pointer){
        console.log(this)
        console.log("mostrar descarte")
    }
})