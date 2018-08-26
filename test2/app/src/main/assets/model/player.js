var Player = function(config){
    this.hp = config.hp;
    this.deck = [];
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
    for(let e of this.receiveAttackEffects){
        e.apply(this, dealer);
    }
}

Player.prototype.makeAttack = function(target, dmg){
    target.receiveAttack(this, dmg + this.strenght);
}

Player.prototype.addEffect = function(effect){
    targetEffect = null;
    switch(effect.effectTarget){
        case "startCombat":
            targetEffect = this.startCombatEffects;
            break;
        case "startCombat":
            targetEffect = this.startTurnEffects;
            break;
        case "startCombat":
            targetEffect = this.playCardEffects;
            break;
        case "startCombat":
            targetEffect = this.endTurnEffects;
            break;
        case "receiveAttack":
            targetEffect = this.receiveAttackEffects
            break;
        default:
            console.log("error este efecto no deberia existir")
    }
    found = false;
    for(eff of targetEffect){
        if(eff.name == effect.name){
            eff.manage(effect);
            found = true;
            break;
        }
    }
    if(!found)
        targetEffect.push(effect);
}