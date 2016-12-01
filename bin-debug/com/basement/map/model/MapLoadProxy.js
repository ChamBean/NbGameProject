/**
 * @des 场景地图加载
 * @author Bean
 */
var MapLoadProxy = (function () {
    function MapLoadProxy() {
        this._mapConvert = null;
        this._mapData = null;
        this._mapConvert = new MapDataConvert();
    }
    var d = __define,c=MapLoadProxy,p=c.prototype;
    d(MapLoadProxy, "ins"
        ,function () {
            if (MapLoadProxy._ins == null)
                MapLoadProxy._ins = new MapLoadProxy();
            return MapLoadProxy._ins;
        }
    );
    p.setMapId = function (id) {
        this._mapid = id;
        var url = StringUtil.substitute(MapLoadProxy.mapCfgSrc, id);
        LoadManager.ins.addByteLoad(url, this.onLoadMapCfgHandler, id, LoadPriorityEnum.MAPCONFIG_PRIORITY);
        // string.su
    };
    p.onLoadMapCfgHandler = function (ld) {
        if (ld.info == MapLoadProxy.ins._mapid) {
            MapLoadProxy.ins._mapData = MapLoadProxy.ins._mapConvert.numbertranfromToMapVO(ld.data);
        }
    };
    MapLoadProxy.mapCfgSrc = 'resource/map/config/{0}.mp';
    MapLoadProxy._ins = null;
    return MapLoadProxy;
}());
egret.registerClass(MapLoadProxy,'MapLoadProxy');
//# sourceMappingURL=MapLoadProxy.js.map