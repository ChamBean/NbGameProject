var LayerManager = (function () {
    function LayerManager() {
        this.sceneLayer = new egret.Sprite();
    }
    var d = __define,c=LayerManager,p=c.prototype;
    d(LayerManager, "ins"
        ,function () {
            if (LayerManager._ins == null)
                LayerManager._ins = new LayerManager();
            return LayerManager._ins;
        }
    );
    p.initLayer = function (_container) {
        this.container = _container;
        _container.addChild(this.sceneLayer);
    };
    return LayerManager;
}());
egret.registerClass(LayerManager,'LayerManager');
//# sourceMappingURL=LayerManager.js.map