var MapModule = (function (_super) {
    __extends(MapModule, _super);
    function MapModule() {
        _super.call(this);
    }
    var d = __define,c=MapModule,p=c.prototype;
    p.startup = function () {
        this._mapView = new MapViewMediator(App.ins.layer.sceneLayer);
    };
    return MapModule;
}(BaseModule));
egret.registerClass(MapModule,'MapModule');
//# sourceMappingURL=MapModule.js.map