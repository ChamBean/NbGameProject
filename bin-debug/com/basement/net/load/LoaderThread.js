var LoaderThread = (function (_super) {
    __extends(LoaderThread, _super);
    function LoaderThread() {
        _super.call(this);
    }
    var d = __define,c=LoaderThread,p=c.prototype;
    p.reset = function () {
        this.isLoad = false;
        this.loadInfo = null;
    };
    p.load = function (info) {
        // this._urlLoad.once
        this.loadInfo = info;
        this.isLoad = true;
        // egret.log(egret.getTimer() + '开始加载'+info.url);
        switch (info.loadType) {
            case LoadInfo.GROUP:
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onLoadGroupProgress, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onLoadGroupError, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadGroupComplete, this);
                RES.loadGroup(info.url);
                break;
            case LoadInfo.JSON:
                RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onLoadConfigComplete, this);
                RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onLoadConfigError, this);
                RES.loadConfig(info.url);
                break;
            case LoadInfo.IMG:
                var imgLoader = this.imgLoader;
                imgLoader.once(egret.Event.COMPLETE, this.onImgLoadComplete, this);
                imgLoader.once(egret.ProgressEvent.PROGRESS, this.onImgLoadProgress, this);
                imgLoader.once(egret.IOErrorEvent.IO_ERROR, this.onImgLoadError, this);
                imgLoader.load(info.url);
                break;
            case LoadInfo.TEXT:
            case LoadInfo.XML:
                var urlloader = this.urlLoad;
                urlloader.dataFormat = egret.URLLoaderDataFormat.TEXT;
                urlloader.addEventListener(egret.Event.COMPLETE, this.onTextLoadComplete, this);
                urlloader.addEventListener(egret.ProgressEvent.PROGRESS, this.onTextLoadProgress, this);
                urlloader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onTextLoadError, this);
                urlloader.load(new egret.URLRequest(info.url));
                break;
            case LoadInfo.BYTE:
                var urlloader = this.urlLoad;
                urlloader.dataFormat = egret.URLLoaderDataFormat.BINARY;
                urlloader.addEventListener(egret.Event.COMPLETE, this.onTextLoadComplete, this);
                urlloader.addEventListener(egret.ProgressEvent.PROGRESS, this.onTextLoadProgress, this);
                urlloader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onTextLoadError, this);
                urlloader.load(new egret.URLRequest(info.url));
                break;
        }
    };
    p.onTextLoadComplete = function (e) {
        // egret.log(egret.getTimer() + '结束加载'+ this.loadInfo.url);
        var urlload = e.target;
        this.loadInfo.data = urlload.data;
        this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
    };
    p.onImgLoadComplete = function (e) {
        // egret.log(egret.getTimer() + '结束加载'+ this.loadInfo.url);
        var loader = e.target;
        var bmd = loader.data;
        this.loadInfo.content = new egret.Bitmap(bmd);
        this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
    };
    p.onLoadConfigComplete = function (e) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onLoadConfigComplete, this);
        this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
    };
    p.onLoadGroupComplete = function (e) {
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onLoadGroupProgress, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onLoadGroupError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadGroupComplete, this);
        this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
    };
    p.onLoadGroupProgress = function (e) {
        this.dispatchEventWith(egret.ProgressEvent.PROGRESS, false, { loaded: e.itemsLoaded, total: e.itemsTotal });
    };
    p.onImgLoadProgress = function (e) {
        this.dispatchEventWith(egret.ProgressEvent.PROGRESS, false, { loaded: e.bytesLoaded, total: e.bytesTotal });
    };
    p.onTextLoadProgress = function (e) {
        this.dispatchEventWith(egret.ProgressEvent.PROGRESS, false, { loaded: e.bytesLoaded, total: e.bytesTotal });
    };
    p.onLoadGroupError = function (e) {
        if (this.loadInfo.errorHandler)
            this.loadInfo.errorHandler(this.loadInfo);
        this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, { text: '加载' + e.groupName + "资源组时出错" });
    };
    p.onLoadConfigError = function (e) {
        this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, { text: '加载' + this.loadInfo.url + "json配置时出错" });
    };
    p.onImgLoadError = function (e) {
        this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, { text: '加载' + this.loadInfo.url + "出错" });
    };
    p.onTextLoadError = function (e) {
        this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, { text: '加载' + this.loadInfo.url + "出错" });
    };
    d(p, "urlLoad"
        ,function () {
            if (this._urlLoad == null)
                this._urlLoad = new egret.URLLoader();
            return this._urlLoad;
        }
    );
    d(p, "imgLoader"
        ,function () {
            if (this._imgLoad == null)
                this._imgLoad = new egret.ImageLoader();
            return this._imgLoad;
        }
    );
    return LoaderThread;
}(egret.EventDispatcher));
egret.registerClass(LoaderThread,'LoaderThread');
//# sourceMappingURL=LoaderThread.js.map