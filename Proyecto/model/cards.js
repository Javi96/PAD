
var strike = {
    "name":"strike",
    "cost": 1,
    "dmg": 6,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[],
    "action": function(player, target, enemies){
        player.makeAttack(target, this.dmg);
        player.mana -= this.cost;
        return true;
    }
}

var clash = {
    "name":"clash",
    "cost": 50,
    "dmg": 6,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[],
    "action": function(player, target, enemies){
        for(i in combat.hand){
            if(i.type != "attack"){
                return false;
            }
        }
        player.makeAttack(player, this.dmg);
        player.mana -= this.cost;
        return true;
    }
}