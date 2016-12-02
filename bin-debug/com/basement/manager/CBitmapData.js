var CBitmapData = (function () {
    function CBitmapData(url, value) {
        this._count = 0;
        this._bitmapData = value;
        this._url = url;
    }
    var d = __define,c=CBitmapData,p=c.prototype;
    d(p, "width"
        ,function () {
            if (this._bitmapData == null)
                return 0;
            return this._bitmapData.width;
        }
    );
    d(p, "height"
        ,function () {
            if (this._bitmapData == null)
                return 0;
            return this._bitmapData.height;
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
    d(p, "bitmapData"
        /**
         * 获取一次图片就+1次数
         * @return
         */
        ,function () {
            return this._bitmapData;
        }
    );
    p.dispose = function () {
        if (this._count > 0) {
            return;
        }
        // if (LoopManager.currentTime - _lastTime < 30000)
        // {
        // 	return;
        // }
        // this._bitmapData.dispose();
        this._bitmapData = null;
    };
    return CBitmapData;
}());
egret.registerClass(CBitmapData,'CBitmapData');
//# sourceMappingURL=CBitmapData.js.map