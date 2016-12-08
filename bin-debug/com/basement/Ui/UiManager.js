var UiManager = (function () {
    function UiManager() {
    }
    var d = __define,c=UiManager,p=c.prototype;
    UiManager.init = function () {
        UiManager._container = App.ins.layer.windowLayer;
    };
    UiManager.show = function (view) {
        UiManager._container.addChild(view);
        UiManager.setPanelPosition(view);
    };
    UiManager.hide = function (view) {
        if (!UiManager._container.contains(view))
            return;
        UiManager._container.removeChild(view);
    };
    UiManager.setPanelPosition = function (view) {
        if (view.parent == null)
            return;
        var stageW = App.ins.stage.stageWidth;
        var stageH = App.ins.stage.stageHeight;
        view.x = Math.floor((stageW - view.panelW) / 2);
        view.y = Math.floor((stageH - view.panelH) / 2);
    };
    UiManager._container = null;
    return UiManager;
}());
egret.registerClass(UiManager,'UiManager');
//# sourceMappingURL=UiManager.js.map