class AcorrsLineGrid {
	private _mapvo:MapVo;
	private _astartNodes:Array<MapNode>;
	public constructor(vo:MapVo,ns:Array<MapNode>=null) {
		this._mapvo = vo;
			
		this._astartNodes = ns;
		this.nodes = this._mapvo.nodeArray;
		this.nodeWidth = this._mapvo.nodeWidth;
		this.nodeHeight = this._mapvo.nodeHeight;
		this.arrange = new Arrange();
		this.arrange.key = "f";
	}
	public reset(vo:MapVo):void
	{
		this._mapvo = vo;
		
		this.nodes = this._mapvo.nodeArray;
		this.nodeWidth = this._mapvo.nodeWidth;
		this.nodeHeight = this._mapvo.nodeHeight;
	}
	
	public getPsnode(arr:Array<MapNode>):Array<MapNode> {
		
		if (arr == null) arr = this._astartNodes;
		if (arr == null|| this._mapvo==null) throw new Error("没有合适节点可供计算：in AcorrsLineGrid");
		var len:number = arr.length;
		if (len<3) return arr;
		var psArr:Array<MapNode> = [];
		var node:MapNode = arr[0] as MapNode;
		var endNode:MapNode = arr[len-1]as MapNode;
		var index:number = 0;
		psArr.push(node);
		while (node != endNode) {
			
			for (var i:number = len-1; i > index; i-- ) {
				var test:MapNode = arr[i] as MapNode;
				var neigbor:boolean = (i - index) == 1 ? true:false;
				if (neigbor || this.isCorrsed(node, test)) {
					//trace("MapNode " + i+"  "+(neigbor));
					node = test;
					index = i;
					psArr.push(test);
					break;
				}
			}
		}
		
		return psArr;
	}
	

	private nodes:Array<Array<MapNode>>;
	private nodeWidth:number;
	private nodeHeight:number;
	private arrange:Arrange;
	
	//---直线方程系数
	private _k:number;
	private _b:number;
	private _isPanX:boolean = false;
	private _panXvalue:number;
	private _isPanY:boolean = false;
	private _panYvalue:number;

	private  isCorrsed(s:MapNode, e:MapNode):boolean {
		//_grid.nodesRest();
		if (!s || !e) return false;
		//var ep:Point = new Point(e.x*nodeWidth+0.2,e.y*nodeHeight+0.2);
		this._isPanX = s.y == e.y ;
		this._isPanY = s.x == e.x;
		if (this._isPanX || this._isPanY) {
			if (this._isPanX) this._panXvalue = s.y * this.nodeHeight ;
			if (this._isPanY) this._panYvalue = s.x * this.nodeWidth;
		}else {
			this._k = ((e.y - s.y) * this.nodeHeight) / ((e.x - s.x) * this.nodeWidth);
			this._b = (e.y + 0.5) * this.nodeHeight - (((e.x + 0.5) * this.nodeWidth) * this._k);
		}
		
		
		var minx:number = Math.min(e.x, s.x);
		var maxx:number = Math.max(e.x, s.x);
		var miny:number = Math.min(s.y, e.y);
		var maxy:number = Math.max(s.y, e.y);
		
		var startPx:number = (minx+0.5) * this.nodeWidth;
		var endPx:number = (maxx+0.5) * this.nodeWidth;
		var startPy:number = (miny+0.5) * this.nodeHeight;
		var endPy:number = (maxy + 0.5) * this.nodeHeight;
		var node:MapNode;
		
		//x轴采样:
		var px:number; var py:number;
		var acnode:MapNode;
		node = s.x < e.x?s:e;
		var i:number;
		for (i = minx; i <= maxx; i++ ) {
			px = i * this.nodeWidth + 1;
			if (px>=startPx && px<= endPx)
			{
				py = getPy(px,this);
				//trace("x1 " + px + " " + py);
				acnode = this._mapvo.getNodeByXY(px, py);
				if (!acnode.walkAble) return false;
				if (checkCorner(acnode,this)) return false;
				node = acnode;
			}
			
			px = (i + 1) * this.nodeWidth - 1;
			if (px >= startPx && px <= endPx)
			{
				py = getPy(px,this);
				//trace("x2 " + px + " " + py);
				acnode = this._mapvo.getNodeByXY(px, py);
				if (!acnode.walkAble) return false;
				if (checkCorner(acnode,this)) return false;
				node = acnode;
			}
			
		}
		
		//--y轴采样:
		//if (_k == 0) return true;
		acnode = s.y < e.y?s:e;
		for (i = miny; i <= maxy; i++ ) {
			py = i * this.nodeHeight + 1;
			if (py >= startPy && py <= endPy) {
				px = getPx(py,this);
				//trace("y1 " + px + " " + py);
				acnode = this._mapvo.getNodeByXY(px, py);
				if (!acnode.walkAble) return false;
				if (checkCorner(acnode,this)) return false;
				node = acnode;
			}
			
			py = (i + 1) * this.nodeHeight -1;
			if (py >= startPy && py <= endPy) {
				px = getPx(py,this);
				//trace("y2 " + px + " " + py);
				acnode = this._mapvo.getNodeByXY(px, py);
				if (!acnode.walkAble) return false;
				if (checkCorner(acnode,this)) return false;
				node = acnode;
			}
			
		}
		
		return true;
		
		
		function getPx(yy:number,self:AcorrsLineGrid):number {
			
			//if (_isPanX) return _panXvalue;
			if (self._isPanY) return self._panYvalue;
			return (yy - self._b) / self._k;
		}
		function getPy(xx:number,self:AcorrsLineGrid):number {
			if (self._isPanX) return self._panXvalue;
			//if (_isPanY) return _panYvalue;
			return self._k * xx + self._b;
		}
		function checkCorner(n:MapNode,self:AcorrsLineGrid):boolean {
			var face:number = getface(n);
			var c1:MapNode; var c2:MapNode;
			switch(face) {
				case 4:
				c1 = self.nodes[n.y][n.x - 1] as MapNode;
				c2 = self.nodes[n.y - 1][n.x ] as MapNode;
				break;
				case -2:
				c1 = self.nodes[n.y][n.x - 1] as MapNode;
				c2 = self.nodes[n.y +1][n.x ] as MapNode;
				break;
				case -4:
				c1 = self.nodes[n.y][n.x + 1] as MapNode;
				c2 = self.nodes[n.y +1][n.x ] as MapNode;
				break;
				case 2:
				c1 = self.nodes[n.y][n.x + 1] as MapNode;
				c2 = self.nodes[n.y +1][n.x ] as MapNode;
				break;
				default :
				return false;
			}
			if (!c1.walkAble && !c2.walkAble) return true;
			return false;
		}
		function getface(n:MapNode):number {
			var result:number=(n.y - node.y) * 3 + (n.x - node.x);
			return result;
		}
	}
}