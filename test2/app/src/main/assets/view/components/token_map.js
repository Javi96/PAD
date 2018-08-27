var Token_map= new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize:
    function (scene, x, y, kind){
        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture(kind);
        this.setPosition(x, y);
        this.setInteractive()
        this.setScale(2.5, 2.5);
        
        this.kind = kind;
        scene.children.add(this);
    },
    
})