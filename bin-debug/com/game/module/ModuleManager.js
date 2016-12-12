/**
 * 模块管理器
 * @author Bean
 * @since 2016.12.04
 */
var ModuleManager = (function () {
    function ModuleManager() {
        this.setModules();
    }
    var d = __define,c=ModuleManager,p=c.prototype;
    p.startModule = function () {
        for (var id in this._modules) {
            this._modules[id].startup();
        }
    };
    p.setModules = function () {
        this._modules = {};
        this._modules[ModuleIdStatic.GM_MODULE] = new GmModule();
        this._modules[ModuleIdStatic.MAP_MODULE] = new MapModule();
        this._modules[ModuleIdStatic.MAIN_MODULE] = new MainModule();
        this._modules[ModuleIdStatic.CHAT_MODULE] = new ChatModule();
    };
    p.openModule = function (id, subid) {
        if (subid === void 0) { subid = 0; }
        var module = this._modules[id];
        module.openView();
    };
    return ModuleManager;
}());
egret.registerClass(ModuleManager,'ModuleManager');
//# sourceMappingURL=ModuleManager.js.map