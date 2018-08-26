var returnDmgEffect = function(dmg){
    this.name = "returnDmg"
    this.duration = 3;
    this.dmg = dmg;
    this.effectTarget = "startCombat";
}


/** 
 * 
 * @param target - entity that receive the attack
 * @param dealer - entity that deal de attack
 * 
*/

returnDmgEffect.prototype.apply = function(target, dealer){
    dealer.hp -= this.dmg;
}
returnDmgEffect.prototype.manage = function(effect){
    this.dmg += effect.dmg;
}

var discardHandEffect = function(){
    this.name = "discardHand"
    
}

discardHandEffect.prototype.apply = function(target, dealer){
    discardHand();
}

var drawHandEffect = function(){
    this.name = "drawCard"
    this.n = 6;
}

drawHandEffect.prototype.apply = function(target, dealer){
    drawHand(this.n);
}

var loseBlockEffect = function(){
    this.name = "loseBlockEffect"
}

loseBlockEffect.prototype.apply = function(target){
    target.block = 0;
}