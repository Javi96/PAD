var Map = function(layers){
    this.clickedNodes = []
    this.map = [[]]
    lvlNodes = 0;
    this.layers = layers;
    //crea lvl 0
    for(i = 0; i < 4; i++){
        this.map[0][i] = new StepNode(i,{type : "combat", activate: "yes"});
    }
    //crea 9 capas mas
    for(x = 1; x < this.layers; x++){
        let layer = this.map[x-1];
        this.map[x] = [];
        let nextLayer = this.map[x];
        //crea los caminos desde el nodo
        for(i = 0; i < layer.length; i++){
            let n = layer[i];
            let rnd = Math.random();

            if(rnd < 0.5){//create left
                if(i == 0){
                    nextLayer.push(new StepNode(nextLayer.length, {}));
                    n.left = nextLayer[nextLayer.length - 1];
                }else if(layer[i-1].right){
                    n.left = nextLayer[nextLayer.length - 1]
                }else{
                    nextLayer.push(new StepNode(nextLayer.length, {}));
                    n.left = nextLayer[nextLayer.length - 1];
                }

                if(Math.random() < 0.15){
                    nextLayer.push(new StepNode(nextLayer.length, {}));
                    n.right = nextLayer[nextLayer.length - 1];
                }
            }else{//create rigth
                nextLayer.push(new StepNode(nextLayer.length, {}));
                n.right = nextLayer[nextLayer.length - 1];
                if(Math.random() < 0.15){
                    nextLayer.push(new StepNode(nextLayer.length, {}));
                    n.left = nextLayer[nextLayer.length - 1];
                }
            }
        }
    }

    this.map[this.layers] = []
    this.map[this.layers][0] = new StepNode(0, {type:"boss"})
    for(let t of this.map[this.layers - 1]){
        t.left = this.map[this.layers][0];
    }

    
}

Map.prototype.updateMap = function(node){
    for(l of this.map)
        for(n of l)
            n.activate = "no";
        
    for(n of this.clickedNodes){
        n.activate = "pas";
        
    }
    node.activate = "pas";
    if(node.left)
        node.left.activate = "yes";
    if(node.right)
        node.right.activate = "yes";

    this.clickedNodes.push(node);
}

var StepNode = function(id,config){
    this.id = id
    this.type = config.type || "combat";
    this.activate = config.activate || "no";
    left = null;
    rigth = null;
}