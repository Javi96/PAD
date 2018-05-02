let cards = [{card : strike, number : 3}];

var strike = {
    name : "strike",
    cost : 1,
    description : "Deal 6 dmg",
    effects : [{
                funct : deal_dmg , 
                parameters : {
                    dmg : 6,
                    target : "single"
                },
            },
            {
                funct : apply_poison,
                parameters : {
                    duration : 3,
                    target : "single",
                }
            }
        ]
};



let target = function(){
    this.max_hp = 14;
    this.hp = 9; 
    this.startTurn = [];
}
target.prototype.setDmg = function(dmg){
    this.hp -= dmg;
}

target.prototype.apply_poison = function(duration){
    this.startTurn.push(new effect());
}

let effect = function(){
    this.turns = 3;
}
effect.prototype.step = function(target){
    target.setDmg(this.turns);
    this.turns--;
}
function deal_dmg(target, parameters){
    target.setDmg(parameters.dmg);
};

function apply_poison(target, parameters){
    target.apply_poison(target, parameters.duration);
};

function play_card(name, target){
    for(let e of name.effects){
        e.funct(target, e.parameters);
    }
}

function startGame(){
    //construyo escena
    combat();
}

function combat(){
    t = new target();
    for(let i = 0; i < 2; i++){
        for(let e of t.startTurn){
            e.step(t);
        }
        play_card(strike, t);
        console.log(t);
    }
}



