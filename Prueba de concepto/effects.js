
var effect = function (duration, scope, target){
	this.duration = duration;
	this.scope = scope;
	this.target = target;
}

effect.prototype.nextRound = function(){
	this.duration--;
}

//
// POISON
//

var poison = function(duration, scope){
	this.duration = duration;
	this.scope = scope;
	this.target = target;
}

poison.prototype = new effect(this.duration, this.scope, this.target);

poison.prototype.apply = function(){
	this.target.HP -= this.duration;
}


//
// WEAK
//

var weak = function(duration, scope){
	this.duration = duration;
	this.scope = scope;
	this.target = target;
}

weak.prototype = new effect(this.duration, this.scope, this.target);

weak.prototype.apply = function(){
	this.target.Attack = this.target.Attack * 0.75;

}