/**
 * ToggleButton组
 * @author Bean
 * @since 2016.12.04
 */
var CustomToggleGroup = (function (_super) {
    __extends(CustomToggleGroup, _super);
    function CustomToggleGroup() {
        _super.call(this);
        this._toggleArr = null;
        this._selectTab = null;
        this._toggleArr = [];
    }
    var d = __define,c=CustomToggleGroup,p=c.prototype;
    p.setToggleBtn = function (btn) {
        if (this._toggleArr.indexOf(btn) != -1)
            return;
        this._toggleArr.push(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabHandler, this);
    };
    d(p, "selectTab"
        ,function () {
            return this._selectTab;
        }
        ,function (tab) {
            if (this._selectTab == tab)
                return;
            if (this._selectTab) {
                this._selectTab.selected = false;
                this._selectTab.enabled = true;
            }
            this._selectTab = tab;
            this._selectTab.enabled = false;
            this._selectTab.selected = true;
            this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
        }
    );
    p.onTouchTabHandler = function (e) {
        if (this._selectTab == e.currentTarget)
            return;
        this.selectTab = e.currentTarget;
    };
    return CustomToggleGroup;
}(egret.EventDispatcher));
egret.registerClass(CustomToggleGroup,'CustomToggleGroup');
//# sourceMappingURL=CustomToggleGroup.js.map