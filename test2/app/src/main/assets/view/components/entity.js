var Entity = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize:
    function Entity(scene, x, y, sprite, entity){
        Phaser.GameObjects.Image.call(this, scene);
        
        this.setTexture(sprite);
        this.setPosition(x, y);
        this.setScale(0.7, 0.7);
        scene.children.add(this);
        this.model = entity;
        this.hpBar = new HpBar(scene,  x - this.w, 650, 200, 50, entity.hp)
    },
   setHp:function() {
       this.hpBar.update(this.model.hp);
   }

})