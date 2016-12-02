var ControllerManager = (function () {
    function ControllerManager() {
    }
    var d = __define,c=ControllerManager,p=c.prototype;
    p.startModule = function () {
        var arr = this.getModules();
        for (var i = 0; i < arr.length; i++) {
            var module = arr[i];
            module.startup();
        }
    };
    p.getModules = function () {
        return [
            new MapModule()
        ];
    };
    return ControllerManager;
}());
egret.registerClass(ControllerManager,'ControllerManager');
//# sourceMappingURL=ControllerManager.js.map