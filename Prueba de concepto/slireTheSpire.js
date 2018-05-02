let effect = function(dur){
    this.duration = dur;
}
effect.prototype.reduce = function() {
    this.duration--;
}

let reduceDebuff = function() {
}
reduceDebuff.prototype = new effect(3);

reduceDebuff.prototype.action = function(){
    for(let e of start){
        e.reduce();
    }
}
reduceDebuff.prototype.reduce = function() {
    return;
}

let poison = function() {
}
poison.prototype = new effect(5);
poison.prototype.action = function() {
    console.log("he aplicado " +  this.duration + " de veneno al enemigo")
}

let start = [new reduceDebuff(), new poison()];

function combat(){
    for(let e of start){
        e.action();
    }
    card.play()
}

