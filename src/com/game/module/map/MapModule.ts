class MapModule extends BaseModule{
	private _mapView:MapViewMediator;
	public constructor() {
		super();
		
	}

	public startup():void
	{
		this._mapView = new MapViewMediator(App.ins.layer.sceneLayer);
	}
}