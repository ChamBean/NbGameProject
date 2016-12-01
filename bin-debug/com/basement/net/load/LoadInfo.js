var LoadInfo = (function () {
    function LoadInfo(url, complete, param, priority, progress, error) {
        if (param === void 0) { param = null; }
        if (priority === void 0) { priority = 0; }
        if (progress === void 0) { progress = null; }
        if (error === void 0) { error = null; }
        this.url = url;
        this.completeHandler = complete;
        this.info = param;
        this.priority = priority;
        this.progressHandler = progress;
        this.errorHandler = error;
    }
    var d = __define,c=LoadInfo,p=c.prototype;
    LoadInfo.XML = 'xml';
    LoadInfo.BYTE = 'byte';
    LoadInfo.JSON = 'json';
    LoadInfo.IMG = 'IMG';
    LoadInfo.TEXT = 'text';
    LoadInfo.GROUP = 'group';
    return LoadInfo;
}());
egret.registerClass(LoadInfo,'LoadInfo');
//# sourceMappingURL=LoadInfo.js.map