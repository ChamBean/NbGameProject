/**
 * 地图场景逻辑移动实现
 * @author Bean
 * @since 2016.12.04
 */
var MapSceneProxy = (function () {
    function MapSceneProxy() {
        /**地图大小 */
        this._mapArea = null;
        /**玩家视野范围（以玩家坐标点为中心扩散） */
        this._sceneRect = null;
        /**玩家坐标点 */
        this._rolePoint = null;
        this.init();
    }
    var d = __define,c=MapSceneProxy,p=c.prototype;
    p.init = function () {
        this._rolePoint = new egret.Point(0, 0);
        this._mapArea = new egret.Rectangle(0, 0, 0, 0);
        this._sceneRect = new egret.Rectangle(0, 0, MapConfig.MAP_SCREEN_WIDTH, MapConfig.MAP_SCREEN_HEIGHT);
    };
    d(p, "sceneRect"
        ,function () {
            return this._sceneRect;
        }
    );
    /**
     * 更新地图宽高
     * @param w
     * @param h
     * @param bol
     */
    p.upMapAreaRect = function (w, h, bol) {
        if (bol === void 0) { bol = false; }
        this._mapArea.width = w;
        this._mapArea.height = h;
        if (bol)
            this.moveScene();
    };
    /**
     * 更新玩家视野范围（根据舞台尺寸变化）
     * @param w
     * @param h
     * @param bol 可选，是否移动地图
     */
    p.upSceneRect = function (w, h, bol) {
        if (bol === void 0) { bol = false; }
        this._sceneRect.width = w;
        this._sceneRect.height = h;
        MapConfig.MAP_SCREEN_WIDTH = w;
        MapConfig.MAP_SCREEN_HEIGHT = h;
        if (bol)
            this.moveScene();
    };
    p.setRolePoint = function (x, y, bol) {
        if (bol === void 0) { bol = false; }
        this._rolePoint.x = x;
        this._rolePoint.y = y;
        if (bol)
            this.moveScene();
    };
    p.moveScene = function () {
        this.sceneRect.x = this._rolePoint.x - this.sceneRect.width / 2;
        this.sceneRect.y = this._rolePoint.y - this.sceneRect.height / 2;
        if (this.sceneRect.width > this._mapArea.width)
            this.sceneRect.x = (this._mapArea.width - this.sceneRect.width) / 2;
        else {
            if (this.sceneRect.x < 0)
                this.sceneRect.x = 0;
            else if (this.sceneRect.x + this.sceneRect.width > this._mapArea.width)
                this.sceneRect.x = this._mapArea.width - this.sceneRect.width;
        }
        if (this.sceneRect.height > this._mapArea.height)
            this.sceneRect.y = (this._mapArea.height - this.sceneRect.height) / 2;
        else {
            if (this.sceneRect.y < 0)
                this.sceneRect.y = 0;
            else if (this.sceneRect.y + this.sceneRect.height > this._mapArea.height)
                this.sceneRect.y = this._mapArea.height - this.sceneRect.height;
        }
    };
    d(p, "clips"
        ,function () {
            var arr = [];
            var mapVo = SceneManager.ins.mapData;
            var startX = Math.floor((this._sceneRect.x - MapConfig.MAP_CLIP_IMAGE_WIDTH) / MapConfig.MAP_CLIP_IMAGE_WIDTH);
            var startY = Math.floor((this._sceneRect.y - MapConfig.MAP_CLIP_IMAGE_HEIGHT) / MapConfig.MAP_CLIP_IMAGE_HEIGHT);
            var endX = Math.floor((this._sceneRect.x + this._sceneRect.width + MapConfig.MAP_CLIP_IMAGE_WIDTH) / MapConfig.MAP_CLIP_IMAGE_WIDTH);
            var endY = Math.floor((this._sceneRect.y + this._sceneRect.height + MapConfig.MAP_CLIP_IMAGE_HEIGHT) / MapConfig.MAP_CLIP_IMAGE_HEIGHT);
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j < endY; j++) {
                    arr.push({ x: i, y: j });
                }
            }
            return arr;
        }
    );
    return MapSceneProxy;
}());
egret.registerClass(MapSceneProxy,'MapSceneProxy');
//# sourceMappingURL=MapSceneProxy.js.map