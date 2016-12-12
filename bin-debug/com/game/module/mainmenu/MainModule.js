/**
 * 主界面数据收发层
 * @author Bean
 * @since 2016.12.04
 */
var MainModule = (function (_super) {
    __extends(MainModule, _super);
    function MainModule() {
        _super.call(this);
        this._createRole = null;
        this._mainView = null;
    }
    var d = __define,c=MainModule,p=c.prototype;
    /**
     * 启动模块
     */
    p.startup = function () {
        if (this._createRole == null) {
            this._createRole = new CreateRoleView(this);
            this._createRole.isPop = true;
        }
        this.initListeners();
    };
    p.initListeners = function () {
    };
    p.createRole = function (roleData) {
        this.dispatch(EventName.CREATE_ROLE_SUCCESS, roleData);
        this._createRole.dispos();
        this._createRole = null;
        this.initMainView(roleData);
    };
    p.initMainView = function (roleData) {
        if (this._mainView == null) {
            this._mainView = new MainView(this);
            App.ins.layer.mainLayer.addChild(this._mainView);
            this._mainView.setRoleData(roleData);
        }
    };
    d(p, "moduleName"
        /**
         * 模块名称
         * @return
         */
        ,function () {
            return "主界面";
        }
    );
    return MainModule;
}(BaseModule));
egret.registerClass(MainModule,'MainModule');
//# sourceMappingURL=MainModule.js.map