var FeatureChangeView = (function (_super) {
    __extends(FeatureChangeView, _super);
    function FeatureChangeView() {
        _super.call(this, 2);
    }
    var d = __define,c=FeatureChangeView,p=c.prototype;
    p.onCreateComplete = function (e) {
        _super.prototype.onCreateComplete.call(this, e);
    };
    p.addEvent = function () {
        this.sexBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.jobBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.dressBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    p.clickHandler = function (e) {
        if (e.currentTarget == this.sexBtn) {
            GameDispatcher.ins.dispatchEventWith(EventName.CHANGE_FEATURE, { key: 'sex' });
        }
        else if (e.currentTarget == this.jobBtn) {
            GameDispatcher.ins.dispatchEventWith(EventName.CHANGE_FEATURE, { key: 'job' });
        }
        else if (e.currentTarget == this.dressBtn) {
            GameDispatcher.ins.dispatchEventWith(EventName.CHANGE_FEATURE, { key: 'dress' });
        }
        this.isPop = false;
    };
    p.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return FeatureChangeView;
}(BaseView));
egret.registerClass(FeatureChangeView,'FeatureChangeView',["eui.UIComponent"]);
//# sourceMappingURL=FeatureChangeView.js.map