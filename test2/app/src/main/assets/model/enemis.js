var enemisJSON = [
    {
        "name":"enemy_0",

        "hp" : 50,
        "maxHP" : 50,
        "strength" : 0,
        "block" : 0,
        "startCombatEffects" : [],
        "startTurnEffects" : [],
        "playCardEffects" : [],
        "receiveAttackEffects" : ["new returnDmgEffect(3)"],
        "endTurnEffects" : [],
        "attackList": [function(){
            player.receiveAttack(this, 5 + this.strength);
        }, function(){
            this.getBlock(5);
        }],
        "routine": function(n){
            if(Math.random < 0.5){
                return 0;
            }else{
                return 1;
            }
        }
    },
    {
        "name":"enemy_1",

        "hp" : 82,
        "maxHP" : 82,
        "strength" : 0,
        "block" : 0,
        "startCombatEffects" : [],
        "startTurnEffects" : [],
        "playCardEffects" : [],
        "receiveAttackEffects" : [],
        "endTurnEffects" : [],
        "attackList": [function(){
            this.addEffect(new enrageEffect(2));
        }, function(){
            player.receiveAttack(this, 12 + this.strength);
        }, function(){
            player.receiveAttack(this, 6 + this.strength);
            player.vulnerable += 2;
        }],
        "routine": function(n){
            if(n == 0){
                return 0;
            }else{
                return Math.floor(Math.random() * 2) + 1;
            }
        }
    },
    {
        "name":"enemy_2",

        "hp" : 45,
        "maxHP" : 45,
        "strength" : 0,
        "block" : 0,
        "startCombatEffects" : [],
        "startTurnEffects" : [],
        "playCardEffects" : [],
        "receiveAttackEffects" : [],
        "endTurnEffects" : [],
        "attackList": [function(){
            player.receiveAttack(this, 12 + this.strength);
        }, function(){
            player.receiveAttack(this, 7 + this.strength);
            player.weak++;
        }],
        "routine": function(n){
            if(Math.random < 0.6){
                return 0;
            }else{
                return 1;
            }
        }
    },
    {
        "name":"enemy_3",

        "hp" : 50,
        "maxHP" : 50,
        "strength" : 0,
        "block" : 0,
        "startCombatEffects" : [],
        "startTurnEffects" : [],
        "playCardEffects" : [],
        "receiveAttackEffects" : [],
        "endTurnEffects" : [],
        "attackList": [function(){
            player.receiveAttack(this, 6 + this.strength);
            this.strength += 2;
        }],
        "routine": function(n){
            return 0; 
        }
    },
    {
        "name":"enemy_4",

        "hp" : 100,
        "maxHP" : 100,
        "strength" : 0,
        "block" : 0,
        "startCombatEffects" : [],
        "startTurnEffects" : ["new gainBlockEffect(2)"],
        "playCardEffects" : [],
        "receiveAttackEffects" : [],
        "endTurnEffects" : [],
        "attackList": [function(){
            player.receiveAttack(this, 8 + this.strength);
            this.block += 3;
        }],
        "routine": function(n){
            return 0;
        }
    }
]