class MapController extends BaseController{
	private _mapView:MapViewMediator;
	public constructor() {
		super();
		
	}

	public startup():void
	{
		this._mapView = new MapViewMediator(LayerManager.ins.sceneLayer);
	}
}