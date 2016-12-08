class MainModule extends BaseModule{

	private _createRole:CreateRoleView = null;
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
	}
	
	public createRole(roleData:BaseRoleData):void{
		GameDispatcher.ins.dispatchEventWith(EventName.CREATE_ROLE_SUCCESS,false,roleData);
		this._createRole.dispos();
		this._createRole = null;
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