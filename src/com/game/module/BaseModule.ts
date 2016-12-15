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
	
	public openView():void{
		
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
		net.SocketDispatcher.add(cmd,callFun);
	}
	
	protected removeSocketListener(cmd:number, callFun:Function) : void
	{
		net.SocketDispatcher.remove(cmd,callFun);
	}
	
	protected sendSocketMessage(vo:any) : void
	{
		App.ins.socket.send(vo);
	}
	
	protected dispatch(param1:string, param2:any = null) : void
	{
		this._dispatch.dispatchEventWith(param1,param2);
	}
	
	protected addModuleListener(param1:string, param2:Function) : void
	{
		this._dispatch.addEventListener(param1,param2,this);
	}
	
	protected removeModuleListener(param1:string, param2:Function) : void
	{
		this._dispatch.removeEventListener(param1,param2,this);
	}
	
	public dispose() : void
	{
		return;
	}
}