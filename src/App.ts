class App {
	public constructor() {
	}
	private static _ins:App;
	public stage:egret.Stage;
	public layer:LayerManager;
	public init(stage:egret.Stage):void{
		this.stage = stage;
		LoopManager.init(stage);
		this.layer = new LayerManager();
	}

	public static get ins():App
	{
		if(App._ins == null)
			App._ins = new App();
		return App._ins;
	}
}