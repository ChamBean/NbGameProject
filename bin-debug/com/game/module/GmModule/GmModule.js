var GmModule = (function (_super) {
    __extends(GmModule, _super);
    function GmModule() {
        _super.call(this);
        this._socketView = null;
        this._featureChangeView = null;
    }
    var d = __define,c=GmModule,p=c.prototype;
    p.startup = function () {
        this.initListeners();
    };
    p.initListeners = function () {
        this.addModuleListener(EventName.OPEN_GM_PANEL, this.onOpenGmHandler);
        this.addModuleListener(net.SocketEvent.SOCKET_LOG, this.printSocketLog);
        this.addSocketListener(1100, this.onHandler1100);
    };
    p.send1100 = function (id, userName, type, numArr) {
        if (isNaN(id)) {
            Message.show('id不能为空');
            return;
        }
        if (isNaN(type)) {
            Message.show('type不能为空');
            return;
        }
        // if(numArr.length == 0){
        // 	Message.show('李彪');
        // 	return;
        // }
        var cmd = new Ccmd1100();
        cmd.id = id;
        cmd.name = userName;
        cmd.type = type;
        cmd.numArr = numArr;
        this.sendSocketMessage(cmd);
    };
    p.onHandler1100 = function (vo) {
    };
    p.printSocketLog = function (e) {
        this._socketView.printLog(e.data);
    };
    p.onOpenGmHandler = function (e) {
        switch (e.data.type) {
            case 1:
                if (this._socketView == null) {
                    this._socketView = new SocketLogView(this);
                }
                this._socketView.isPop = true;
                break;
            case 2:
                Message.show('没有其他人');
                break;
            case 3:
                if (this._featureChangeView == null) {
                    this._featureChangeView = new FeatureChangeView();
                }
                this._featureChangeView.isPop = true;
                break;
        }
    };
    return GmModule;
}(BaseModule));
egret.registerClass(GmModule,'GmModule');
//# sourceMappingURL=GmModule.js.map