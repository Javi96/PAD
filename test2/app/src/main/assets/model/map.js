var Map = function(){
    this.map = [[]]
    lvlNodes = 0;
    for(i = 0; i < 4; i++){
        this.map[0][i] = new StepNode(i,{});
    }

    
    let layer = this.map[0]
    this.map[1] = [];
    let nextLayer = this.map[1];
    for(i = 0; i < layer.length; i++){
        let n = this.map[0][i];
        let rnd = Math.random();
        if(rnd < 0.5){//create left
            //console.log(layer[i-1].right != null);
            if(i == 0){
                nextLayer.push(new StepNode(nextLayer.length, {}));
                n.left = nextLayer[nextLayer.length - 1];
            }else if(layer[i-1].right){
                console.log(layer[i-1].right);
                n.left = nextLayer[nextLayer.length - 1]
            }else{
                nextLayer.push(new StepNode(nextLayer.length, {}));
                n.left = nextLayer[nextLayer.length - 1];
            }
        }else{//create rigth
            nextLayer.push(new StepNode(nextLayer.length, {}));
            n.right = nextLayer[nextLayer.length - 1];
        }
    }
}

var StepNode = function(id,config){
    this.id = id
    left = null;
    rigth = null;
}