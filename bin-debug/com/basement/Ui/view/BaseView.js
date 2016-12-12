/**
 * 模块面板显示基类
 * @author Bean
 * @since 2016.12.04
 */
var BaseView = (function (_super) {
    __extends(BaseView, _super);
    /**
     * 构建函数
     * w 自定义面板宽度
     * h 自定义面板高度
     * type 面板类型 1不需要遮罩 2需要遮罩
     *
     */
    function BaseView(type, w, h) {
        if (type === void 0) { type = 1; }
        if (w === void 0) { w = 0; }
        if (h === void 0) { h = 0; }
        _super.call(this);
        this.viewType = 0;
        this._isPop = false;
        this.viewType = type;
        this._panelW = w;
        this._panelH = h;
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onCreateComplete, this);
    }
    var d = __define,c=BaseView,p=c.prototype;
    p.onCreateComplete = function (e) {
        this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.onCreateComplete, this);
        this.addEvent();
    };
    p.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    d(p, "isPop"
        ,function () {
            return this._isPop;
        }
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
    p.addEvent = function () {
        throw "需要被重写";
    };
    p.removeEvent = function () {
        throw "需要被重写";
    };
    return BaseView;
}(eui.Component));
egret.registerClass(BaseView,'BaseView',["eui.UIComponent"]);
//# sourceMappingURL=BaseView.js.map