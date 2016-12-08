/**
 * 模块管理器
 * @author Bean
 * @since 2016.12.04
 */
var ModuleManager = (function () {
    function ModuleManager() {
    }
    var d = __define,c=ModuleManager,p=c.prototype;
    p.startModule = function () {
        var arr = this.getModules();
        for (var i = 0; i < arr.length; i++) {
            var module = arr[i];
            module.startup();
        }
    };
    p.getModules = function () {
        return [
            new MainModule(),
            new MapModule()
        ];
    };
    return ModuleManager;
}());
egret.registerClass(ModuleManager,'ModuleManager');
//# sourceMappingURL=ModuleManager.js.map