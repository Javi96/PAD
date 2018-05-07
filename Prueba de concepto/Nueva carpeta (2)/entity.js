var entity = function(info){    
    this.hp = info.hp;
    this.block = 0;
    this.startTurn = info.startTurn;
    this.endTurn = info.endTurn;
    this.atacksEffects = info.atack;
    this.getDmg = info.getDmg;
}

entity.prototype.startTurnEffects = function(){
    console.log("efectos del comienzo del turno ")
    console.log( this.startTurn);
    for(x in this.startTurn){
        this.startTurn[x](this);
    }
}
entity.prototype.endTurnEffect = function(){
    for(x in this.endTurnEffect){
        this.endTurnEffect[x](this);
    }
}
entity.prototype.atackEffects = function(){
    for(x in this.atackEffects){
        this.atackEffects[x](this);
    }
}
entity.prototype.getDmgEffects = function(player, dealer){
    console.log("efectos de recibir daño " )
    console.log(this.getDmg);
    for(x in this.getDmg){
        this.getDmg[x](this, dealer);
    }
}