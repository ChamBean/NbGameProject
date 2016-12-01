var BaseController = (function () {
    function BaseController() {
    }
    var d = __define,c=BaseController,p=c.prototype;
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
    return BaseController;
}());
egret.registerClass(BaseController,'BaseController');
//# sourceMappingURL=BaseController.js.map