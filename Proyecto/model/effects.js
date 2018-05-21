var returnDmgEffect = function(dmg){
    this.name = "returnDmg"
    this.duration = 3;
    this.dmg = dmg;
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