class ControllerManager {

	public constructor() {
		
	}

	public startModule():void{
		var arr:Array<BaseController> = this.getControls();
		for(var i:number = 0; i < arr.length; i++)
			{
				var module:BaseController = arr[i] as BaseController;
				module.startup();
			}
	}

	private getControls():Array<BaseController>
	{
		return [
			new MapController()

		];

	}
}