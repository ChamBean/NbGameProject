/**
 * 模块管理器
 * @author Bean
 * @since 2016.12.04
 */
class ModuleManager {

	public constructor() {
		
	}

	public startModule():void{
		var arr:Array<BaseModule> = this.getModules();
		for(var i:number = 0; i < arr.length; i++)
			{
				var module:BaseModule = arr[i] as BaseModule;
				module.startup();
			}
	}

	private getModules():Array<BaseModule>
	{
		return [
			new MainModule(),
			new MapModule()

		];

	}
}