/**
 * 场景视图层级管理中心
 * @author Bean
 * @since 2016.12.04
 */
class MapViewMediator {
	private _parent:egret.Sprite;
	private _map:MapContainer;
	private _mapBackLayer:MapBackGroundLayer = null;
	private _mapAvatarLayer:MapAvatarLayer = null;
	private _mapEffectLayer:MapEffectLayer = null;
	public constructor(parent:egret.Sprite) {
		this._parent = parent;
		this.init();
	}

	private init():void{
		this._map = new MapContainer();
		this._parent.addChild(this._map);

		this._mapBackLayer = new MapBackGroundLayer();
		this._mapEffectLayer = new MapEffectLayer();
		this._mapAvatarLayer = new MapAvatarLayer();
		
		this._map.addChild(this._mapBackLayer);
		this._map.addChild(this._mapEffectLayer);
		this._map.addChild(this._mapAvatarLayer);
		this._mapAvatarLayer.init();

		this._map.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onMapClick,this)

	}

	private onMapClick(e:egret.TouchEvent):void{
		SceneManager.ins.clickMap(e.localX,e.localY);
	}

	public get map():MapContainer{
		return this._map;
	}
	public get backLayer():MapBackGroundLayer{
		return this._mapBackLayer;
	}
	public get effectLayer():MapEffectLayer{
		return this._mapEffectLayer;
	}
	public get avatarLayer():MapAvatarLayer{
		return this._mapAvatarLayer;
	}
	
	public createMyRole(data:PlayerInfoData):Player{
		let role:Player = new Player();
		role.isSelf = true;
		data.dir = 4//Math.random() * 7);
		data.dress = 0;
		data.level = Math.floor(Math.random() * 80 + 10);
		var index:number = Math.floor(Math.random()*3.9) ;
		var obj:any = RoleState.STATES;
		var state:string = obj[index];
		data.state = RoleState.ROLE_STAND;
		data.nodeX = Math.floor(Math.random() * 22) + 22;
		data.nodeY = Math.floor(Math.random() * 22) + 22;
		role.setRoleData(data);
		return role;
	}

	public createOtherPlayer():Player{
		let role:Player = new Player();
		var data:PlayerInfoData = new PlayerInfoData();
		role.isSelf = false;
		data.dir = 4;
		data.sex = Math.floor(Math.random() * 1);
		data.dress = Math.floor(Math.random() * 3);
		data.level = Math.floor(Math.random() * 80 + 10);
		var index:number = Math.floor(Math.random()*3.9) ;
		var obj:any = RoleState.STATES;
		var state:string = obj[index];
		data.state = state;
		data.nodeX = Math.floor(Math.random() * 43) + 4;
		data.nodeY = Math.floor(Math.random() * 43) + 4;
		role.setRoleData(data);
		role.x = data.nodeX * MapConfig.MAP_NODE_WIDTH + MapConfig.MAP_NODE_WIDTH * 0.5;
		role.y = data.nodeY * MapConfig.MAP_NODE_HEIGHT + MapConfig.MAP_NODE_HEIGHT * 0.5;
		return role;
	}

	public clear():void
	{
		this._mapBackLayer.clear();
		this._mapEffectLayer.clear();
		this._mapAvatarLayer.clear();
	}
}