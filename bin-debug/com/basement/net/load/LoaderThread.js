var LoaderThread = (function (_super) {
    __extends(LoaderThread, _super);
    function LoaderThread() {
        _super.call(this);
    }
    var d = __define,c=LoaderThread,p=c.prototype;
    p.reset = function () {
        this.loadInfo = null;
    };
    p.load = function (info) {
        // this._urlLoad.once
        this.loadInfo = info;
        this.loading = true;
        switch (info.loadType) {
            case LoadInfo.GROUP:
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onLoadGroupProgress, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onLoadGroupError, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadGroupComplete, this);
                RES.loadGroup(info.url);
                break;
            case LoadInfo.JSON:
                RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onLoadConfigComplete, this);
                RES.loadConfig(info.url);
                break;
            case LoadInfo.IMG:
                egret.log('本次加载开始的时间' + egret.getTimer());
                this.imgLoader.once(egret.Event.COMPLETE, this.onImgLoadComplete, this);
                this.imgLoader.once(egret.ProgressEvent.PROGRESS, this.onImgLoadProgress, this);
                this.imgLoader.once(egret.IOErrorEvent.IO_ERROR, this.onImgLoadError, this);
                this.imgLoader.load(info.url);
                break;
            case LoadInfo.TEXT:
            case LoadInfo.XML:
                this.urlLoad.dataFormat = egret.URLLoaderDataFormat.TEXT;
                this.urlLoad.once(egret.Event.COMPLETE, this.onTextLoadComplete, this);
                this.urlLoad.once(egret.ProgressEvent.PROGRESS, this.onTextLoadProgress, this);
                this.urlLoad.once(egret.IOErrorEvent.IO_ERROR, this.onTextLoadError, this);
                this.urlLoad.load(new egret.URLRequest(info.url));
                break;
            case LoadInfo.BYTE:
                this.urlLoad.dataFormat = egret.URLLoaderDataFormat.BINARY;
                this.urlLoad.once(egret.Event.COMPLETE, this.onTextLoadComplete, this);
                this.urlLoad.once(egret.ProgressEvent.PROGRESS, this.onTextLoadProgress, this);
                this.urlLoad.once(egret.IOErrorEvent.IO_ERROR, this.onTextLoadError, this);
                this.urlLoad.load(new egret.URLRequest(info.url));
                break;
        }
    };
    p.onTextLoadComplete = function (e) {
        this.loading = false;
        var urlload = e.target;
        this.loadInfo.data = urlload.data;
        this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
    };
    p.onImgLoadComplete = function (e) {
        this.loading = false;
        var loader = e.target;
        var bmd = loader.data;
        this.loadInfo.content = new egret.Bitmap(bmd);
        this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
        egret.log('本次加载完成的时间' + egret.getTimer());
    };
    p.onLoadConfigComplete = function (e) {
        this.loading = false;
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onLoadConfigComplete, this);
        this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
    };
    p.onLoadGroupComplete = function (e) {
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onLoadGroupProgress, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onLoadGroupError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadGroupComplete, this);
        this.loading = false;
        this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
    };
    p.onLoadGroupProgress = function (e) {
        if (this.loadInfo && this.loadInfo.progressHandler)
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
        this.loading = false;
    };
    p.onImgLoadError = function (e) {
        if (this.loadInfo.errorHandler)
            this.loadInfo.errorHandler(this.loadInfo);
        this.loading = false;
    };
    p.onTextLoadError = function (e) {
        if (this.loadInfo.errorHandler)
            this.loadInfo.errorHandler(this.loadInfo);
        this.loading = false;
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