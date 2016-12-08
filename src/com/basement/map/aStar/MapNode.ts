class MapNode {
	public constructor(s:Single) {
		this.walkAble = true;
	}

	//对象池
		private static nodePool:Array<MapNode> = [];
		private static numCount:number = 0;
		
		public x:number;
		public y:number;
		
		public f:number;
		public g:number;
		public h:number;
		
//		public expense:number;
//		public nodeMutipler:number;
		public walkAble:boolean ;
		
		public parent:MapNode;
		public visited:boolean = false;
		
		public visitTime:number = 0;
		
		public isMask:boolean = false;
		public isSwim:boolean = false;
		public isSafe:boolean = true;
		
		public reset():void 
		{
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
		}
		
		
		public static getNode():MapNode
		{
			var node:MapNode;
			if(MapNode.nodePool.length==0)
			{
				node = new MapNode(new Single());
				MapNode.numCount++;
			}
			else
			{
				node = MapNode.nodePool.shift();
			}
			return node;
		}
		
		public dispose():void
		{
			//释放Node对象,将其放入对象池
			this.reset();
//			if(nodePool.indexOf(this)<0)//干掉这个检测，当执行10000次的时候非常浪费时间
			MapNode.nodePool.push(this);
		}
}
class Single{}