var Combat = function(){
    this.deck = [strike, strike, strike, strike, strike, strike, strike, clash];
    this.hand = [];
    this.discard = [];
    this.player = new Player({
        "hp" : 100,
        "mana" : 3,
        "block" : 0,
        "strenght" : 0,
        "startCombatEffects" : [],
        "startTurnEffects" : [],
        "playCardEffects" : [],
        "endTurnEffects" : [new discardHandEffect()],
        "receiveAttackEffects" : [],
    });
    this.enemies = [new Enemy({
        "name":"wotisdis",
        "hp" : 100,
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
    if(!card.action(this.player, target, enemies)){
        return false;
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
    this.drawHand(6)
}

Combat.prototype.endTurn = function(){
    this.player.mana = 3;
    for(eff of this.player.endTurnEffects)
    {
        eff.apply();    
    }
}

Combat.prototype.discardHand = function(keep){
    if(keep == undefined)
        keep = [];
    
    for(c of this.hand){
        remove = true;
        for(k of keep)
            if(c === k){
                remove= false;
                break;
            }
        
        if(remove){
            this.discard.push(c);
        }
    }

    this.hand = keep;
}

Combat.prototype.drawHand = function(n){
    console.log(n)
    for(let i = 0; i < n; i++){
        this.hand[i] = this.deck.pop();
        if(this.deck.length == 0){
            this.suffleDeck();
        }
    }
}

Combat.prototype.suffleDeck = function(){

    for(d of this.discard){
        this.deck.push(d);
    }
    for(let i = 0; i < 27; i++){
        rnd1 = Math.floor(Math.random() * this.deck.length);
        rnd2 = Math.floor(Math.random() * this.deck.length);
        temp = this.deck[rnd1];
        this.deck[rnd1] = this.deck[rnd2]
        this.deck[rnd2] = temp;
    }
    this.discard = [];
}