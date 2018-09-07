var Token_map= new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize:
    function (scene, x, y, node){
        Phaser.GameObjects.Image.call(this, scene);
        this.setTexture(node.type + "_map");
        this.setPosition(x, y);
        this.setInteractive()
        this.setScale(2.5, 2.5);
        
        this.node = node;
        scene.children.add(this);
    },
    
})