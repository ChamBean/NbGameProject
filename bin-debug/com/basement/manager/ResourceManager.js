var ResourceManager = (function () {
    function ResourceManager() {
        this._inited = false;
        this.second = 0;
        this._images = {};
        this._loadDic = {};
    }
    var d = __define,c=ResourceManager,p=c.prototype;
    d(ResourceManager, "ins"
        ,function () {
            if (ResourceManager._ins == null)
                ResourceManager._ins = new ResourceManager();
            return ResourceManager._ins;
        }
    );
    /**
     * 加载图片
     * @param url 二级路径 前置的资源路径已设置
     * @param funs  完成回调
     * @param data  传参
     * @param property 加载优先级
     *
     */
    p.getImageRes = function (url, funs, data, property, progressHandler) {
        if (data === void 0) { data = null; }
        if (property === void 0) { property = 0; }
        if (progressHandler === void 0) { progressHandler = null; }
        var image = this._images[url];
        if (image == null) {
            var loadArr = this._loadDic[url];
            if (loadArr == null) {
                loadArr = [];
                this._loadDic[url] = loadArr;
                LoadManager.ins.addImgLoad(url, this.onImageComplete, this, property, progressHandler);
            }
            loadArr.push({ fun: funs, data: data });
        }
        else {
            var param = { bmd: image, data: data, url: url };
            funs(param);
        }
    };
    p.onImageComplete = function (ld) {
        var self = ld.info;
        var url = ld.url;
        var loadArr = self._loadDic[url];
        var bmp = ld.content;
        var image = new CBitmapData(url, bmp.bitmapData);
        self._images[url] = image;
        for (var i = 0; i < loadArr.length; i++) {
            var obj = loadArr[i];
            var param = { bmd: image, data: obj.data, url: url };
            obj.fun(param);
        }
        self._loadDic[url] = null;
        delete self._loadDic[url];
    };
    p.loadCompletedByUrl = function (url) {
        if (this._images[url]) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 开启内存清理检测
     */
    p.initLoopClear = function () {
        if (this._inited == false) {
            // LoopManager.addToSecond("ImageRescourceLoop", gc);
            this._inited = true;
        }
        else {
            this.gc(true);
        }
    };
    p.gc = function ($bool) {
        if ($bool === void 0) { $bool = false; }
        this.second++;
        if (this.second >= 300 || $bool) {
            this.second = 0;
            var image;
            var _imgaeDic1 = {};
            var _imgaeDic2 = {};
        }
    };
    ResourceManager._ins = null;
    return ResourceManager;
}());
egret.registerClass(ResourceManager,'ResourceManager');
//# sourceMappingURL=ResourceManager.js.map