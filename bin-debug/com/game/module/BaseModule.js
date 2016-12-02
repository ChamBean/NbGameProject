var BaseModule = (function () {
    function BaseModule() {
    }
    var d = __define,c=BaseModule,p=c.prototype;
    /**
     * 启动模块
     */
    p.startup = function () {
        throw new Error("需要被重写");
    };
    d(p, "moduleName"
        /**
         * 模块名称
         * @return
         */
        ,function () {
            return "未被重写的模块名称";
        }
    );
    /**
     * 注册事件
     */
    p.initListeners = function () {
        throw new Error("需要被重写");
    };
    p.addSocketListener = function (cmd, callFun) {
    };
    p.removeSocketListener = function (cla, callFun) {
    };
    p.sendSocketMessage = function (vo) {
    };
    p.dispatch = function (param1, param2) {
        if (param2 === void 0) { param2 = null; }
    };
    p.addModuleListener = function (param1, param2) {
    };
    p.removeModuleListener = function (param1, param2) {
    };
    p.dispose = function () {
        return;
    };
    return BaseModule;
}());
egret.registerClass(BaseModule,'BaseModule');
//# sourceMappingURL=BaseModule.js.map