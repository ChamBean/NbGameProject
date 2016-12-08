var CBitmapData = (function () {
    function CBitmapData(url, value) {
        this._count = 0;
        this._texture = value;
        this._url = url;
    }
    var d = __define,c=CBitmapData,p=c.prototype;
    d(p, "width"
        ,function () {
            if (this._texture == null)
                return 0;
            return this._texture.bitmapData.width;
        }
    );
    d(p, "height"
        ,function () {
            if (this._texture == null)
                return 0;
            return this._texture.bitmapData.height;
        }
    );
    p.count = function (isUse) {
        if (isUse === void 0) { isUse = true; }
        if (isUse) {
            this._count++;
        }
        else {
            this._count--;
        }
        if (this._count == 0) {
            this._lastTime = egret.getTimer();
        }
    };
    d(p, "url"
        ,function () {
            return this._url;
        }
    );
    d(p, "texture"
        /**
         * 获取一次图片就+1次数
         * @return
         */
        ,function () {
            return this._texture;
        }
    );
    p.dispose = function () {
        if (this._count > 0) {
            return;
        }
        if (LoopManager.currentTime - this._lastTime < 30000) {
            return;
        }
        this._texture.dispose();
        this._texture = null;
    };
    return CBitmapData;
}());
egret.registerClass(CBitmapData,'CBitmapData');
//# sourceMappingURL=CBitmapData.js.map