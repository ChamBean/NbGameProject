/**
 * 所有图片资源加载管理器
 * @author Bean
 * @since 2016.12.04
 */
var ResourceManager = (function () {
    function ResourceManager() {
        this._inited = false;
        this.second = 0;
        this._images = {};
        this._loadDic = {};
    }
    var d = __define,c=ResourceManager,p=c.prototype;
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
        var texture = ld.data;
        var image = new CBitmapData(url, texture);
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
            LoopManager.addToSecond("ImageRescourceLoop", this.gc, this);
            this._inited = true;
        }
        else {
            this.second = 300;
            this.gc(this);
        }
    };
    p.gc = function (self) {
        self.second++;
        if (self.second <= 300)
            return;
        self.second = 0;
        var image;
        var _imgaeDic1 = {};
        var _imgaeDic2 = {};
        for (var url in self._images) {
            var image = self._images[url];
            image.dispose();
            if (image.texture != null) {
                _imgaeDic1[url] = image;
            }
        }
        self._images = _imgaeDic1;
    };
    return ResourceManager;
}());
egret.registerClass(ResourceManager,'ResourceManager');
//# sourceMappingURL=ResourceManager.js.map