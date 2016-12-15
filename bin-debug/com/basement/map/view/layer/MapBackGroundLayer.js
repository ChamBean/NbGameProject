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
        this._clipCount = 0;
        this._markBmp = new egret.Bitmap();
        this.addChild(this._markBmp);
    }
    var d = __define,c=MapBackGroundLayer,p=c.prototype;
    p.drawNodes = function (mapData) {
        if (!DEBUG) {
            return;
        }
        if (this._nodeLayer == null) {
            this._nodeLayer = new egret.Shape();
        }
        if (this._nodeLayer.parent) {
            this.parent.removeChild(this._nodeLayer);
            return;
        }
        this.parent.addChild(this._nodeLayer);
        this._nodeLayer.graphics.clear();
        if (!mapData)
            return;
        for (var y = 0; y < mapData.row; y++) {
            for (var x = 0; x < mapData.col; x++) {
                var go = mapData.getNode(x, y).walkAble;
                var isMask = mapData.getNode(x, y).isMask;
                var color = 0xFF0000;
                if (go) {
                    color = isMask ? 0x00FF00 : 0xFFFFFF;
                }
                var alpha = color == 0xFFFFFF ? 0 : 0.6;
                this._nodeLayer.graphics.beginFill(color, alpha);
                this._nodeLayer.graphics.lineStyle(1, 0x666666, 1);
                this._nodeLayer.graphics.drawRect(MapConfig.MAP_NODE_WIDTH * x, MapConfig.MAP_NODE_HEIGHT * y, MapConfig.MAP_NODE_WIDTH, MapConfig.MAP_NODE_HEIGHT);
                this._nodeLayer.graphics.endFill();
            }
        }
    };
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
        if (bmp === void 0) { bmp = null; }
        if (bmp == null) {
            bmp = this._hasClips[url];
        }
        if (!this.hasClipBmp(url))
            this._clipCount++;
        if (this.contains(bmp)) {
            return;
        }
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
        if (this._clipCount >= MapBackGroundLayer.MAX_CLIP_NUM) {
            var minx = px - MapConfig.MAP_CLIP_IMAGE_WIDTH;
            var maxx = px + MapConfig.MAP_SCREEN_WIDTH + MapConfig.MAP_CLIP_IMAGE_WIDTH;
            var miny = py - MapConfig.MAP_CLIP_IMAGE_HEIGHT;
            var maxy = py + MapConfig.MAP_SCREEN_HEIGHT + MapConfig.MAP_CLIP_IMAGE_HEIGHT;
            var delArr = [];
            var url = void 0;
            for (url in this._hasClips) {
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
                this._clipCount--;
            }
            return;
        }
        // if(this.numChildren > MapBackGroundLayer.MAX_CHILDREN){
        // 	let minx:number = px - MapConfig.MAP_CLIP_IMAGE_WIDTH;
        // 	let maxx:number = px + MapConfig.MAP_SCREEN_WIDTH + MapConfig.MAP_CLIP_IMAGE_WIDTH;
        // 	let miny:number = py - MapConfig.MAP_CLIP_IMAGE_HEIGHT;
        // 	let maxy:number = py + MapConfig.MAP_SCREEN_HEIGHT + MapConfig.MAP_CLIP_IMAGE_HEIGHT;
        // 	let delArr:Array<egret.Bitmap> = [];
        // 	let url:string;
        // 	for(let i:number = 0;i < this.numChildren;i++){
        // 		let bmp:egret.Bitmap = this.getChildAt(i) as egret.Bitmap;
        // 		if(bmp == this._markBmp)continue;
        // 		if(bmp.x < minx || bmp.x > maxx || bmp.y < miny || bmp.y > maxy){
        // 			delArr.push(bmp);
        // 		}
        // 	}
        // 	for(let i:number = 0;i < delArr.length;i++)
        // 	{
        // 		if(this.contains(delArr[i]))
        // 			this.removeChild(delArr[i]);
        // 	}
        // }
    };
    p.clear = function () {
        if (this._nodeLayer) {
            this._nodeLayer.graphics.clear();
            if (this._nodeLayer.parent)
                this.parent.removeChild(this._nodeLayer);
            this._nodeLayer = null;
        }
        this._clipCount = 0;
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
    MapBackGroundLayer.MAX_CLIP_NUM = 70;
    /**地图上的最大切片数 */
    MapBackGroundLayer.MAX_CHILDREN = 20;
    return MapBackGroundLayer;
}(BaseMapLayer));
egret.registerClass(MapBackGroundLayer,'MapBackGroundLayer');
//# sourceMappingURL=MapBackGroundLayer.js.map