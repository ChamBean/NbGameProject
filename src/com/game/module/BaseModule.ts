class BaseModule {
	public constructor() {
	}

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
	public get moduleName():String
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
	
	protected dispatch(param1:String, param2:any = null) : void
	{
	}
	
	protected addModuleListener(param1:String, param2:Function) : void
	{
	}
	
	protected removeModuleListener(param1:String, param2:Function) : void
	{
	}
	
	public dispose() : void
	{
		return;
	}
}