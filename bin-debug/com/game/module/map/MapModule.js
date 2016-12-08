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
    };
    p.onCreateRoleHandler = function (e) {
        console.log(this);
        this._sceneManager.createMyRole(e.data);
        this._sceneManager.initMap();
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