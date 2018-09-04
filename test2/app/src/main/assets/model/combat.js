var Combat = function(deck, enemy){
    this.deck = deck;
    console.log("constructor");
    console.log(this.deck);
    this.hand = [];
    this.discard = [];
    this.enemies = enemy;
}

Combat.prototype.action = function(target, card){
    if(card.cost > player.mana){
        return false;
    }
    if(!card.action(player, target, this.enemies)){
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
    for(e of this.enemies){
        e.selectAttack();
    }
    for(eff of player.startTurnEffects)
            eff.apply();
    
    this.drawHand(6)
}

Combat.prototype.endTurn = function(){
    player.mana = 3;
    for(e of this.enemies){
        e.nextAttack();
    }
    for(eff of player.endTurnEffects)
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
    maxDraw = this.deck.length + this.discard.length;
    draw = ((n < this.deck.length + this.discard.length) ? n  : maxDraw) ;
    for(let i = 0; i < draw; i++){
        this.hand[i] = this.deck.pop();
        if(this.deck.length == 0){
            this.suffleDeck();
        }
    }
    notEnought = false;
    let i;
    for(i = 0; i < n; i++){
        if(this.deck.length == 0){
            notEnought = true;
            break;
        }
        this.hand[i] = this.deck.pop();
    }
    if(notEnought){
        this.suffleDeck();
    }
    for(;i < n && this.deck.length > 0; i++){
        this.hand[i] = this.deck.pop();
    }

}

Combat.prototype.suffleDeck = function(){
    
    /*for(d of this.discard){
        this.deck.push(d);
    }*/

    this.deck = this.discard;
    this.discard = [];

    if(this.deck.length != 0){
        for(let i = 0; i < 27; i++){
            rnd1 = Math.floor(Math.random() * this.deck.length);
            rnd2 = Math.floor(Math.random() * this.deck.length);
            temp = this.deck[rnd1];
            this.deck[rnd1] = this.deck[rnd2]
            this.deck[rnd2] = temp;
        }
    }
    this.discard = [];
}