class MapModule extends BaseModule{
	private _mapView:MapViewMediator;
	private _sceneManager:SceneManager = null;
	public constructor() {
		super();
		
	}

	public startup():void
	{
		this._sceneManager = SceneManager.ins;
		this._mapView = new MapViewMediator(App.ins.layer.sceneLayer);
		this._sceneManager.mapViewMediator = this._mapView;
		this.initListeners();
		// 
	}

	protected initListeners():void{
		this.addModuleListener(EventName.CREATE_ROLE_SUCCESS,this.onCreateRoleHandler);
	}

	private onCreateRoleHandler(e:egret.Event):void
	{
		console.log(this);
		this._sceneManager.createMyRole(e.data);
		this._sceneManager.initMap();
	}

	/**
	 * 模块名称
	 * @return 
	 */		
	public get moduleName():string
	{
		return "地图模块";
	}
}