var enemy = function(){

}

enemy.prototype = new entity({
    hp:30,
    startTurn : {},
    endTurn : {},
    atack : {},
    getDmg : {debug : poison}   
});


enemy.prototype.receiveAtack = function(dealer, dmg){
    this.hp -= this.calculateDmg(dmg); //aplicar aqui vunerabilidades etc
    this.getDmgEffects(player, dealer);
}


enemy.prototype.calculateDmg = function(dmg){
    return dmg;
}

