var CustomNumImg = (function (_super) {
    __extends(CustomNumImg, _super);
    function CustomNumImg(head) {
        _super.call(this);
        this.resKey = '{0}{1}_png';
        this.touchEnabled = false;
        this._head = head;
    }
    var d = __define,c=CustomNumImg,p=c.prototype;
    p.upDataNum = function (num) {
        this.clear();
        var offX = 0;
        for (var i = 0; i < num.length; i++) {
            var s = num.charAt(i);
            s = StringUtil.substitute(this.resKey, this._head, s);
            var bmp = new egret.Bitmap(RES.getRes(s));
            bmp.x = offX;
            offX += bmp.width;
            this.addChild(bmp);
        }
    };
    p.clear = function () {
        while (this.numChildren > 0) {
            var bmp = this.removeChildAt(0);
            bmp.texture = null;
            bmp = null;
        }
    };
    return CustomNumImg;
}(egret.DisplayObjectContainer));
egret.registerClass(CustomNumImg,'CustomNumImg');
//# sourceMappingURL=CustomNumImg.js.map