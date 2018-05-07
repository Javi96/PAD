var player = function(){

}

player.prototype = new entity({
    hp:80,
    startTurn : {blockRm : function(target){
        target.block = 15;
    }},
    endTurn : {},
    atack : {},
    getDmg : {}
});


player.prototype.atackAction = function(target, card){
    for(let t of target){
        t.receiveAtack(this, card.dmg);
        //t.applyEffects(card.effects)
    }
    this.atackEffects(target);
}