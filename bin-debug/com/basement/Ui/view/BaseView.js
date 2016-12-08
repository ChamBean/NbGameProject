var BaseView = (function (_super) {
    __extends(BaseView, _super);
    function BaseView(w, h) {
        if (w === void 0) { w = 0; }
        if (h === void 0) { h = 0; }
        _super.call(this);
        this._isPop = false;
        this._panelW = w;
        this._panelH = h;
    }
    var d = __define,c=BaseView,p=c.prototype;
    p.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    d(p, "isPop",undefined
        ,function (value) {
            if (this._isPop == value)
                return;
            this._isPop = value;
            if (value) {
                UiManager.show(this);
            }
            else {
                UiManager.hide(this);
            }
        }
    );
    d(p, "panelW"
        ,function () {
            if (this._panelW == 0)
                this._panelW = this.width;
            return this._panelW;
        }
    );
    d(p, "panelH"
        ,function () {
            if (this._panelH == 0)
                this._panelH = this.height;
            return this._panelH;
        }
    );
    return BaseView;
}(eui.Component));
egret.registerClass(BaseView,'BaseView',["eui.UIComponent"]);
//# sourceMappingURL=BaseView.js.map