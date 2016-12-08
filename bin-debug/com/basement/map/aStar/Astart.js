var Astart = (function () {
    function Astart() {
        this._version = 0;
        this.sqrt_2 = Math.SQRT2;
    }
    var d = __define,c=Astart,p=c.prototype;
    Astart.findPath = function (grid) {
        if (grid == null || grid.startNode == null || grid.endNode == null)
            return null;
        if (Astart._instance == null)
            Astart._instance = new Astart();
        return Astart._instance.hasPath(grid);
    };
    p.hasPath = function (grid) {
        Astart._onlyIdNum++;
        Astart._vistedNum = 0;
        this._arrange = new Arrange();
        this._arrange.key = "h";
        this._findFun = this.euclidian;
        this._startNode = grid.startNode;
        this._endNode = grid.endNode;
        var node = this._startNode;
        node.f = 0;
        node.g = node.h = 0;
        var maxX = grid.col - 1;
        var maxY = grid.row - 1;
        var nodes = grid.nodeArray;
        var acount = 0;
        var bcount = 0;
        var ccount = 0;
        var vistiteTime = Astart._onlyIdNum;
        while (node != this._endNode) {
            var startX = node.x - 1;
            var endX = node.x + 1;
            var startY = node.y - 1;
            var endY = node.y + 1;
            if (startX < 0)
                startX = 0;
            if (endX > maxX)
                endX = maxX;
            if (startY < 0)
                startY = 0;
            if (endY > maxY)
                endY = maxY;
            /*
            trace("x " + node.x +" y " + node.y);
            trace("startx " + startX +" endx " + endX);
            trace("starty " + startY + " endy " + endY)
            trace("maxX " + maxX +" maxy " + maxY);
             */
            for (var i = startX; i <= endX; i++) {
                for (var s = startY; s <= endY; s++) {
                    Astart._vistedNum++;
                    var test = nodes[s][i];
                    if (test.visitTime != vistiteTime) {
                        test.visited = false;
                        test.visitTime = vistiteTime;
                    }
                    if (test == null || !test.walkAble || test == node)
                        continue;
                    var four = !(test.x == node.x || test.y == node.y);
                    if (four) {
                        var ynode = nodes[test.y][node.x];
                        var xnode = nodes[node.y][test.x];
                        if (ynode.walkAble == false && xnode.walkAble == false)
                            continue;
                    }
                    //acount++;
                    var cost = four ? 1.4 : 1.0;
                    var _f = node.f + cost;
                    if (test.visited) {
                        bcount++;
                        if (test.f > _f) {
                            test.f = _f;
                            test.h = test.f + test.g;
                            test.parent = node;
                        }
                    }
                    else {
                        ccount++;
                        test.visited = true;
                        test.f = _f;
                        test.g = this._findFun(test);
                        test.h = test.f + test.g;
                        test.parent = node;
                        this._arrange.put(test);
                    }
                }
            }
            node = this._arrange.pop();
            if (node == null) {
                return null;
            }
        }
        var reArr = [];
        while (node != this._startNode) {
            reArr.push(node);
            node = node.parent;
        }
        reArr.push(node);
        //	trace("总共循环次数: " + _vistedNum + "实际计算次数: " + acount + "\n" + " 重复访问的网格数: " + bcount + "代价函数调用次数: " + ccount + "\n" + "总耗时: " + utime);
        if (Astart.ProfectPath)
            reArr = Astart.profect(reArr);
        return reArr;
    };
    Astart.profect = function (arr) {
        if (arr == null || arr.length < 3)
            return arr;
        var clean = [];
        var node = arr[0];
        var currentFace = getface(arr[1]);
        var endP;
        var face;
        var test;
        clean.push(node);
        var num;
        var oldTimer = egret.getTimer();
        for (var i = 1; i < arr.length; i++) {
            test = arr[i];
            face = getface(test);
            if (face != currentFace) {
                num++;
                if (endP)
                    clean.push(endP);
                //clean.push(test);
                endP = test;
                currentFace = face;
            }
            else {
                endP = test;
            }
            node = test;
        }
        clean.push(endP);
        //trace("GGGGGGGGGGGGGGGGGGGGGGGGG "+clean.length+"  "+arr.length+"   "+num);
        //trace("use times "+(getTimer()-oldTimer));
        function getface(n) {
            //var result:number=(n.y - node.y) * 10 + (n.x - node.x);
            return (n.y - node.y) * 10 + (n.x - node.x);
        }
        return clean;
    };
    p.euclidian = function (s) {
        var disX = this._endNode.x - s.x;
        var disY = this._endNode.y - s.y;
        return (disX * disX + disY * disY);
    };
    p.diagonal = function (s) {
        var disX = this._endNode.x - s.x;
        var disY = this._endNode.y - s.y;
        if (disX < 0)
            disX *= -1;
        if (disY < 0)
            disY *= -1;
        var min = disX < disY ? disX : disY;
        return min * this.sqrt_2 + (disX + disY - 2 * min);
    };
    p.manhattan = function (s) {
        var disX = this._endNode.x - s.x;
        var disY = this._endNode.y - s.y;
        if (disX < 0)
            disX *= -1;
        if (disY < 0)
            disY *= -1;
        return disX + disY;
    };
    Astart.ProfectPath = false;
    Astart._vistedNum = 0;
    Astart._onlyIdNum = 0;
    return Astart;
}());
egret.registerClass(Astart,'Astart');
//# sourceMappingURL=Astart.js.map