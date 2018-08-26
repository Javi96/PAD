var HpBar = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize:
    function HpBar(scene, x, y, w, h, hp){
        Phaser.GameObjects.Image.call(this, scene);
        
        var rect = new Phaser.Geom.Rectangle(x, y, w, h);

        let graphics = scene.add.graphics({ fillStyle: { color: 0x0000ff } });

        graphics.fillRectShape(rect);

        scene.children.add(this)

        this.maxValue = hp;
        this.actValue = hp;

        this.val = scene.add.text(x + w / 4, y + h / 4 , this.actValue + "/" + this.maxValue, {fontSize: 30, fontStyle: 'bold'});
    },
    update:function(hp){
        this.actValue = hp;
        this.val.setText(this.actValue + "/" + this.maxValue);
    }
   
})