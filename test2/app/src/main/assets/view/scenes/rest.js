var RestScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function RestScene(params){
        Phaser.Scene.call(this, {key: 'RestScene'})
    },
    preload: function(){
        
        this.load.image("rest", "view/img/rest.jpg");
    },

    create:function(){
        window.addEventListener('resize', resize);
        resize();

        r = this.add.image(1920/2, 1080/2, "rest");
        r.setInteractive();
        var s = this.scene;
        this.input.on("gameobjectdown", function(pointer, gameObject){
            player.hp = ((player.hp + Math.floor(player.maxHp * 0.3) < player.maxHP) ? player.hp + Math.floor(player.maxHP * 0.3) : player.maxHP);
            s.start("mapScene");
        })

    }
})