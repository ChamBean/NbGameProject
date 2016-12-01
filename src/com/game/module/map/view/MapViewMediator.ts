class MapViewMediator {
	private _parent:egret.DisplayObjectContainer;
	private _map:MapContainer;
	private _mapBackLayer:MapBackGroundLayer = null;
	private _mapAvatarLayer:MapAvatarLayer = null;
	private _mapEffectLayer:MapEffectLayer = null;
	public constructor(parent:egret.DisplayObjectContainer) {
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
	}

	
}