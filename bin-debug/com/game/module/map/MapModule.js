/**
 * 地图模块启动中心
 * @author Bean
 * @since 2016.12.04
 */
var MapModule = (function (_super) {
    __extends(MapModule, _super);
    function MapModule() {
        _super.call(this);
        this._sceneManager = null;
    }
    var d = __define,c=MapModule,p=c.prototype;
    p.startup = function () {
        this._sceneManager = SceneManager.ins;
        this._mapView = new MapViewMediator(App.ins.layer.sceneLayer);
        this._sceneManager.mapViewMediator = this._mapView;
        this.initListeners();
        // 
    };
    p.initListeners = function () {
        this.addModuleListener(EventName.CREATE_ROLE_SUCCESS, this.onCreateRoleHandler);
        this.addModuleListener(EventName.OPEN_MAP_NODE, this.onOpenMapNode);
    };
    p.onOpenMapNode = function (e) {
        this._mapView.backLayer.drawNodes(this._sceneManager.mapData);
    };
    p.onCreateRoleHandler = function (e) {
        this._sceneManager.createMyRole(e.data);
        this._sceneManager.initMap();
    };
    p.openView = function () {
    };
    d(p, "moduleName"
        /**
         * 模块名称
         * @return
         */
        ,function () {
            return "地图模块";
        }
    );
    return MapModule;
}(BaseModule));
egret.registerClass(MapModule,'MapModule');
//# sourceMappingURL=MapModule.js.map