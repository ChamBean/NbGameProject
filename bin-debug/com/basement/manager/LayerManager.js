/**
 * 场景层级管理
 * @author Bean
 * @since 2016.12.04
 */
var LayerManager = (function () {
    function LayerManager() {
        this.sceneLayer = new egret.Sprite();
        this.mainLayer = new egret.Sprite();
        this.moduleIconLayer = new egret.Sprite();
        this.windowLayer = new egret.Sprite();
        this.popAlertLayer = new egret.Sprite();
        this.msgLayer = new egret.Sprite();
        this.topLayer = new egret.Sprite();
    }
    var d = __define,c=LayerManager,p=c.prototype;
    p.initLayer = function (_container) {
        this.container = _container;
        _container.addChild(this.sceneLayer);
        _container.addChild(this.mainLayer);
        _container.addChild(this.moduleIconLayer);
        _container.addChild(this.windowLayer);
        _container.addChild(this.popAlertLayer);
        _container.addChild(this.msgLayer);
        _container.addChild(this.topLayer);
        UiManager.init();
    };
    return LayerManager;
}());
egret.registerClass(LayerManager,'LayerManager');
//# sourceMappingURL=LayerManager.js.map