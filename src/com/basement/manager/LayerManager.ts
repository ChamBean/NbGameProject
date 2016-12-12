/**
 * 场景层级管理
 * @author Bean
 * @since 2016.12.04
 */
class LayerManager {
	public container:egret.DisplayObjectContainer;
	/**地图场景层*/
	public sceneLayer:egret.Sprite;
	/**地图界面层之上 UI层之下*/
	public mainLayer:egret.Sprite;
	/**模块入口图标层*/
	public moduleLayer:egret.Sprite;
	/**各模块弹出面板层*/
	public windowLayer:egret.Sprite;
	/**弹出框所在层级*/
	public popAlertLayer:egret.Sprite;
	/**提示消息层 系统公告 系统消息等等*/
	public msgLayer:egret.Sprite;
	/**最顶层 不可修改*/
	public topLayer:egret.Sprite;
	public constructor() {
		this.sceneLayer = new egret.Sprite();
		this.mainLayer = new egret.Sprite();
		this.moduleLayer = new egret.Sprite();
		this.windowLayer = new egret.Sprite();
		this.popAlertLayer = new egret.Sprite();
		this.msgLayer = new egret.Sprite();
		this.topLayer = new egret.Sprite();
	}

	public initLayer(_container:egret.DisplayObjectContainer):void
	{
		this.container = _container;
		_container.addChild(this.sceneLayer);
		_container.addChild(this.mainLayer);
		_container.addChild(this.moduleLayer);
		_container.addChild(this.windowLayer);
		_container.addChild(this.popAlertLayer);
		_container.addChild(this.msgLayer);
		_container.addChild(this.topLayer);
		UiManager.init();
	}
}