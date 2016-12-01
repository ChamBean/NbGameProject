/**
 * @des 场景地图层
 * @author Bean
 */
var MapBackGroundLayer = (function (_super) {
    __extends(MapBackGroundLayer, _super);
    function MapBackGroundLayer() {
        _super.call(this);
        var sp = new egret.Shape();
        sp.graphics.beginFill(0xf0ff00);
        sp.graphics.drawRect(0, 0, 480, 800);
        sp.graphics.endFill;
        this.addChild(sp);
    }
    var d = __define,c=MapBackGroundLayer,p=c.prototype;
    return MapBackGroundLayer;
}(BaseMapLayer));
egret.registerClass(MapBackGroundLayer,'MapBackGroundLayer');
//# sourceMappingURL=MapBackGroundLayer.js.map