var CustomImage = (function (_super) {
    __extends(CustomImage, _super);
    function CustomImage() {
        _super.call(this);
        this._url = '';
        this._cbmd = null;
    }
    var d = __define,c=CustomImage,p=c.prototype;
    d(p, "url",undefined
        ,function (value) {
            if (this._url == value) {
                if (value == null || value == '') {
                    this.clear();
                }
                return;
            }
            App.ins.resManager.getImageRes(value, this.oLoadComplete, this, LoadPriorityEnum.IMAGE_PRIORITY);
        }
    );
    p.oLoadComplete = function (data) {
        var img = data.data;
        img._cbmd = data.bmd;
        img._cbmd.count(true);
        img.texture = data.bmd.texture;
        img.dispatchEvent(new egret.Event(CustomImage.LOAD_IMG_COMPLETE));
    };
    p.dispos = function () {
        if (this.parent)
            this.parent.removeChild(this);
        this.clear();
    };
    p.clear = function () {
        this._url = '';
        if (this.texture) {
            this.texture.dispose();
            this.texture = null;
        }
        if (this._cbmd) {
            this._cbmd.count(false);
            this._cbmd = null;
        }
    };
    CustomImage.LOAD_IMG_COMPLETE = 'load_img_complete';
    return CustomImage;
}(egret.Bitmap));
egret.registerClass(CustomImage,'CustomImage');
//# sourceMappingURL=CustomImage.js.map