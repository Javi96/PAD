
var strike = {
    "name":"strike",
    "cost": 1,
    "dmg": 6,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        player.makeAttack(target, this.dmg);
        player.mana -= this.cost;
        return true;
    }
}

var clash = {
    "name":"clash",
    "cost": 0,
    "dmg": 14,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[],
    "action": function(player, target, enemies){
        console.log(combat.hand)
        for(let asd in combat.hand){
            if(asd.type != "attack"){
                return false;
            }
        }
        player.makeAttack(target, this.dmg);
        player.mana -= this.cost;
        return true;
    }
}

var anger = {
    "name":"anger",
    "cost": 0,
    "dmg": 4,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        player.makeAttack(target, this.dmg);
        combat.deck.push(anger);
        return true;
    }
}

var bash = {
    "name":"bash",
    "cost": 2,
    "dmg": 8,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[new applyVulnerableEffect(2)],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        player.makeAttack(target, this.dmg);
        player.mana -= this.cost;
        return true;
    }
}

var defend = {
    "name":"defend",
    "cost": 1,
    "block": 6,
    "descripcion": "Deal %dmg damage",
    "type": "skill",
    "effects":[],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        player.getBlock(this.block)
        player.mana -= this.cost;
        return true;
    }
}


var bodySlam = {
    "name":"bodySlam",
    "cost": 1,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        player.makeAttack(target, player.block * 2);
        player.mana -= this.cost;
        return true;
    }
}

var cleave = {
    "name":"cleave",
    "cost": 1,
    "dmg": 7,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        for(e of enemies)
            player.makeAttack(e, this.dmg);
        player.mana -= this.cost;
        return true;
    }
}

var clothesline = {
    "name":"clothesline",
    "cost": 2,
    "dmg": 12,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[new applyWeakEffect(2)],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        player.makeAttack(target, this.dmg);
        player.mana -= this.cost;
        return true;
    }
}


var flex = {
    "name":"flex",
    "cost": 0,
    "descripcion": "Deal %dmg damage",
    "type": "skill",
    "effects":[new loseStrenght(2)],
    "action": function(player, target, enemies){
        player.streght += 2;
        player.mana -= this.cost;
        return true;
    }
}


var heavyBlade = {
    "name":"heavyBlade",
    "cost": 2,
    "dmg": 14,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        player.makeAttack(target, this.dmg + player.streght * 2);
        player.mana -= this.cost;
        return true;
    }
}

var ironWave = {
    "name":"ironWave",
    "cost": 1,
    "dmg": 5,
    "block" : 5,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        player.makeAttack(target, this.dmg);
        player.getBlock(this.block);
        player.mana -= this.cost;
        return true;
    }
}

var perfectedStrike = {
    "name":"perfectedStrike",
    "cost": 2,
    "dmg": 6,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        boost = 0;
        for(c of combat.deck)
            if(c.name.includes("strike"))
                boost += 2;

        for(c of combat.hand)
            if(c.name.includes("strike"))
                boost += 2;
        
        for(c of combat.discard)
            if(c.name.includes("strike"))
                boost += 2;
        player.makeAttack(target, this.dmg + boost);
        player.mana -= this.cost;
        return true;
    }
}

var swordBoomerang = {
    "name":"swordBoomerang",
    "cost": 1,
    "dmg": 3,
    "times" : 3,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        for(i = 0; i < 3; i++){
            t = enemies[Math.floor(Math.random() * enemies.lengt)]
            player.makeAttack(t, this.dmg);
        }
        player.mana -= this.cost;
        return true;
    }
}


var thunderclap = {
    "name":"thunderclap",
    "cost": 1,
    "dmg": 4,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[new applyVulnerableEffect(1)],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        for(t of enemies)
            player.makeAttack(t, this.dmg);
        player.mana -= this.cost;
        return true;
    }
}

var twinStrike = {
    "name":"twinStrike",
    "cost": 1,
    "dmg": 5,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        
        player.makeAttack(target, this.dmg);
        player.makeAttack(target, this.dmg);
        player.mana -= this.cost;
        return true;
    }
}


var wildStrike = {
    "name":"wildStrike",
    "cost": 1,
    "dmg": 12,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        player.makeAttack(target, this.dmg);
        player.mana -= this.cost;
        combat.deck.push(wound);
        return true;
    }
}

var wound = {
    "name":"wound",
    "cost": 0,
    "descripcion": "Deal %dmg damage",
    "type": "status",
    "effects":[],
    "action": function(player, target, enemies){
        return false;
    }
}

var bloodletting = {
    "name":"bloodletting",
    "cost": 0,
    "mana" : 1,
    "descripcion": "Deal %dmg damage",
    "type": "skill",
    "effects":[],
    "action": function(player, target, enemies){
        player.hp -= 3;
        player.mana += 1;
        player.mana -= this.cost;
        return true;
    }
}

var combust = {
    "name":"combust",
    "cost": 1,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[new combustEffect(1, 5)],
    "action": function(player, target, enemies){
        return true;
    }
}


var disarm = {
    "name":"disarm",
    "cost": 1,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        target.strenght -= 2;
        return true;
    }
}


var dropkick = {
    "name":"dropkick",
    "cost": 1,
    "dmg": 5,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        player.makeAttack(target, this.dmg);
        player.mana -= this.cost;
        if(getEffects)
            player.mana += 1;
        return true;
    }
}



var entrenche = {
    "name":"entrenche",
    "cost": 2,
    "descripcion": "Deal %dmg damage",
    "type": "skill",
    "effects":[],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        player.block *= 2
        player.mana -= this.cost;
        return true;
    }
}



var evolve = {
    "name":"strike",
    "cost": 1,
    "dmg": 6,
    "descripcion": "Deal %dmg damage",
    "type": "skill",
    "effects":[new drawStatusEffect(1)],
    "action": function(player, target, enemies){
        return true;
    }
}


var flameBarrier = {
    "name":"strike",
    "cost": 2,
    "block": 12,
    "descripcion": "Deal %dmg damage",
    "type": "skill",
    "effects":[new returnDmgEffect(4, 1)],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        player.makeAttack(target, this.dmg);
        player.mana -= this.cost;
        return true;
    }
}


var hemokinesis = {
    "name":"strike",
    "cost": 1,
    "dmg": 14,
    "selfDMG" : 3,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        player.makeAttack(target, this.dmg);
        player.hp -= 3;
        player.mana -= this.cost;
        return true;
    }
}


var inflame = {
    "name":"inflame",
    "cost": 1,
    "strenght" : 2,
    "descripcion": "Deal %dmg damage",
    "type": "power",
    "effects":[],
    "action": function(player, target, enemies){
        player.streght += 2;
        return true;
    }
}


var intimidate = {
    "name":"intimidate",
    "cost": 0,
    "weak" : 1,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[new applyWeakEffect(this.weak, list)],
    "action": function(player, target, enemies){
        player.mana -= this.cost;
        return true;
    }
}



var metallicize = {
    "name":"metallicize",
    "cost": 1,
    "block" : 3,
    "descripcion": "Deal %dmg damage",
    "type": "power",
    "effects":[new metallicizeEffect(this.block)],
    "action": function(player, target, enemies){
        return true;
    }
}


var powerThrough = {
    "name":"powerTrhough",
    "cost": 1,
    "block": 15,
    "descripcion": "Deal %dmg damage",
    "type": "skill",
    "effects":[],
    "action": function(player, target, enemies){
        player.getBlock(this.block);
        player.mana -= this.cost;
        player.deck.push(wound);
        player.deck.push(wound);
        return true;
    }
}

var pummel = {
    "name":"pummel",
    "cost": 1,
    "dmg": 2,
    "times" : 4,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        for(i = 0; i< this.times; i++)
            player.makeAttack(target, this.dmg);
        player.mana -= this.cost;
        return true;
    }
}

var rage = {
    "name":"rage",
    "cost": 0,
    "block": 3,
    "descripcion": "Deal %dmg damage",
    "type": "skill",
    "effects":[new attackGainBlockEffect(this.block, 1)],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        player.makeAttack(target, this.dmg);
        player.mana -= this.cost;
        return true;
    }
}

var recklessChrage = {
    "name":"recklessCharge",
    "cost": 0,
    "dmg": 7,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        player.makeAttack(target, this.dmg);
        player.mana -= this.cost;
        combat.deck.push(dazed);
        return true;
    }
}

var dazed = {
    "name":"dazed",
    "cost": 0,
    "descripcion": "Deal %dmg damage",
    "type": "status",
    "effects":[],
    "action": function(player, target, enemies){
        return false;
    }
}

var seeingRed = {
    "name":"seeingRed",
    "cost": 1,
    "mana": 2,
    "descripcion": "Deal %dmg damage",
    "type": "skill",
    "effects":[],
    "action": function(player, target, enemies){
        player.mana += 2;
        player.mana -= this.cost;
        return true;
    }
}

var uppercut = {
    "name":"uppercut",
    "cost": 2,
    "dmg": 13,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[new applyWeakEffect(1),new applyVulnerableEffect(1)],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        player.makeAttack(target, this.dmg);
        player.mana -= this.cost;
        return true;
    }
}
    

var whirlwind = {
    "name":"strike",
    "cost": undefined,
    "dmg": 5,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[],
    "action": function(player, target, enemies){
        
        for(i = 0; i < player.mana; i++){
            for(t of enemies)
                player.makeAttack(t, this.dmg);
        }
        player.mana = 0;
        return true;
    }
}


var bludgeon = {
    "name":"bludgeon",
    "cost": 3,
    "dmg": 32,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        player.makeAttack(target, this.dmg);
        player.mana -= this.cost;
        return true;
    }
}


var deamonForm = {
    "name":"deamonForm",
    "cost": 3,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[new gainStrengthEffect(2)],
    "action": function(player, target, enemies){
        return true;
    }
}

var doubleTap = {

    "name":"doubleTap",
    "cost": 1,
    "descripcion": "Deal %dmg damage",
    "type": "skill",
    "effects":[new dobleTapEffect(1)],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        player.makeAttack(target, this.dmg);
        player.mana -= this.cost;
        return true;
    }
}

var feed = {
    "name":"feed",
    "cost": 1,
    "dmg": 10,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        player.makeAttack(target, this.dmg);
        if(target.hp <= 0)
            player.maxHp += 3;
        player.mana -= this.cost;
        return true;
    }
}

var inmolate = {
    "name":"inmolate",
    "cost": 2,
    "dmg": 21,
    "descripcion": "Deal %dmg damage",
    "type": "attack",
    "effects":[],
    "action": function(player, target, enemies){
        if(!target)
            return false;
        for(t of enemies)
            player.makeAttack(target, this.dmg);
        combat.discard.push(wound)
        player.mana -= this.cost;
        return true;
    }
}

