var MapScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function MapScene(params){
        Phaser.Scene.call(this, {key: 'MapScene'})
        combat = new Combat();
        console.log("inicializacion")
    },
    preload: function(){
        this.load.image("bg_map", "view/img/bg_map.jpg");
        this.load.image("enemy_map", "view/img/enemy_map.png");
        console.log("preload")
    },

    create:function(){
        window.addEventListener('resize', resize);
        resize();
    
        this.add.image(1920/2, 1080/2, "bg_map");

        var graphics = this.add.graphics();

        let offsetX = 100;
        let offsetY = 100;
        for(i = 0; i < mapModel.map.length; i++){
            let layer = mapModel.map[i];
            let nextLayer = mapModel.map[i + 1]
            for(let j = 0; j < layer.length; j++){
                x1 = (1920 - 2 * offsetX)/mapModel.map.length * i + offsetX
                y1 = (1080 - 2 * offsetY)/layer.length * j  + offsetY
                new Token_map(this, x1, y1, "enemy_map");
                if(layer[j].left){
                    x2 = (1920 - 2 * offsetX)/mapModel.map.length * (i + 1) + offsetX;
                    y2 = (1080 - 2 * offsetY)/nextLayer.length * layer[j].left.id  + offsetY;
                   
                    let line = new Phaser.Geom.Line(x1, y1, x2, y2);
                    graphics.lineStyle(3, 0x00aa00);
                    graphics.strokeLineShape(line);
                }
                if(layer[j].right){
                    x2 = (1920 - 2 * offsetX)/mapModel.map.length * (i + 1) + offsetX;
                    y2 = (1080 - 2 * offsetY)/nextLayer.length * layer[j].right.id + offsetY;
                    let line = new Phaser.Geom.Line(x1, y1, x2, y2);
                    graphics.lineStyle(3, 0x00aa00);
                    graphics.strokeLineShape(line);
                }
            }
        }
        //token = new Token_map(this, 1920/2, 1080/2, "enemy_map");
        var s = this.scene;
        this.input.on("gameobjectdown", function(pointer, gameObject){
            console.log(gameObject.kind);
            s.start('CombatScene');
        })


    },
})