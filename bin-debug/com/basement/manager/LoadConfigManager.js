/**
 * 所有文本配置加载管理器
 * @author Bean
 * @since 2016.12.04
 */
var LoadConfigManager = (function () {
    function LoadConfigManager() {
        this._configs = {};
        this._loadDic = {};
    }
    var d = __define,c=LoadConfigManager,p=c.prototype;
    p.getConfig = function (url, funs, data, property, progressHandler) {
        if (data === void 0) { data = null; }
        if (property === void 0) { property = 0; }
        if (progressHandler === void 0) { progressHandler = null; }
        var config = this._configs[url];
        if (config == null) {
            var loadArr = this._loadDic[url];
            if (loadArr == null) {
                loadArr = [];
                this._loadDic[url] = loadArr;
                LoadManager.ins.addTextLoad(url, this.onConfigComplete, this, property, progressHandler);
            }
            loadArr.push({ fun: funs, data: data });
        }
        else {
            var param = { cfg: config, data: data, url: url };
            funs(param);
        }
    };
    p.onConfigComplete = function (ld) {
        var url = ld.url;
        var self = ld.info;
        var loadArr = self._loadDic[url];
        var config = ld.data;
        self._configs[url] = config;
        for (var i = 0; i < loadArr.length; i++) {
            var obj = loadArr[i];
            var param = { cfg: config, data: obj.data, url: url };
            obj.fun(param);
        }
        self._loadDic[url] = null;
        delete self._loadDic[url];
    };
    return LoadConfigManager;
}());
egret.registerClass(LoadConfigManager,'LoadConfigManager');
//# sourceMappingURL=LoadConfigManager.js.map