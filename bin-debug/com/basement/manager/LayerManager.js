var LayerManager = (function () {
    function LayerManager() {
        this.sceneLayer = new egret.Sprite();
        this.mainLayer = new egret.Sprite();
        this.uiLayer = new egret.Sprite();
        this.popAlertLayer = new egret.Sprite();
        this.topLayer = new egret.Sprite();
    }
    var d = __define,c=LayerManager,p=c.prototype;
    p.initLayer = function (_container) {
        this.container = _container;
        _container.addChild(this.sceneLayer);
        _container.addChild(this.mainLayer);
        _container.addChild(this.uiLayer);
        _container.addChild(this.popAlertLayer);
        _container.addChild(this.topLayer);
    };
    return LayerManager;
}());
egret.registerClass(LayerManager,'LayerManager');
//# sourceMappingURL=LayerManager.js.map