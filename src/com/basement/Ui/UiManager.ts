class UiManager {
	private static _container:egret.Sprite = null;
	public constructor() {
	}

	public static init():void{
		UiManager._container = App.ins.layer.windowLayer;
	}

	public static show(view:BaseView):void{
		UiManager._container.addChild(view);
		UiManager.setPanelPosition(view);
	}

	public static hide(view:BaseView):void{
		if(!UiManager._container.contains(view))
			return;
		UiManager._container.removeChild(view);
	}

	public static setPanelPosition(view:BaseView):void{
		if(view.parent == null)return;
		var stageW:number = App.ins.stage.stageWidth;
		var stageH:number = App.ins.stage.stageHeight;
		view.x = Math.floor((stageW - view.panelW) / 2);
		view.y = Math.floor((stageH - view.panelH) / 2);

	}
}