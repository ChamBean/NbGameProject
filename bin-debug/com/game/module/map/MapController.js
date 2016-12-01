var MapController = (function (_super) {
    __extends(MapController, _super);
    function MapController() {
        _super.call(this);
    }
    var d = __define,c=MapController,p=c.prototype;
    p.startup = function () {
        this._mapView = new MapViewMediator(LayerManager.ins.sceneLayer);
    };
    return MapController;
}(BaseController));
egret.registerClass(MapController,'MapController');
//# sourceMappingURL=MapController.js.map