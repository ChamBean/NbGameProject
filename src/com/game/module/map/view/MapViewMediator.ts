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

	}
	
}