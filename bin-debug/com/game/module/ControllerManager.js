var ControllerManager = (function () {
    function ControllerManager() {
    }
    var d = __define,c=ControllerManager,p=c.prototype;
    p.startModule = function () {
        var arr = this.getControls();
        for (var i = 0; i < arr.length; i++) {
            var module = arr[i];
            module.startup();
        }
    };
    p.getControls = function () {
        return [
            new MapController()
        ];
    };
    return ControllerManager;
}());
egret.registerClass(ControllerManager,'ControllerManager');
//# sourceMappingURL=ControllerManager.js.map