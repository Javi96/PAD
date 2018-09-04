var Enemy = function(config){
    this.name = config.name;
    this.hp = config.hp;
    this.maxHP = config.maxHP;
    this.block = config.block;
    this.startCombatEffects = config.startCombatEffects;
    this.startTurnEffects = config.startTurnEffects;
    this.playCardEffects = config.playCardEffects;
    this.receiveAttackEffects = config.receiveAttackEffects;
    this.endTurnEffects = config.endTurnEffects;
    this.strenght = config.strenght;

    this.attackList = [this.attack1, this.attack2];
    this.selectedAttack;
    this.nextAttack = null;
}


//recibes un ataque de una carta con
    //@param dealer
    //@param dmg
Enemy.prototype.receiveAttack = function(dealer, dmg){
    calculateDMG(dmg);
    for(e of this.receiveAttackEffects){
        eval(e).apply(this, dealer);
    }
}

Enemy.prototype.calculateDmg = function(dmg){
    temp = this.block;
    temp -= dmg;
    if(tmp < 0){
        this.block = 0;
        this.hp += temp;
    }else{
        this.block -= dmg; 
    }
}

Enemy.prototype.attack1 = function(){
    player.receiveAttack(this, 4 + this.strenght);
    console.log("hare " + (4 + this.strenght) + " dmg" )
}

Enemy.prototype.attack2 = function(){
    this.block += 5;
    console.log("bloqueare " + 5 + "de dmg" )
}

Enemy.prototype.selectAttack = function(){
    this.nextAttack = this.attackList[0];
}