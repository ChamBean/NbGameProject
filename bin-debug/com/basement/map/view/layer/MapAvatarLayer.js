/**
 * @des 场景形象层
 * @author Bean
 */
var MapAvatarLayer = (function (_super) {
    __extends(MapAvatarLayer, _super);
    function MapAvatarLayer() {
        _super.call(this);
        this._childList = [];
    }
    var d = __define,c=MapAvatarLayer,p=c.prototype;
    p.init = function () {
    };
    p.addChild = function (child) {
        if (this._childList.indexOf(child) != -1) {
            return child;
        }
        this._childList.push(child);
        return _super.prototype.addChild.call(this, child);
    };
    p.removeChild = function (child) {
        var index = this._childList.indexOf(child);
        if (index == -1) {
            return child;
        }
        this._childList.splice(index, 1);
        return _super.prototype.addChild.call(this, child);
    };
    p.clear = function () {
        while (this.numChildren > 0) {
            _super.prototype.removeChildAt.call(this, 0);
        }
        this._childList.length = 0;
    };
    /**
     * 排序
     */
    p.doSortAvatar = function () {
        var sortedLayers = this._childList;
        var maxNum = sortedLayers.length;
        sortedLayers.sort(this.sort);
        var item = null;
        while (maxNum--) {
            item = sortedLayers[maxNum];
            this.setChildIndex(item, maxNum);
        }
    };
    p.sort = function (child1, child2) {
        if (child1.y < child2.y)
            return 1;
        return 0;
    };
    return MapAvatarLayer;
}(BaseMapLayer));
egret.registerClass(MapAvatarLayer,'MapAvatarLayer');
//# sourceMappingURL=MapAvatarLayer.js.map