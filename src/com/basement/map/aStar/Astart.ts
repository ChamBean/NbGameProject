class Astart {
	public constructor() {
	}

	private static _instance:Astart;
	public static ProfectPath:Boolean = false;

	public static findPath(grid:MapVo):Array<MapNode> {
			
			if (grid == null || grid.startNode == null || grid.endNode == null) return null;
			
			if (Astart._instance == null) 
				Astart._instance = new Astart();
				
			return Astart._instance.hasPath(grid);
			
		}
		
		private _arrange:Arrange;
		private _findFun:Function;
		private _endNode:MapNode;
		private _startNode:MapNode;
		public static _vistedNum:number = 0;
		private _grid:MapVo;
		private _version:number = 0;
		public static _onlyIdNum:number = 0;
		private  hasPath(grid:MapVo):Array<MapNode> {
			
			Astart._onlyIdNum ++;
			Astart._vistedNum = 0;
			this._arrange = new Arrange();
			this._arrange.key = "h";
		
			this._findFun = this.euclidian;
			
			
			this._startNode= grid.startNode as MapNode;
			this._endNode = grid.endNode as MapNode;
			var node:MapNode = this._startNode;
			node.f = 0; node.g = node.h = 0;
			
			var maxX:number = grid.col-1;
			var maxY:number = grid.row-1;
			var nodes = grid.nodeArray;
			
			var acount:number = 0;
			var bcount:number = 0;
			var ccount:number = 0;
			var vistiteTime:number = Astart._onlyIdNum;
			while (node != this._endNode) {
				
				var startX:number = node.x - 1; var endX:number = node.x + 1;
				var startY:number = node.y - 1; var endY:number = node.y + 1;
				if (startX < 0) startX = 0;
				if (endX > maxX) endX = maxX;
				if (startY < 0) startY = 0;
				if (endY > maxY) endY = maxY;
				
				/*
				trace("x " + node.x +" y " + node.y);
				trace("startx " + startX +" endx " + endX);
				trace("starty " + startY + " endy " + endY)
				trace("maxX " + maxX +" maxy " + maxY);
				 */
				
				for (var i:number = startX; i <= endX; i++ ) {
					
					for (var s:number = startY; s <= endY; s++ ) {
						Astart._vistedNum++;
						var test:MapNode = nodes[s][i] as MapNode;
						if(test.visitTime != vistiteTime)
						{//初始化MapNode
							test.visited = false;
							test.visitTime = vistiteTime;
						}
						if (test == null || !test.walkAble || test == node) continue;
						
						var four:Boolean = !(test.x == node.x || test.y == node.y)
						if (four) {
							var ynode:MapNode = nodes[test.y][node.x];
							var xnode:MapNode = nodes[node.y][test.x];
							if (ynode.walkAble==false&& xnode.walkAble==false) continue;
						}
						//acount++;
						var cost:number = four?1.4:1.0;
						
						var _f:number = node.f + cost;
						if (test.visited) {
							bcount++;
							if (test.f > _f) {
								test.f =_f;
								test.h = test.f + test.g;
								test.parent = node;
							}
							
						}else {
							ccount++;
							test.visited = true;
							test.f =_f;
							test.g = this._findFun(test);
							test.h = test.f + test.g;
							test.parent = node;
							this._arrange.put(test);
							//_visited.push(test);
						}
					}
				}

				node = this._arrange.pop() as MapNode;
			
				if (node == null)
				{
					return null;
				}
				
			}
			
			
			var reArr:Array<MapNode> = [];
			while ( node!=this._startNode) {
				reArr.push(node);
				node = node.parent as MapNode;
			}
			reArr.push(node);
			
		//	trace("总共循环次数: " + _vistedNum + "实际计算次数: " + acount + "\n" + " 重复访问的网格数: " + bcount + "代价函数调用次数: " + ccount + "\n" + "总耗时: " + utime);
			if (Astart.ProfectPath) reArr = Astart.profect(reArr);
			return reArr;

		}
		public static profect(arr:Array<MapNode>):Array<MapNode> {
			
			if (arr == null || arr.length < 3) return arr;
			var clean:Array<MapNode> = [];
			var node:MapNode = arr[0];
			var currentFace:number = getface(arr[1]);
			var endP:MapNode;
			var face:number;
			var test:MapNode;
			clean.push(node);
			var num:number;
			var oldTimer:number = egret.getTimer();
			for (var i:number = 1; i < arr.length; i++ ) {
				test = arr[i];
				face = getface(test);
				if (face != currentFace) {
					num++;
					if (endP) clean.push(endP);
					//clean.push(test);
					endP = test;
					currentFace = face;
				}else {
					endP = test;
					
				}
				node = test;
			}
			clean.push(endP);
			//trace("GGGGGGGGGGGGGGGGGGGGGGGGG "+clean.length+"  "+arr.length+"   "+num);
			//trace("use times "+(getTimer()-oldTimer));
			function getface(n:MapNode):number {
				//var result:number=(n.y - node.y) * 10 + (n.x - node.x);
				return (n.y - node.y) * 10 + (n.x - node.x);
			}
			return clean;
		}

		private sqrt_2:number = Math.SQRT2;
		private  euclidian(s:MapNode):number {
			
			var disX:number = this._endNode.x- s.x;
			var disY:number = this._endNode.y - s.y;
			return (disX * disX + disY * disY);
			
		}
		private  diagonal(s:MapNode):number {
			
			var disX:number = this._endNode.x - s.x;
			var disY:number = this._endNode.y - s.y;
			if (disX < 0) disX *= -1;
			if (disY < 0) disY *= -1;
			var min:number = disX < disY?disX:disY;
			return  min * this.sqrt_2 + (disX+disY - 2*min);
			
		}
		private   manhattan (s:MapNode):number {
			
			var disX:number = this._endNode.x - s.x;
			var disY:number = this._endNode.y - s.y;
			if (disX < 0) disX *= -1;
			if (disY < 0) disY *= -1;
			return disX + disY;
		}
}