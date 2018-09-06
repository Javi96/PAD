var returnDmgEffect = function(dmg, duration){
    this.name = "returnDmg"
    this.duration = duration || -1;
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

var applyVulnerableEffect = function(n){
    this.name = "applyVulnerable"
    this.n = n;
}

applyVulnerableEffect.prototype.apply = function(target){
    target.vulnerable = this.n;
    this.n--
}

var applyWeakEffect = function(n){
    this.name = "applyWeak"
    this.n = n;
}

applyWeakEffect.prototype.apply = function(target){
    target.weak = this.n;
    this.n--
}

var loseStrengthEffect = function(n){
    this.name = "loseStrength"
    this.n = n;
    this.duration = 1;
}

applyWeakEffect.prototype.apply = function(target){
    target.strength -= this.n
}


//get effect in list

function getEffect(list, name){
    for(l of list)
        if (l.name == name)
            return l;
    return null;
}