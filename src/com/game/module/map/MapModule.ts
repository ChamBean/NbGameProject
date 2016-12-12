/**
 * 地图模块启动中心
 * @author Bean
 * @since 2016.12.04
 */
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
		this.addModuleListener(EventName.OPEN_MAP_NODE,this.onOpenMapNode);
	}

	private onOpenMapNode(e:egret.Event):void{
		this._mapView.backLayer.drawNodes(this._sceneManager.mapData);
	}

	private onCreateRoleHandler(e:egret.Event):void
	{
		this._sceneManager.createMyRole(e.data);
		this._sceneManager.initMap();
	}

	public openView():void{
		
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