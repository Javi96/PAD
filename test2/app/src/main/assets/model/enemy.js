var Enemy = function(config){
    this.name = config.name;
    this.hp = config.hp;
    this.block = config.block;
    this.startCombatEffects = config.startCombatEffects;
    this.startTurnEffects = config.startTurnEffects;
    this.playCardEffects = config.playCardEffects;
    this.receiveAttackEffects = config.receiveAttackEffects;
    this.endTurnEffects = config.endTurnEffects;
    this.strenght = config.strenght;

    this.attackList = [this.attack1, this.attack2];
    this.selectedAttack;
}


//recibes un ataque de una carta con
    //@param dealer
    //@param dmg
Enemy.prototype.receiveAttack = function(dealer, dmg){
    this.hp -= dmg;
    for(let e of this.receiveAttackEffects){
        e.apply(this, dealer);
    }
}

Enemy.prototype.attack1 = function(player){
    player.receiveAttack(this, 4 + this.strenght);
    console.log("hare " + (4 + this.strenght) + " dmg" )
}

Enemy.prototype.attack2 = function(player){
    this.block += 5;
    console.log("bloqueare " + 5 + "de dmg" )
}

Enemy.prototype.selectAttack = function(){
    this.selectAttack = this.attackList[1];
}