var Player = function(config){
    this.hp = config.hp;
    this.mana = config.mana;
    this.block = config.block;
    this.strenght = config.strenght;
    this.dexterity = config.dexterity;
    this.vulnerable = config.vulnerable;
    this.poison = config.poison;
    this.startCombatEffects = config.startCombatEffects;
    this.startTurnEffects = config.startTurnEffects;
    this.playCardEffects = config.playCardEffects;
    this.endTurnEffects = config.endTurnEffects;
    this.receiveAttackEffects = config.receiveAttackEffects;
}
Player.prototype.receiveAttack = function(dealer, dmg){
    this.hp -= dmg;
    for(e of this.receiveAttackEffects){
        e.apply(this, dealer);
    }
}

Player.prototype.makeAttack = function(target, dmg){
    target.receiveAttack(this, dmg + this.strenght);
}

Player.prototype.disicardHand = function(keep){
   
}