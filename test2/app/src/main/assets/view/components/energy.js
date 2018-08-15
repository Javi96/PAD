var Energy = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize:
    function (scene, x, y){
        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture('energy');
        this.setPosition(x, y);
        this.setInteractive();
        scene.children.add(this)
    },
    objectDown:function(pointer){
        
    }
})