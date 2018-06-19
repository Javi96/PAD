var MainDeck = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize:
    function (scene, x, y){
        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture('deck');
        this.setScale(1.1);
        this.setPosition(x, y);
        this.setInteractive();
        scene.children.add(this)
    },
    objectDown:function(pointer){
        console.log("mostrarDeck")
    }
})