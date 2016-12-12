/**
 * 模块视图显示隐藏管理中心
 * @author Bean
 * @since 2016.12.04
 */
class UiManager {
	private static _viewContainer:egret.Sprite = null;

	private static _alertContainer:egret.Sprite = null;
	public constructor() {
	}

	private static _viewForMasks:Array<BaseView> = [];

	public static init():void{
		UiManager._viewContainer = App.ins.layer.windowLayer;
		UiManager._alertContainer = App.ins.layer.popAlertLayer;
	}

	public static show(view:BaseView):void{
		if(view.viewType == 1){
			UiManager._viewContainer.addChild(view);
		}
		if(view.viewType == 2 && UiManager._viewForMasks.indexOf(view) == -1){
			UiManager._alertContainer.addChild(view);
			UiManager._viewForMasks.push(view);
			if(UiManager._viewForMasks.length == 1){
				UiManager.drawMask();
			}
		}
		UiManager.setPanelPosition(view);
	}

	public static hide(view:BaseView):void{
		if(view.viewType == 1 && UiManager._viewContainer.contains(view))
			UiManager._viewContainer.removeChild(view);
		if(view.viewType == 2 && UiManager._viewForMasks.indexOf(view) != -1){
			var index:number = UiManager._viewForMasks.indexOf(view);
			UiManager._viewForMasks.splice(index,1);
			if(UiManager._viewForMasks.length < 1){
				UiManager.clearMask();
			}
			if(UiManager._alertContainer.contains(view))
				UiManager._alertContainer.removeChild(view);
		}
	}

	public static setPanelPosition(view:BaseView):void{
		if(view.parent == null)return;
		var stageW:number = App.ins.stage.stageWidth;
		var stageH:number = App.ins.stage.stageHeight;
		view.x = Math.floor((stageW - view.panelW) / 2);
		view.y = Math.floor((stageH - view.panelH) / 2);
	}

	private static drawMask():void{
		UiManager._alertContainer.graphics.clear();
		UiManager._alertContainer.graphics.beginFill(0,0.7);
		UiManager._alertContainer.graphics.drawRect(0,0,App.ins.stage.stageWidth,App.ins.stage.stageHeight);
		UiManager._alertContainer.graphics.endFill();
		UiManager._alertContainer.touchEnabled = true;
	}

	private static clearMask():void{
		UiManager._alertContainer.graphics.clear();
		UiManager._alertContainer.touchEnabled = false;
	}
}