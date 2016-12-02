var MapConfig = (function () {
    function MapConfig() {
    }
    var d = __define,c=MapConfig,p=c.prototype;
    /**
             * 地图视野宽
             */
    MapConfig.MAP_SCREEN_WIDTH = 480;
    /**
     * 地图视野高
     */
    MapConfig.MAP_SCREEN_HEIGHT = 800;
    /**
     * 地图切片宽
     */
    MapConfig.MAP_CLIP_IMAGE_WIDTH = 256;
    /**
     * 地图切片高
     */
    MapConfig.MAP_CLIP_IMAGE_HEIGHT = 256;
    /**
     * 地图格子宽度
     */
    MapConfig.MAP_NODE_WIDTH = 64;
    /**
     * 地图格子高度
     */
    MapConfig.MAP_NODE_HEIGHT = 64;
    /**
     * 版本号
     */
    MapConfig.version = "";
    MapConfig.res_url = "map/";
    return MapConfig;
}());
egret.registerClass(MapConfig,'MapConfig');
//# sourceMappingURL=MapConfig.js.map