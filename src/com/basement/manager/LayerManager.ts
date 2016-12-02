class LayerManager {
	public container:egret.DisplayObjectContainer;
	/**地图场景层*/
	public sceneLayer:egret.Sprite;
	/**地图界面层 UI层之下*/
	public mainLayer:egret.Sprite;
	/**UI层*/
	public uiLayer:egret.Sprite;
	/**弹出框所在层级*/
	public popAlertLayer:egret.Sprite;
	/**最顶层 不可修改*/
	public topLayer:egret.Sprite;
	public constructor() {
		this.sceneLayer = new egret.Sprite();
		this.mainLayer = new egret.Sprite();
		this.uiLayer = new egret.Sprite();
		this.popAlertLayer = new egret.Sprite();
		this.topLayer = new egret.Sprite();
	}

	public initLayer(_container:egret.DisplayObjectContainer):void
	{
		this.container = _container;
		_container.addChild(this.sceneLayer);
		_container.addChild(this.mainLayer);
		_container.addChild(this.uiLayer);
		_container.addChild(this.popAlertLayer);
		_container.addChild(this.topLayer);

	}
}