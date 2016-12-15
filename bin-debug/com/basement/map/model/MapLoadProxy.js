/**
 * @des 场景地图加载
 * @author Bean
 */
var MapLoadProxy = (function (_super) {
    __extends(MapLoadProxy, _super);
    function MapLoadProxy() {
        _super.call(this);
        this._mapConvert = null;
        this._mapData = null;
        this._waitClips = {};
        this._mapConvert = new MapDataConvert();
    }
    var d = __define,c=MapLoadProxy,p=c.prototype;
    p.setBgView = function (bg) {
        this._bgView = bg;
    };
    p.setMapId = function (id) {
        this._mapid = id;
        var url = StringUtil.substitute(MapLoadProxy.mapCfgSrc, id);
        LoadManager.ins.addByteLoad(url, this.onLoadMapCfgHandler, this, LoadPriorityEnum.MAPCONFIG_PRIORITY);
        this.loadSmallMap();
        // string.su
    };
    p.onLoadMapCfgHandler = function (ld) {
        var self = ld.info;
        self._mapData = self._mapConvert.numbertranfromToMapVO(ld.data);
        self._mapData.mapId = self._mapid;
        self.dispatchEventWith(SceneEventName.GAMEMAP_DATA_LOAD_COMPLETE, false, self._mapData);
        self.drawMark();
    };
    d(p, "mapData"
        ,function () {
            return this._mapData;
        }
    );
    p.loadSmallMap = function () {
        this._previewTexture = null;
        var src = StringUtil.substitute(MapLoadProxy.mapClipSrc, this._mapid, 'preview.jpg');
        LoadManager.ins.addImgLoad(src, this.onLoadSmallMapComplete, this, LoadPriorityEnum.MAPCONFIG_PRIORITY);
    };
    p.onLoadSmallMapComplete = function (ld) {
        var self = ld.info;
        self._previewTexture = ld.data;
        self.drawMark();
    };
    p.drawMark = function () {
        if (this._mapData == null || this._previewTexture == null)
            return;
        this._bgView.setMark(this._previewTexture, this._mapData.mapWidth, this._mapData.mapHeight);
    };
    p.loadClips = function (clips) {
        var mapData = this._mapData;
        for (var i = 0; i < clips.length; i++) {
            var obj = clips[i];
            if (mapData.tileArray[obj.x]) {
                if (mapData.tileArray[obj.x][obj.y]) {
                    var title = mapData.tileArray[obj.x][obj.y];
                    var url = StringUtil.substitute(MapLoadProxy.mapClipSrc, mapData.mapId, title);
                    if (this._waitClips[url] != null)
                        continue;
                    if (this._bgView.hasClipBmp(url)) {
                        this._bgView.setClipBmd(url);
                        continue;
                    }
                    this._waitClips[url] = url;
                    var params = { mapid: mapData.mapId, url: url, self: this, x: obj.x, y: obj.y };
                    LoadManager.ins.addImgLoad(url, this.loadMapComplete, params, LoadPriorityEnum.MAPCLIP_PRIORITY);
                }
            }
        }
    };
    p.loadMapComplete = function (ld) {
        var param = ld.info;
        var self = param.self;
        var nodeX = param.x;
        var nodeY = param.y;
        var url = param.url;
        var id = param.mapid;
        if (self._mapid != id)
            return;
        self._waitClips[url] = null;
        delete self._waitClips[url];
        var bmp = new egret.Bitmap(ld.data);
        bmp.x = nodeX * MapConfig.MAP_CLIP_IMAGE_WIDTH;
        bmp.y = nodeY * MapConfig.MAP_CLIP_IMAGE_HEIGHT;
        self._bgView.setClipBmd(url, bmp);
    };
    p.clear = function () {
        for (var key in this._waitClips) {
            LoadManager.ins.clearLoad(key);
        }
        this._waitClips = {};
        this._mapData = null;
    };
    MapLoadProxy.mapCfgSrc = 'resource/map/map{0}/data.mp';
    MapLoadProxy.mapClipSrc = 'resource/map/map{0}/{1}';
    return MapLoadProxy;
}(egret.EventDispatcher));
egret.registerClass(MapLoadProxy,'MapLoadProxy');
//# sourceMappingURL=MapLoadProxy.js.map