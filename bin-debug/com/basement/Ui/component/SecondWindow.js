var SecondWindow = (function (_super) {
    __extends(SecondWindow, _super);
    function SecondWindow() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createComplete, this);
    }
    var d = __define,c=SecondWindow,p=c.prototype;
    p.createComplete = function (e) {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
    };
    p.closePanel = function (e) {
        if (this.parent) {
            this.parent.isPop = false;
        }
    };
    p.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return SecondWindow;
}(eui.Component));
egret.registerClass(SecondWindow,'SecondWindow',["eui.UIComponent"]);
//# sourceMappingURL=SecondWindow.js.map