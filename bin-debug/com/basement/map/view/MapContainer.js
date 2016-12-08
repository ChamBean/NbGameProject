/**
 * @des 场景容器
 * @author Bean
 */
var MapContainer = (function (_super) {
    __extends(MapContainer, _super);
    function MapContainer() {
        _super.call(this);
        this.touchEnabled = true;
        var sp = new egret.Shape();
        sp.graphics.beginFill(0xffffff, 1);
        sp.graphics.drawRect(0, 0, MapConfig.MAP_SCREEN_WIDTH, MapConfig.MAP_SCREEN_HEIGHT);
        sp.graphics.endFill();
        this.addChild(sp);
    }
    var d = __define,c=MapContainer,p=c.prototype;
    p.clear = function () {
    };
    p.updataPosition = function (offx, offy) {
        this.x = offx * -1;
        this.y = offy * -1;
    };
    return MapContainer;
}(egret.DisplayObjectContainer));
egret.registerClass(MapContainer,'MapContainer');
//# sourceMappingURL=MapContainer.js.map