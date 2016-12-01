var MapViewMediator = (function () {
    function MapViewMediator(parent) {
        this._mapBackLayer = null;
        this._mapAvatarLayer = null;
        this._mapEffectLayer = null;
        this._parent = parent;
        this.init();
    }
    var d = __define,c=MapViewMediator,p=c.prototype;
    p.init = function () {
        this._map = new MapContainer();
        this._parent.addChild(this._map);
        this._mapBackLayer = new MapBackGroundLayer();
        this._mapEffectLayer = new MapEffectLayer();
        this._mapAvatarLayer = new MapAvatarLayer();
        this._map.addChild(this._mapBackLayer);
        this._map.addChild(this._mapEffectLayer);
        this._map.addChild(this._mapAvatarLayer);
        this._mapAvatarLayer.init();
    };
    return MapViewMediator;
}());
egret.registerClass(MapViewMediator,'MapViewMediator');
//# sourceMappingURL=MapViewMediator.js.map