/**
 * 场景管理器
 * @author Bean
 * @since 2016.12.04
 */
class SceneManager {
	private static _ins:SceneManager = null;

	public mapData:MapVo;

	public mapViewMediator:MapViewMediator = null;

	private _myRole:Player = null;
	/**存储场景上所有角色 */
	private _roleMap:any;
	private _loadProxy:MapLoadProxy = null;
	private _sceneProxy:MapSceneProxy = null;

	public myRoleData:BaseRoleData = null;

	private _isMapClick:boolean = false;

	private _transLine:AcorrsLineGrid;

	private _dispatcher:GameDispatcher = null;
	public constructor() {
		this._roleMap = {};
		this._loadProxy = new MapLoadProxy();
		this._sceneProxy = new MapSceneProxy();
		this._dispatcher = GameDispatcher.ins;
		this._dispatcher.addEventListener(SceneEventName.MY_ROLE_CHANGE_POSITION,this.onChangeMyRolePoint,this);
	}

	public static get ins():SceneManager
	{
		if(SceneManager._ins == null)
			SceneManager._ins = new SceneManager();
		return SceneManager._ins;
	}

	public createMyRole(roleData:BaseRoleData):void
	{
		this._myRole = this.mapViewMediator.createMyRole(roleData);
		this.myRoleData = this._myRole.roleData;
	}

	public initMap():void{
		this.clear();
		LoopManager.addToFrame('sceneManager',this.onLoopHandler);
		this._loadProxy.setBgView(this.mapViewMediator.backLayer);
		this._loadProxy.setMapId(2);
		this._loadProxy.addEventListener(SceneEventName.GAMEMAP_DATA_LOAD_COMPLETE,this.mapLoadComplete,this);
	}

	public get myRole():Player{
		return this._myRole;
	}

	private mapLoadComplete(e:egret.Event):void{
		this.mapData = e.data;
		this.mapViewMediator.avatarLayer.addChild(this.myRole);
		if(this._transLine == null)
		{
			this._transLine = new AcorrsLineGrid(e.data);
		}
		this._transLine.reset(e.data);
		this.resetMapView();
	}

	private resetMapView():void
	{
		this._isMapClick = true;
		var roleX:number = this.myRoleData.nodeX * MapConfig.MAP_NODE_WIDTH * 0.5;
		var roleY:number = this.myRoleData.nodeY * MapConfig.MAP_NODE_HEIGHT * 0.5;
		this._myRole.x = roleX;
		this._myRole.y = roleY;
		egret.log('我的角色当前的坐标是' + roleX + '    ' + roleY);
		this._sceneProxy.upMapAreaRect(this.mapData.mapWidth,this.mapData.mapHeight);
		this._sceneProxy.upSceneRect(App.ins.stage.stageWidth,App.ins.stage.stageHeight);
		this._sceneProxy.setRolePoint(roleX,roleY);
		this._sceneProxy.moveScene();
		this.mapViewMediator.map.updataPosition(this._sceneProxy.sceneRect.x,this._sceneProxy.sceneRect.y);
		egret.log('地图坐标是' + this.mapViewMediator.map.x + '    ' + this.mapViewMediator.map.y);
	}

	private onChangeMyRolePoint(e:egret.Event):void
	{
		var roleX:number = this._myRole.x;
		var roleY:number = this._myRole.y;
		this._sceneProxy.setRolePoint(roleX,roleY,true);
		this.mapViewMediator.map.updataPosition(this._sceneProxy.sceneRect.x,this._sceneProxy.sceneRect.y);
	}

	/**
	 * 点击地图
	 * 
	 */
	public ClickMap(clickX:number,clickY:number):void
	{
		if(this._myRole == null)
			return;
		this._isMapClick = true;
		var list:Array<egret.Point> = this.searchAstar(clickX,clickY,this.myRoleData.nodeX,this.myRoleData.nodeY);
		if(list && list.length > 0)
		{
			//设置鼠标点击样式
			this._myRole.startMove(list);
		}
	}
	
	private onLoopHandler():void{
		var currentFrame:number = LoopManager.currentFrame;
		//检测是否需要加载切片
		if(currentFrame % 5 == 0)
		{
			SceneManager.ins.checkMapClips();
			if(currentFrame % 6 == 0)
			{//60帧， 每隔30帧检测一次排序
				SceneManager.ins.mapViewMediator.avatarLayer.doSortAvatar();
			}
		}
	}

	/**
	 * 检测是否需要加载切片
	 */		
	private checkMapClips():void
	{
		if(this._isMapClick){
			this._isMapClick = false;
			upDataClips();
		}
		if(this.mapData == null || !this._myRole.isMoving)
		{
			return;
		}
		upDataClips();
		function upDataClips():void{
			var clips:Array<any> = SceneManager.ins._sceneProxy.clips;
			SceneManager.ins._loadProxy.loadClips(clips);
			SceneManager.ins.mapViewMediator.backLayer.clearClips(SceneManager.ins._sceneProxy.sceneRect.x,SceneManager.ins._sceneProxy.sceneRect.y);
		}
	}

	/**
	 * A*寻路
	 * @return 
	 */		
	private searchAstar(px:number,py:number,$startX:number,$startY:number,shift:number = 0):Array<egret.Point>
	{
		var addx:number = px % MapConfig.MAP_NODE_WIDTH;
		var addy:number = py % MapConfig.MAP_NODE_HEIGHT;
		var end:MapNode = this.mapData.getNodeByXY(px, py);
		var start:MapNode = this.mapData.getNode($startX,$startY);
		var path:Array<egret.Point> = [];
		
		if(start == null || end == null)//当无起始和结束寻路的话, 就返回
			return null;
		if(start == end)
		{
			path.push(this.getPoint(addx,addy,end));
			return path;
		}
		end = this.getEnd(end);
		if(!end.walkAble)
		{//终点是不可行走点
			var chx:number = 0;
			var chy:number = 0;
			while(end && !end.walkAble)
			{
				if(end == start)
				{
					break;
				}
				chx = 0;
				chy = 0;
				if (start.x > end.x) 
				{
					chx = 1;
				}else if (start.x < end.x) 
				{
					chx = -1;
				}
				if (start.y > end.y) 
				{
					chy = 1;
				}else if (start.y < end.y) 
				{
					chy = -1;
				}
				end = this.mapData.getNode(end.x + chx,end.y + chy);
			}
		}
		this.mapData.startNode = start;
		this.mapData.endNode = end;
		// this.mapData.nodesRest();
		var list:Array<MapNode> = Astart.findPath(this.mapData);
		if (list == null || list.length <= 0) 
		{
			return null;
		}
		var node:MapNode;
		list = Astart.profect(list);//缩减节点个数
		list = this._transLine.getPsnode(list);//取直线
		list.pop();
		for (var i:number = 0 ,len:number = list.length; i < len; i++) 
		{
			node = list[i];
			if(node == end)
			{
				path.push(this.getPoint(addx,addy,node));
			}else
			{
				path.push(this.getPoint(0,0,node));
			}
		}
		return path;
	}


	/**
	 * 获取实际像素点坐标
	 * @param px  x像素偏移
	 * @param py
	 * @return 
	 */		
	private getPoint(px:number,py:number,node:MapNode):egret.Point
	{
		var _point:egret.Point;
		if(_point == null)
		{
			_point = new egret.Point;
		}
		_point.setTo(node.x*MapConfig.MAP_NODE_WIDTH + px,node.y*MapConfig.MAP_NODE_HEIGHT + py);
		return _point;
	}

	/**
	 * 获取当前node 
	 * @param $node
	 * @return 
	 */		
	private getEnd($node:MapNode):MapNode
	{
		if($node.walkAble)
		{
			return $node;
		}
		var node:MapNode = null;
		var result:MapNode = null;
		var i:number = -1;
		var j:number = -1;
		for(i = -1; i < 2 ; i ++)
		{
			for(j = -1 ; j < 2 ; j ++)
			{
				node = this.mapData.getNode($node.x + i,$node.y + j);
				if(node && node.walkAble)
				{
					result = node;
					break;
				}
			}
		}
		return result||$node ;
	}

	public removeRoleByid(id:number):void{
		var role:BaseRole = this._roleMap[id];
		if(role){
			role.remove();
			delete this._roleMap[id];
		}

	}

	private clear():void
	{
		this.mapViewMediator.clear();
		this._loadProxy.clear();
		for(var id in this._roleMap){
			var role:BaseRole = this._roleMap[id];
			role.remove();
		}
		this._roleMap = {};
	}
}