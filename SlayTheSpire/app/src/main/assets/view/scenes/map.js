var MapScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function MapScene(params){
        Phaser.Scene.call(this, {key: 'MapScene'});
    },
    preload: function(){
        this.load.image("bg_map", "view/img/bg_map.jpg");
        this.load.image("combat_map", "view/img/enemy_map.png");
        this.load.image("boss_map", "view/img/enemy_map.png")

    },

    create:function(){
        window.addEventListener('resize', resize);
        resize();
        //console.log(combat);
        this.add.image(1920/2, 1080/2, "bg_map");

        var graphics = this.add.graphics();


        let offsetX = 100;
        let offsetY = 100;

        for(i = 0; i < mapModel.map.length; i++){
            let layer = mapModel.map[i];
            let nextLayer = mapModel.map[i + 1]
            for(let j = 0; j < layer.length; j++){
                let node = layer[j];
                
                x1 = (1920 - 2 * offsetX)/mapModel.map.length * i + offsetX
                y1 = (1080 - 2 * offsetY)/layer.length * j  + offsetY;

                let t = new Token_map(this, x1, y1, node);
                if(node.activate == "no")
                    t.alpha = 0.4;
                else 
                    t.alpha = 1;
                if(layer[j].left){
                    x2 = (1920 - 2 * offsetX)/mapModel.map.length * (i + 1) + offsetX;
                    y2 = (1080 - 2 * offsetY)/nextLayer.length * layer[j].left.id + offsetY;
                    this.printPath(x1, y1, x2, y2, graphics);
                }
                if(layer[j].right){
                    x2 = (1920 - 2 * offsetX)/mapModel.map.length * (i + 1) + offsetX;
                    y2 = (1080 - 2 * offsetY)/nextLayer.length * layer[j].right.id + offsetY;
                    this.printPath(x1, y1, x2, y2, graphics);
                    
                }
            }
        }
        //token = new Token_map(this, 1920/2, 1080/2, "enemy_map");
        var s = this.scene;
        this.input.on("gameobjectdown", function(pointer, gameObject){
            if(gameObject.node.activate == "no" || gameObject.node.activate == "pas" )
                return;
            g = Math.floor(Math.random() * enemisJSON.length)
            mapModel.updateMap(gameObject.node);
            enemy = [new Enemy(enemisJSON[g])];
            combat = new Combat(hand, enemy);
            s.start("CombatScene");
        })


    },
    printPath: function(x1, y1, x2, y2, graphics){
        slicePiece = 40;
        sliceJump = 10;
        
        //let line = new Phaser.Geom.Line(x1, y1, x2, y2);
        let size = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        let vx = (x2 - x1) / size;
        let vy = (y2 - y1) / size;
        
        graphics.lineStyle(12, 0xeeeeee);
        graphics.beginPath();
        
        let contadorX = 0;
        let contadorY = 0;

        for(k = 0; k < Math.floor(size/(sliceJump + slicePiece)); k ++){
            
            graphics.moveTo(x1 + contadorX, y1 + contadorY );
            contadorX += (slicePiece * vx)
            contadorY += (slicePiece * vy)
            graphics.lineTo(x1 + contadorX , y1 + contadorY);
            contadorX += (sliceJump * vx);
            contadorY += (sliceJump * vy);
        }
        aux = size / (sliceJump + slicePiece) -  Math.floor(size/(sliceJump + slicePiece)) - sliceJump;

        if(aux > 0){
            graphics.moveTo(x1 + contadorX, y1 + contadorY );
            contadorX += (slicePiece * vx)
            contadorY += (slicePiece * vy)
            graphics.lineTo(x1 + contadorX , y1 + contadorY);
        }
        
        graphics.strokePath();
    }
})