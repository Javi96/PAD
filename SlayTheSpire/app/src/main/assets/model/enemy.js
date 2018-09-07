var Enemy = function(config){
    this.name = config.name;
    this.hp = config.hp;
    this.maxHP = config.maxHP;
    this.vulnerable = 0;
    this.weak = 0;
    this.block = config.block;
    this.startCombatEffects = [];
    for(e of config.startCombatEffects)
        this.startCombatEffects.push(eval(e));
    this.playCardEffects = [];
    for(e of config.playCardEffects)
        this.playCardEffects.push(eval(e));
    this.receiveAttackEffects = [];
    for(e of config.receiveAttackEffects)
        this.receiveAttackEffects.push(eval(e));
    this.endTurnEffects = [];
    for(e of config.endTurnEffects)
        this.endTurnEffects.push(eval(e));
    this.startTurnEffects = [new loseBlockEffect(0)];
    for(e of config.startTurnEffects)
        this.startTurnEffects.push(eval(e));
    this.strength = config.strength;

    this.attackList = config.attackList;
    this.routine = config.routine;
    this.turn = 0;
    this.selectedAttack;
    this.nextAttack = null;
}


//recibes un ataque de una carta con
    //@param dealer
    //@param dmg
Enemy.prototype.receiveAttack = function(dealer, dmg){
    this.calculateDmg(dmg);
    for(e of this.receiveAttackEffects){
        e.apply(this, dealer);
    }
}

Enemy.prototype.calculateDmg = function(dmg){
    temp = this.block;
    temp -= dmg + ((this.vulnerable == 0) ? 0 : Math.floor(dmg*0.25));
    if(temp < 0){
        this.block = 0;
        this.hp += temp;
    }else{
        this.block -= dmg; 
    }
}

Enemy.prototype.selectAttack = function(){
    this.nextAttack = this.attackList[this.routine(this.turn)];
    this.turn++;
}

Enemy.prototype.addEffect = function(effect){
    targetEffect = null;
    switch(effect.effectTarget){
        case "startCombat":
            targetEffect = this.startCombatEffects;
            break;
        case "startTurn":
            targetEffect = this.startTurnEffects;
            break;
        case "playCard":
            targetEffect = this.playCardEffects;
            break;
        case "endTTurn":
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

Enemy.prototype.reduceEffects = function(){
    for(i = 0; i < this.startCombatEffects; i++){
        e = this.startCombatEffects[i];
        e.duration -= 1;
        if(e.duration == 0)
            this.startCombatEffects.splice(i, 1);
    }
    for(i = 0; i < this.playCardEffects; i++){
        e = this.playCardEffects[i];
        e.duration -= 1;
        if(e.duration == 0)
            this.playCardEffects.splice(i, 1);
    }
    for(i = 0; i < this.startTurnEffects; i++){
        e = this.startTurnEffects[i];
        e.duration -= 1;
        if(e.duration == 0)
            this.startTurnEffects.splice(i, 1);
    }
    
    for(i = 0; i < this.endTurnEffects; i++){
        e = this.endTurnEffects[i];
        e.duration -= 1;
        if(e.duration == 0)
            this.endTurnEffects.splice(i, 1);
    }
    
    for(i = 0; i < this.receiveAttackEffects; i++){
        e = this.receiveAttackEffects[i];
        e.duration -= 1;
        if(e.duration == 0)
            this.receiveAttackEffects.splice(i, 1);
    }
}
Enemy.prototype.getBlock = function(n){
    this.block += n
}