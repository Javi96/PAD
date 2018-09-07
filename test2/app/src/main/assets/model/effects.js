var returnDmgEffect = function(dmg, duration){
    this.name = "returnDmg"
    this.duration = duration || -1;
    this.dmg = dmg;
    this.effectTarget = "startCombat";
    this.print = "0xff4000"
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
returnDmgEffect.prototype.getText = function(){
    return this.dmg;
}

var combustEffect = function(selfDMG, dmg){
    this.name = "combust"
    this.duration = -1;
    this.dmg = dmg;
    this.selfDMG = selfDMG
    this.effectTarget = "endTurn";
}

combustEffect.prototype.apply = function(source, enemies){
    player.hp -= this.selfDMG;
    for(e of enemies){
        e.hp -= this.dmg;
    }
}

combustEffect.prototype.manage = function(effect){
    this.selfDMG += effect.selfDMG;
    this.dmg += effect.dmg; 
}
combustEffect.prototype.getText = function(){
    return this.dmg;
}

var attackGainBlockEffect = function(block, duration){
    this.name = "attackGainBlock"
    this.duration = duration || -1;
    this.block = block;
    this.effectTarget = "playCard";
}

attackGainBlockEffect.prototype.apply = function(source, card){
    if(card.type == "attack")  
        source.getBlock(this.block);
}

attackGainBlockEffect.prototype.manage = function(effect){
    this.duration += effect.duration;
}
attackGainBlockEffect.prototype.getText = function(){
    return this.block;
}

var gainBlockEffect = function(block, duration){
    this.name = "attackGainBlock"
    this.duration = duration || -1;
    this.block = block;
    this.effectTarget = "startTurn";
}

gainBlockEffect.prototype.apply = function(source){
    source.getBlock(this.block)
}

gainBlockEffect.prototype.manage = function(effect){
    this.duration += effect.duration;
}
gainBlockEffect.prototype.getText = function(){
    return this.block;
}



var gainStrengthEffect = function(strength, duration){
    this.name = "attackGainBlock"
    this.duration = duration || -1;
    this.strength = strength;
    this.effectTarget = "endTurn";
}

gainStrengthEffect.prototype.apply = function(source, card){
    source.strength += this.strength;
}

gainStrengthEffect.prototype.manage = function(effect){
    this.strength += effect.strength;
}
gainStrengthEffect.prototype.getText = function(){
    return this.strength;
}


var discardHandEffect = function(){
    this.name = "discardHand"
}

discardHandEffect.prototype.apply = function(target, dealer){
    discardHand();
}

var drawHandEffect = function(n){
    this.name = "drawCard"
    this.n = n;
    this.duration = 1;
    this.effectTarget = "startTurn"
}

drawHandEffect.prototype.apply = function(target, dealer){
    combat.drawHand(this.n);
}
drawHandEffect.prototype.manage = function(effect){
    this.n += effect.n;
}
drawHandEffect.prototype.getText = function(){
    return this.n;
}


var loseBlockEffect = function(n, duration){
    this.name = "loseBlockEffect"
    this.effectTarget = "endCombat";
    this.duration = duration || -1;
    this.block = n;
    this.print = undefined;
}

loseBlockEffect.prototype.apply = function(source){

    if(this.block > 2)
        source.block = source.block * this.block; 
    else{
        source.block = 0;
        source.getBlock(this.block);
    }
}

loseBlockEffect.prototype.manage = function(effect){
    if(effect.block > this.block){
        this.block = effect.block; 
        this.print = "0xffffff";
    }
}
loseBlockEffect.prototype.getText = function(){
    if(duration > 0)
        return this.n;
    else 
        return;
}

var loseStrengthEffect = function(n){
    this.name = "loseStrength"
    this.n = n;
    this.duration = 1;
    this.print = "0x000000";
    this.effectTarget = "endTurn";
}

loseStrengthEffect.prototype.apply = function(target){
    target.strength -= this.n
}

loseBlockEffect.prototype.manage = function(effect){
    this.n += effect.n;
}
loseBlockEffect.prototype.getText = function(){
        return this.n;
}

var enrageEffect = function(n){
    this.name = "enrageEffect"
    this.n = n;
    this.duration = -1;
    this.print = "0x000099";
    this.effectTarget = "playCard";
}

enrageEffect.prototype.apply = function(source, card){
    if(card.type == "skill")
        target.strength += this.n
}

enrageEffect.prototype.manage = function(effect){
    this.n += effect.n;
}
enrageEffect.prototype.getText = function(){
        return this.n;
}

//get effect in list

function getEffect(list, name){
    for(l of list)
        if (l.name == name)
            return l;
    return null;
}