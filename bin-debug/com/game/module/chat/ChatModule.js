var ChatModule = (function (_super) {
    __extends(ChatModule, _super);
    function ChatModule() {
        _super.call(this);
        this._chatView = null;
    }
    var d = __define,c=ChatModule,p=c.prototype;
    /**
     * 启动模块
     */
    p.startup = function () {
        this.initListeners();
    };
    p.initListeners = function () {
    };
    p.openView = function () {
        if (this._chatView == null) {
            this._chatView = new ChatView();
        }
        this._chatView.isPop = true;
    };
    return ChatModule;
}(BaseModule));
egret.registerClass(ChatModule,'ChatModule');
//# sourceMappingURL=ChatModule.js.map