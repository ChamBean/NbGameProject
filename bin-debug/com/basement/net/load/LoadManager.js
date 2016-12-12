/**
 * 加载管理器
 * @author Bean
 * @since 2016.12.04
 */
var LoadManager = (function () {
    function LoadManager() {
        this.waitLoadList = [];
        this._max_thread = 5;
        // public ignoreErrorRequest:Boolean = true;
        // private _errorList:Object = new Object();
        this._loadMapByUrl = {};
        /**
         * 是否获取到最新的版本资源
         */
        this._isGetVersion = true;
        this.init();
    }
    var d = __define,c=LoadManager,p=c.prototype;
    d(LoadManager, "ins"
        ,function () {
            if (LoadManager._ins == null)
                LoadManager._ins = new LoadManager();
            return LoadManager._ins;
        }
    );
    p.addGroupLoad = function (url, complete, param, priority, progress) {
        if (param === void 0) { param = null; }
        if (priority === void 0) { priority = 0; }
        if (progress === void 0) { progress = null; }
        var loadInfo = new LoadInfo(url, complete, param, priority, progress);
        loadInfo.loadType = LoadInfo.GROUP;
        this.load(loadInfo);
    };
    p.addConfigLoad = function (url, complete, param, priority, progress) {
        if (param === void 0) { param = null; }
        if (priority === void 0) { priority = 0; }
        if (progress === void 0) { progress = null; }
        var loadInfo = new LoadInfo(url, complete, param, priority, progress);
        loadInfo.loadType = LoadInfo.JSON;
    };
    p.addImgLoad = function (url, complete, param, priority, progress) {
        if (param === void 0) { param = null; }
        if (priority === void 0) { priority = 0; }
        if (progress === void 0) { progress = null; }
        var loadInfo = new LoadInfo(url, complete, param, priority, progress);
        loadInfo.loadType = LoadInfo.IMG;
        this.load(loadInfo);
    };
    p.addTextLoad = function (url, complete, param, priority, progress) {
        if (param === void 0) { param = null; }
        if (priority === void 0) { priority = 0; }
        if (progress === void 0) { progress = null; }
        var loadInfo = new LoadInfo(url, complete, param, priority, progress);
        loadInfo.loadType = LoadInfo.TEXT;
        this.load(loadInfo);
    };
    p.addByteLoad = function (url, complete, param, priority, progress) {
        if (param === void 0) { param = null; }
        if (priority === void 0) { priority = 0; }
        if (progress === void 0) { progress = null; }
        var loadInfo = new LoadInfo(url, complete, param, priority, progress);
        loadInfo.loadType = LoadInfo.BYTE;
        this.load(loadInfo);
    };
    p.clearLoad = function (url) {
        var loadArr = this._loadMapByUrl[url];
        if (loadArr != null) {
            loadArr = null;
            delete this._loadMapByUrl[url];
        }
    };
    p.load = function (info) {
        if (info == null)
            return;
        var loadArr = this._loadMapByUrl[info.url];
        if (loadArr != null) {
            for (var i = 0; i < loadArr.length; i++) {
                var loadInfo = loadArr[i];
                if (loadInfo.completeHandler == info.completeHandler) {
                    return;
                }
            }
            loadArr.push(info);
        }
        else {
            loadArr = new Array();
            loadArr.push(info);
            this._loadMapByUrl[info.url] = loadArr;
        }
        var loader = this.getFreeLoader();
        if (loader != null) {
            loader.load(info);
        }
        else {
            this.waitLoadList.push(info);
            this.waitLoadList.sort(function (a, b) {
                if (a.priority > b.priority)
                    return 1;
                else if (a.priority > b.priority) {
                    if (a.createTime < b.createTime)
                        return 0;
                }
                return 0;
            });
        }
    };
    p.getFreeLoader = function () {
        var loader;
        if (this._freePools.length > 0) {
            loader = this._freePools.pop();
            return loader;
        }
        return null;
    };
    p.init = function () {
        this._freePools = [];
        this._taskLoads = [];
        var loader;
        for (var i = 0; i < this._max_thread; i++) {
            loader = new LoaderThread();
            loader.addEventListener(egret.Event.COMPLETE, this.loadComplete, this);
            loader.addEventListener(egret.ProgressEvent.PROGRESS, this.loadProgress, this);
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.IoErrorHandle, this);
            this._freePools.push(loader);
            this._taskLoads.push(loader);
        }
    };
    p.recrycleLoad = function (loader) {
        var url = loader.loadInfo.url;
        loader.reset();
        this._freePools.push(loader);
        // console.log(egret.getTimer() + '加载结束'+url +'  回收一个loader当前长度为 ' + this._freePools.length);
        this.loadNext();
    };
    p.loadNext = function () {
        while (this.waitLoadList.length > 0) {
            var loader = this.getFreeLoader();
            if (loader != null) {
                var loadInfo = this.waitLoadList.shift();
                var delay = egret.setTimeout(delayLoad, this, 1, loader, loadInfo);
                function delayLoad(load, info) {
                    egret.clearTimeout(delay);
                    load.load(info);
                }
            }
            else {
                return;
            }
        }
    };
    p.loadComplete = function (e) {
        var loader = e.target;
        var info = loader.loadInfo;
        var loadArr = this._loadMapByUrl[info.url];
        if (loadArr == null) {
            this.recrycleLoad(loader);
            return;
        }
        this._loadMapByUrl[info.url] = null;
        delete this._loadMapByUrl[info.url];
        this.recrycleLoad(loader);
        for (var i = 0; i < loadArr.length; i++) {
            var loadInfo = loadArr[i];
            loadInfo.data = info.data;
            loadInfo.content = info.content;
            if (loadInfo.completeHandler)
                loadInfo.completeHandler(loadInfo);
        }
    };
    p.loadProgress = function (e) {
        var loader = e.target;
        if (loader.loadInfo && loader.loadInfo.progressHandler)
            loader.loadInfo.progressHandler(e.data);
    };
    p.IoErrorHandle = function (e) {
        var loader = e.target;
        var url = loader.loadInfo.url;
        if (loader.loadInfo && loader.loadInfo.errorHandler)
            loader.loadInfo.errorHandler(loader.loadInfo);
        this._loadMapByUrl[url] = null;
        this.recrycleLoad(loader);
        egret.log(e.data);
    };
    return LoadManager;
}());
egret.registerClass(LoadManager,'LoadManager');
//# sourceMappingURL=LoadManager.js.map