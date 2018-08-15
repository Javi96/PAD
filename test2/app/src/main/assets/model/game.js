var game = function(seed){
    this.player = {
        "hp" : 80,
        "mana" : 3,
        "maxHP" : 80,
        "block" : 0,
        "strenght" : 0,
        "startCombatEffects" : [],
        "startTurnEffects" : [],
        "playCardEffects" : [],
        "endTurnEffects" : [new discardHandEffect(), new blockLoseEffect()],
        "receiveAttackEffects" : [],
    };
    this.seed = seed;
    this.score = 0;
}