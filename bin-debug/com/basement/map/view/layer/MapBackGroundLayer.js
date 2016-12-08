/**
 * @des 场景地图层
 * @author Bean
 */
var MapBackGroundLayer = (function (_super) {
    __extends(MapBackGroundLayer, _super);
    function MapBackGroundLayer() {
        _super.call(this);
        this._hasClips = {};
        this._markBmp = null;
        this._markBmp = new egret.Bitmap();
        this.addChild(this._markBmp);
    }
    var d = __define,c=MapBackGroundLayer,p=c.prototype;
    p.setMark = function (texture, mw, mh) {
        var sx = mw / texture.bitmapData.width;
        var sy = mh / texture.bitmapData.height;
        var mt = new egret.Matrix();
        mt.scale(sx, sy);
        this._markBmp.matrix = mt;
        this._markBmp.texture = texture;
    };
    /**
     * 添加地图切片
     * @param url
     * @param bmp
     */
    p.setClipBmd = function (url, bmp) {
        this._hasClips[url] = bmp;
        this.addChild(bmp);
    };
    p.hasClipBmp = function (url) {
        if (this._hasClips[url] != null)
            return true;
        else
            return false;
    };
    /**检测是否有多余的切片 如果有就清除 */
    p.clearClips = function (px, py) {
        if (this.numChildren < MapBackGroundLayer.MAX_CLIP_NUM)
            return;
        var minx = px - MapConfig.MAP_CLIP_IMAGE_WIDTH;
        var maxx = px + MapConfig.MAP_SCREEN_WIDTH + MapConfig.MAP_CLIP_IMAGE_WIDTH;
        var miny = py - MapConfig.MAP_CLIP_IMAGE_HEIGHT;
        var maxy = py + MapConfig.MAP_SCREEN_HEIGHT + MapConfig.MAP_CLIP_IMAGE_HEIGHT;
        var delArr = [];
        for (var url in this._hasClips) {
            var bmp = this._hasClips[url];
            if (bmp.x < minx || bmp.x > maxx || bmp.y < miny || bmp.y > maxy) {
                delArr.push(url);
            }
        }
        for (var i = 0; i < delArr.length; i++) {
            url = delArr[i];
            var bmp = this._hasClips[url];
            this._hasClips[url] = null;
            delete this._hasClips[url];
            if (this.contains(bmp))
                this.removeChild(bmp);
            bmp.texture.dispose();
            bmp = null;
        }
    };
    p.clear = function () {
        for (var url in this._hasClips) {
            var bmp = this._hasClips[url];
            if (this.contains(bmp))
                this.removeChild(bmp);
            bmp.texture.dispose();
            bmp = null;
        }
        this._hasClips = {};
        if (this._markBmp.texture != null) {
            this._markBmp.texture.dispose();
            this._markBmp.texture = null;
        }
    };
    /**同时存在最大切片数 */
    MapBackGroundLayer.MAX_CLIP_NUM = 60;
    return MapBackGroundLayer;
}(BaseMapLayer));
egret.registerClass(MapBackGroundLayer,'MapBackGroundLayer');
//# sourceMappingURL=MapBackGroundLayer.js.map