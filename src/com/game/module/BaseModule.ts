class BaseModule {
	public constructor() {
		this._dispatch = GameDispatcher.ins;
	}
	private _dispatch:GameDispatcher = null;
	/**
	 * 启动模块
	 */		
	public startup():void
	{
		throw new Error("需要被重写");
	}
	
	/**
	 * 模块名称
	 * @return 
	 */		
	public get moduleName():string
	{
		return "未被重写的模块名称";
	}
	
	/**
	 * 注册事件 
	 */		
	protected initListeners():void
	{
		throw new Error("需要被重写");
	}
	
	protected addSocketListener(cmd:number, callFun:Function) : void
	{
	}
	
	protected removeSocketListener(cla:number, callFun:Function) : void
	{
	}
	
	protected sendSocketMessage(vo:any) : void
	{
	}
	
	protected dispatch(param1:string, param2:any = null) : void
	{
		this._dispatch.dispatchEventWith(param1,false,param2);
	}
	
	protected addModuleListener(param1:string, param2:Function) : void
	{
		this._dispatch.addEventListener(param1,param2,this);
	}
	
	protected removeModuleListener(param1:string, param2:Function) : void
	{
	}
	
	public dispose() : void
	{
		return;
	}
}