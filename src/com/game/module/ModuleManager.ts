/**
 * 模块管理器
 * @author Bean
 * @since 2016.12.04
 */
class ModuleManager {

	public constructor() {
		this.setModules();
	}

	public startModule():void{
		for(var id in this._modules)
		{
			this._modules[id].startup();
		}
	}
	private _modules:any;
	private setModules():void
	{
		this._modules = {};
		this._modules[ModuleIdStatic.GM_MODULE] = new GmModule();
		this._modules[ModuleIdStatic.MAP_MODULE] = new MapModule();
		this._modules[ModuleIdStatic.MAIN_MODULE] = new MainModule();
		this._modules[ModuleIdStatic.CHAT_MODULE] = new ChatModule();
	}

	public openModule(id:number,subid:number=0):void{
		var module:BaseModule = this._modules[id];
		module.openView();
	}
}