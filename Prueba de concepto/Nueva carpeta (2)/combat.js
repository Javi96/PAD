var combat = function(){
    this.enemies = [new enemy()];
    this.player = new player();
    this.turn = 0;
}

combat.prototype.step = function(){
    for(let e of this.enemies){
        e.startTurnEffects(e);
    }
    this.player.startTurnEffects(this.player);

    this.player.atackAction(this.enemies, {dmg:10,effects:[
                {list:"startTurn"}
    ]});
}