var HpBar = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize:
    function HpBar(scene, x, y, w, h, entity){
        Phaser.GameObjects.Image.call(this, scene);
        this.rect = new Phaser.Geom.Rectangle(x, y, w, h);
        this.entity = entity;

        this.graphics = scene.add.graphics();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.printHp(x, y, w, h)

        scene.children.add(this)

        this.val = scene.add.text(x - 40 + w / 4, y - 10 + h / 4 , this.entity.hp + "/" + this.entity.maxHP + "(" + this.entity.block + ")", {fontSize: 50, fontStyle: 'bold', color: '#000000'});
    },
    update:function(hp){
        this.printHp()
        this.val.setText(this.entity.hp + "/" + this.entity.maxHP + "(" + this.entity.block + ")");
    },
    printHp: function(x, y, w, h){
        this.graphics.clear();
        this.graphics.fillStyle(0xaaaaaa);
        this.graphics.fillRectShape(this.rect);
        if(this.entity.block == 0){
            this.graphics.fillStyle(0x00ff00);
            a = this.entity.hp / this.entity.maxHP;
            this.graphics.fillRectShape(new Phaser.Geom.Rectangle(this.x, this.y, this.w*a, this.h))
            
        }else{
            this.graphics.fillStyle(0x0000ff);
            a = this.entity.hp / this.entity.maxHP;
            this.graphics.fillRectShape(new Phaser.Geom.Rectangle(this.x, this.y, this.w*a, this.h))
        }
       
    }
   
})