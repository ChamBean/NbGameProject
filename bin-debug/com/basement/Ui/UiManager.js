/**
 * 模块视图显示隐藏管理中心
 * @author Bean
 * @since 2016.12.04
 */
var UiManager = (function () {
    function UiManager() {
    }
    var d = __define,c=UiManager,p=c.prototype;
    UiManager.init = function () {
        UiManager._viewContainer = App.ins.layer.windowLayer;
        UiManager._alertContainer = App.ins.layer.popAlertLayer;
    };
    UiManager.show = function (view) {
        if (view.viewType == 1) {
            UiManager._viewContainer.addChild(view);
        }
        if (view.viewType == 2 && UiManager._viewForMasks.indexOf(view) == -1) {
            UiManager._alertContainer.addChild(view);
            UiManager._viewForMasks.push(view);
            if (UiManager._viewForMasks.length == 1) {
                UiManager.drawMask();
            }
        }
        UiManager.setPanelPosition(view);
    };
    UiManager.hide = function (view) {
        if (view.viewType == 1 && UiManager._viewContainer.contains(view))
            UiManager._viewContainer.removeChild(view);
        if (view.viewType == 2 && UiManager._viewForMasks.indexOf(view) != -1) {
            var index = UiManager._viewForMasks.indexOf(view);
            UiManager._viewForMasks.splice(index, 1);
            if (UiManager._viewForMasks.length < 1) {
                UiManager.clearMask();
            }
            if (UiManager._alertContainer.contains(view))
                UiManager._alertContainer.removeChild(view);
        }
    };
    UiManager.setPanelPosition = function (view) {
        if (view.parent == null)
            return;
        var stageW = App.ins.stage.stageWidth;
        var stageH = App.ins.stage.stageHeight;
        view.x = Math.floor((stageW - view.panelW) / 2);
        view.y = Math.floor((stageH - view.panelH) / 2);
    };
    UiManager.drawMask = function () {
        UiManager._alertContainer.graphics.clear();
        UiManager._alertContainer.graphics.beginFill(0, 0.7);
        UiManager._alertContainer.graphics.drawRect(0, 0, App.ins.stage.stageWidth, App.ins.stage.stageHeight);
        UiManager._alertContainer.graphics.endFill();
        UiManager._alertContainer.touchEnabled = true;
    };
    UiManager.clearMask = function () {
        UiManager._alertContainer.graphics.clear();
        UiManager._alertContainer.touchEnabled = false;
    };
    UiManager._viewContainer = null;
    UiManager._alertContainer = null;
    UiManager._viewForMasks = [];
    return UiManager;
}());
egret.registerClass(UiManager,'UiManager');
//# sourceMappingURL=UiManager.js.map