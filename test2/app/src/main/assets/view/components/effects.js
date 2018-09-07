var effectsComponent = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize:
    function effectsComponent(scene, x, y, entity){
        Phaser.GameObjects.Image.call(this, scene);
        this.entity = entity;
        this.x = x;
        this.y = y;
        this.graphics = scene.add.graphics();
        this.scene = scene;
        scene.children.add(this);
    },
    update:function(hp){
        this.printEffects()
        
    },
    printEffects: function(){
        this.graphics.clear();
        n = 0;
        
        w = 50;
        h = 50;
        offset = w ;
        for(e of this.entity.startCombatEffects){
            if(e.print){
                this.graphics.fillStyle(e.print);
                this.graphics.fillRectShape(new Phaser.Geom.Rectangle(this.x + offset * n, this.y + 25, w, h));
                this.val = this.scene.add.text(this.x + offset * n + w / 4, this.y + 15+ h / 4 , e.getText() , {fontSize: 50, fontStyle: 'bold'});
                n++;
            }
        }
        for(e of this.entity.playCardEffects){
            if(e.print){
                this.graphics.fillStyle(e.print);
                this.graphics.fillRectShape(new Phaser.Geom.Rectangle(this.x + offset * n, this.y +25, w, h));
                this.val = this.scene.add.text(this.x + offset * n + w / 4, this.y + 15+ h / 4 , e.getText() , {fontSize: 50, fontStyle: 'bold'});
                n++;
            }
        }
        for(e of this.entity.startTurnEffects){
            if(e.print){
                this.graphics.fillStyle(e.print);
                this.graphics.fillRectShape(new Phaser.Geom.Rectangle(this.x + offset * n, this.y + 25, w, h));
                this.val = this.scene.add.text(this.x + offset * n + w / 4, this.y + 15+ h / 4 , e.getText() , {fontSize: 50, fontStyle: 'bold'});
                n++;
            }
        }
        
        for(e of this.entity.endTurnEffects){
            if(e.print){
                this.graphics.fillStyle(e.print);
                this.graphics.fillRectShape(new Phaser.Geom.Rectangle(this.x + offset * n, this.y + 25, w, h));
                this.val = this.scene.add.text(this.x + offset * n + w / 4, this.y + 15+ h / 4 , e.getText() , {fontSize: 50, fontStyle: 'bold'});
                n++;
            }
        }
        
        for(e of this.entity.receiveAttackEffects){
            if(e.print){
                this.graphics.fillStyle(e.print);
                this.graphics.fillRectShape(new Phaser.Geom.Rectangle(this.x + offset * n, this.y + 25, w, h));
                this.val = this.scene.add.text(this.x + offset * n + w / 4, this.y + 15+ h / 4 , e.getText() , {fontSize: 50, fontStyle: 'bold'});
                n++;
            }
        }

        if(this.entity.vulnerable > 0){
            this.graphics.fillStyle("0xff0000");
            this.graphics.fillRectShape(new Phaser.Geom.Rectangle(this.x + offset * n, this.y + 25, w, h));
            this.val = this.scene.add.text(this.x + offset * n + w / 4, this.y + 15+ h / 4 , this.entity.vulnerable , {fontSize: 50, fontStyle: 'bold'});
            n++;
        }
        if(this.entity.weak > 0){
            this.graphics.fillStyle("0x0000ff");
            this.graphics.fillRectShape(new Phaser.Geom.Rectangle(this.x + offset * n, this.y + 25, w, h));
            this.val = this.scene.add.text(this.x + offset * n + w / 4, this.y + 15+ h / 4 , this.entity.weak , {fontSize: 50, fontStyle: 'bold'});
            n++;
        }
        if(this.entity.strength > 0){
            this.graphics.fillStyle("0xff00ff");
            this.graphics.fillRectShape(new Phaser.Geom.Rectangle(this.x + offset * n, this.y + 25, w, h));
            this.val = this.scene.add.text(this.x + offset * n + w / 4, this.y + 15+ h / 4 , this.entity.strength , {fontSize: 50, fontStyle: 'bold'});
            n++;
        }
    }
   
})