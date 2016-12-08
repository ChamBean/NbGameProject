var MainModule = (function (_super) {
    __extends(MainModule, _super);
    function MainModule() {
        _super.call(this);
        this._createRole = null;
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
    };
    p.createRole = function (roleData) {
        GameDispatcher.ins.dispatchEventWith(EventName.CREATE_ROLE_SUCCESS, false, roleData);
        this._createRole.dispos();
        this._createRole = null;
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