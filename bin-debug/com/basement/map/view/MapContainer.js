/**
 * @des 场景容器
 * @author Bean
 */
var MapContainer = (function (_super) {
    __extends(MapContainer, _super);
    function MapContainer() {
        _super.call(this);
        this._mapBackLayer = null;
        this._mapAvatarLayer = null;
        this._mapEffectLayer = null;
    }
    var d = __define,c=MapContainer,p=c.prototype;
    p.initLayer = function () {
    };
    return MapContainer;
}(egret.DisplayObjectContainer));
egret.registerClass(MapContainer,'MapContainer');
//# sourceMappingURL=MapContainer.js.map