var Combat = function(){
    this.deck = [strike, strike, strike, strike, strike, strike, strike, clash];
    this.hand = [];
    this.discard = [];
    this.player = new Player({
        "hp" : 10,
        "mana" : 3,
        "block" : 0,
        "strenght" : 0,
        "startCombatEffects" : [],
        "startTurnEffects" : [],
        "playCardEffects" : [],
        "endTurnEffects" : [],
        "receiveAttackEffects" : [],
    });
    this.enemies = [new Enemy({
        "name":"wotisdis",
        "hp" : 10,
        "block" : 0,
        "startCombatEffects" : [],
        "startTurnEffects" : [],
        "playCardEffects" : [],
        "receiveAttackEffects" : [new returnDmgEffect(5)],
        "endTurnEffects" : [],
    })];
}

Combat.prototype.action = function(target, card){
    if(card.cost > this.player.mana){
        return false;
    }
    if(card.type == "attack"){
        target.receiveAttack(this.player, card.dmg + this.player.strenght);
    }else if(card.type == "skill"){
        target.receiveSkill(this.player, card);
    }else if(card.type == "power"){
        target.receivePower(this.player, card);
    }
    return true;
    
}

Combat.prototype.startTurn = function(){
    for(e of this.enemies){
        for(eff of e.startTurnEffects)
            eff.apply();
        e.selectAttack();
    }
    for(eff of this.player.startTurnEffects)
            eff.apply();
    for(i = 0 ; i < 6; i++){
        if(this.deck.length == 0){
            for(j= 0; j < this.discard.length; j++) {
                c = this.discard.pop();
                this.deck.push(c);
            }
        }
        card = this.deck.pop();
        this.hand.push(card);
    }
}