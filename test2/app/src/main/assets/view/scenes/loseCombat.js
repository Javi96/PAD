var LoseCombatScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function LoseCombat(params){
        console.log("hola")
        Phaser.Scene.call(this, {key: 'LoseCombatScene'})
    },
    preload: function(){
        
        this.load.image("end", "view/img/end.jpg");
    },

    create:function(){
        window.addEventListener('resize', resize);
        resize();

        ending = this.add.image(1920/2, 1080/2, "end").setAlpha(0);
        tweenEnding = this.tweens.add({
            targets: ending,
            scaleX: 4,
            scaleY: 3,
            //alpha: 1,
            ease: 'Sine.easeOut',
            duration: 3000,
            delay: 100,
            onStart: onStartHandler,
            onStartParams: [ending],
            onComplete: onCompleteHandler,
            onCompleteParams: [this]
        }); 
    }
})