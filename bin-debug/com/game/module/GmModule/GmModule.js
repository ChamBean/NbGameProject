var GmModule = (function (_super) {
    __extends(GmModule, _super);
    function GmModule() {
        _super.call(this);
        this._featureChangeView = null;
    }
    var d = __define,c=GmModule,p=c.prototype;
    p.startup = function () {
        this.initListeners();
    };
    p.initListeners = function () {
        this.addModuleListener(EventName.OPEN_GM_PANEL, this.onOpenGmHandler);
    };
    p.onOpenGmHandler = function (e) {
        switch (e.data.type) {
            case 1:
                Message.show('不能创建角色');
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