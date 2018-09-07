var Entity = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize:
    function Entity(scene, x, y, sprite, entity){
        Phaser.GameObjects.Image.call(this, scene);
        
        this.setTexture(sprite);
        this.setPosition(x, y);
        this.setScale(1, 1);
        scene.children.add(this);
        this.model = entity;
        this.hpBar = new HpBar(scene,  x- this.width/2, 650, this.width, 50, entity)
        this.effectsComponent = new effectsComponent(scene, x - this.width/2, 680, entity);
    },
    setHp:function() {
       this.hpBar.update(this.model.hp);
    },
    setEffects(){
        this.effectsComponent.printEffects();
    }

})