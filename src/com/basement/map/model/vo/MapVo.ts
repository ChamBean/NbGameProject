class MapVo {
	public constructor() {
	}

	public mapId:					number;//地图编号(唯一)
	public previewImageUrl:		string;//预览图http地址
	public tileArray:				Array<any>;//切片名称数组(真实http的图片地址),请按图片位置组织为二维数据
	public mapWidth:				number = 0;//地图宽
	public mapHeight:				number = 0;//地图高
	public nodeWidth:				number;//地图单元格宽度
	public nodeHeight:				number;//地图单元格高度
	public tileWidth:				number;//地图切片宽度
	public tileHeight:				number;//地图切片高度
	public nodeArray:				Array<any> ;	//可行走数据
	public row:					number = 0 ;//行
	public col:					number = 0 ;//列
	public doors:					Array<any>;//地图传送点
	public version:				number = 0;//版本号
	public mapEffectList:			Array<any>;//地图特效
	
	// public startNode:Node;
	// public endNode:Node;

	public dispose():void
	{
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
	}
		
		public nodesRest():void {
//			
//			for each(var a:Array in nodeArray) {
//				for each(var n:Node in a) {
//					if (n.visited) n.visited = false;
//				}
//			}
		}
		
		/**
		 * 通过实际坐标点, 获得格子  
		 * @param px 坐标点x
		 * @param py 坐标点y
		 * @return 
		 * 
		 */
		public getNodeByXY(px:number, py:number):Node
		{
			var x:number = px / this.nodeWidth;
			var y:number = py / this.nodeHeight;
			return  this.getNode(x,y);
		}
		
		public getNode(px:number,py:number):Node
		{
			if(py >= 0 && px >= 0 && py < this.row && px < this.col)
			{
				return this.nodeArray[py][px] as Node;
			}
			else
			{
				return null;
			}
		}
		
		/**
		 * 坐标点转化 地图格子点转实际坐标点
		 * @param node
		 * @param p
		 * @return 
		 */		
		public static transNodePoint(node:Node,p:egret.Point = null):egret.Point
		{
			if(p == null)
			{
				p = new egret.Point(0,0);
			}
			// p.x = (node.x + 0.5) * MapConfig.MAP_NODE_WIDTH;
			// p.y = (node.y + 0.5) * MapConfig.MAP_NODE_HEIGHT;
			return p;
		}
		
		/**
		 * 获取地图格子中心点
		 * @param nodex
		 * @param nodey
		 * @return 
		 */		
		public static getCenterPoint(nodex:number,nodey:number):egret.Point
		{
			var p:egret.Point = new egret.Point();
			p.x = (nodex + 0.5) * MapConfig.MAP_NODE_WIDTH;
			p.y = (nodey + 0.5) * MapConfig.MAP_NODE_HEIGHT;
			return p;
		}
		
		
		/**
		 * 获取实际像素点坐标
		 * @param px  x像素偏移
		 * @param py
		 * @return 
		 */		
		public static getPoint(node:Node,px:number = 0,py:number = 0):egret.Point
		{
			var	point:egret.Point = new egret.Point;
			// point.setTo(node.x*MapConfig.MAP_NODE_WIDTH + px, node.y*MapConfig.MAP_NODE_HEIGHT + py);
			return point;
		}
}