/**
 * 主界面数据收发层
 * @author Bean
 * @since 2016.12.04
 */
class MainModule extends BaseModule{

	private _createRole:CreateRoleView = null;
	private _mainView:MainView = null;
	public constructor() {
		super();
	}

	/**
	 * 启动模块
	 */		
	public startup():void
	{
		if(this._createRole == null){
			this._createRole = new CreateRoleView(this);
			this._createRole.isPop = true;
		}
		this.initListeners();
	}
	
	protected initListeners():void{
		
	}

	public createRole(roleData:PlayerInfoData):void{
		this.dispatch(EventName.CREATE_ROLE_SUCCESS,roleData);
		this._createRole.dispos();
		this._createRole = null;
		this.initMainView(roleData);
	}

	private initMainView(roleData:PlayerInfoData):void{
		if(this._mainView == null){
			this._mainView = new MainView(this);
			App.ins.layer.mainLayer.addChild(this._mainView);
			this._mainView.setRoleData(roleData);
		}

	}

	/**
	 * 模块名称
	 * @return 
	 */		
	public get moduleName():string
	{
		return "主界面";
	}
}