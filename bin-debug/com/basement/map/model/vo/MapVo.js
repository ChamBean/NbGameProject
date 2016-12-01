var MapVo = (function () {
    function MapVo() {
        this.mapWidth = 0; //地图宽
        this.mapHeight = 0; //地图高
        this.row = 0; //行
        this.col = 0; //列
        this.version = 0; //版本号
    }
    var d = __define,c=MapVo,p=c.prototype;
    // public startNode:Node;
    // public endNode:Node;
    p.dispose = function () {
        // if (this.nodeArray != null) 
        // {
        // 	for each(var a:Array in this.nodeArray) 
        // 	{
        // 		for each(var n:Node in a) 
        // 		{
        // 			n.dispose();
        // 		}
        // 	}
        // 	nodeArray = null;
        // }
    };
    p.nodesRest = function () {
        //			
        //			for each(var a:Array in nodeArray) {
        //				for each(var n:Node in a) {
        //					if (n.visited) n.visited = false;
        //				}
        //			}
    };
    /**
     * 通过实际坐标点, 获得格子
     * @param px 坐标点x
     * @param py 坐标点y
     * @return
     *
     */
    p.getNodeByXY = function (px, py) {
        var x = px / this.nodeWidth;
        var y = py / this.nodeHeight;
        return this.getNode(x, y);
    };
    p.getNode = function (px, py) {
        if (py >= 0 && px >= 0 && py < this.row && px < this.col) {
            return this.nodeArray[py][px];
        }
        else {
            return null;
        }
    };
    /**
     * 坐标点转化 地图格子点转实际坐标点
     * @param node
     * @param p
     * @return
     */
    MapVo.transNodePoint = function (node, p) {
        if (p === void 0) { p = null; }
        if (p == null) {
            p = new egret.Point(0, 0);
        }
        // p.x = (node.x + 0.5) * MapConfig.MAP_NODE_WIDTH;
        // p.y = (node.y + 0.5) * MapConfig.MAP_NODE_HEIGHT;
        return p;
    };
    /**
     * 获取地图格子中心点
     * @param nodex
     * @param nodey
     * @return
     */
    MapVo.getCenterPoint = function (nodex, nodey) {
        var p = new egret.Point();
        p.x = (nodex + 0.5) * MapConfig.MAP_NODE_WIDTH;
        p.y = (nodey + 0.5) * MapConfig.MAP_NODE_HEIGHT;
        return p;
    };
    /**
     * 获取实际像素点坐标
     * @param px  x像素偏移
     * @param py
     * @return
     */
    MapVo.getPoint = function (node, px, py) {
        if (px === void 0) { px = 0; }
        if (py === void 0) { py = 0; }
        var point = new egret.Point;
        // point.setTo(node.x*MapConfig.MAP_NODE_WIDTH + px, node.y*MapConfig.MAP_NODE_HEIGHT + py);
        return point;
    };
    return MapVo;
}());
egret.registerClass(MapVo,'MapVo');
//# sourceMappingURL=MapVo.js.map