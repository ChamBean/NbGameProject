var MapNode = (function () {
    function MapNode(s) {
        this.visited = false;
        this.visitTime = 0;
        this.isMask = false;
        this.isSwim = false;
        this.isSafe = true;
        this.walkAble = true;
    }
    var d = __define,c=MapNode,p=c.prototype;
    p.reset = function () {
        this.f = 0;
        this.g = 0;
        this.h = 0;
        //			expense = 0;
        //			nodeMutipler = 0;
        this.x = 0;
        this.y = 0;
        this.visitTime = 0;
        this.walkAble = true;
        this.visited = false;
        this.isMask = false;
        this.isSwim = false;
        this.isSafe = true;
    };
    MapNode.getNode = function () {
        var node;
        if (MapNode.nodePool.length == 0) {
            node = new MapNode(new Single());
            MapNode.numCount++;
        }
        else {
            node = MapNode.nodePool.shift();
        }
        return node;
    };
    p.dispose = function () {
        //释放Node对象,将其放入对象池
        this.reset();
        //			if(nodePool.indexOf(this)<0)//干掉这个检测，当执行10000次的时候非常浪费时间
        MapNode.nodePool.push(this);
    };
    //对象池
    MapNode.nodePool = [];
    MapNode.numCount = 0;
    return MapNode;
}());
egret.registerClass(MapNode,'MapNode');
var Single = (function () {
    function Single() {
    }
    var d = __define,c=Single,p=c.prototype;
    return Single;
}());
egret.registerClass(Single,'Single');
//# sourceMappingURL=MapNode.js.map