var CustomButton = (function (_super) {
    __extends(CustomButton, _super);
    function CustomButton() {
        _super.call(this);
        this._btnImg = null;
        this._data = null;
        this.touchEnabled = true;
        this._btnImg = new CustomImage();
        this.addChild(this._btnImg);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_ROLL_OUT, this.onTouchHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchHandler, this);
    }
    var d = __define,c=CustomButton,p=c.prototype;
    p.setUrl = function (value) {
        this._btnImg.url = value;
    };
    p.setTexture = function (value) {
        this._btnImg.texture = value;
    };
    p.onTouchHandler = function (e) {
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this._btnImg.x = 1;
                this._btnImg.y = 1;
                break;
            case egret.TouchEvent.TOUCH_TAP:
            case egret.TouchEvent.TOUCH_ROLL_OUT:
            case egret.TouchEvent.TOUCH_END:
                this._btnImg.x = 0;
                this._btnImg.y = 0;
                break;
        }
    };
    d(p, "data"
        ,function () {
            return this._data;
        }
        ,function (val) {
            this._data = val;
        }
    );
    return CustomButton;
}(egret.Sprite));
egret.registerClass(CustomButton,'CustomButton');
//# sourceMappingURL=CustomButton.js.map