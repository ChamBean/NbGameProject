class LayerManager {
	private static _ins:LayerManager;

	public container:egret.DisplayObjectContainer;
	/**地图场景层*/
	public sceneLayer:egret.Sprite;

	public static get ins():LayerManager
	{
		if(LayerManager._ins == null)
			LayerManager._ins = new LayerManager();
		return LayerManager._ins;
	}

	public constructor() {
		this.sceneLayer = new egret.Sprite();
	}

	public initLayer(_container:egret.DisplayObjectContainer):void
	{
		this.container = _container;
		_container.addChild(this.sceneLayer);
		

	}
}