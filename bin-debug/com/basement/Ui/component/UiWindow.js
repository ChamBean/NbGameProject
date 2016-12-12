var UiWindow = (function (_super) {
    __extends(UiWindow, _super);
    function UiWindow() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createComplete, this);
    }
    var d = __define,c=UiWindow,p=c.prototype;
    // public set width(value:number){
    // 	this.width = value;
    // 	this.backImg.width = value;
    // }
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
    return UiWindow;
}(eui.Component));
egret.registerClass(UiWindow,'UiWindow',["eui.UIComponent"]);
//# sourceMappingURL=UiWindow.js.map