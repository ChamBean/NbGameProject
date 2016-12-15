var ChatView = (function (_super) {
    __extends(ChatView, _super);
    function ChatView() {
        _super.call(this);
    }
    var d = __define,c=ChatView,p=c.prototype;
    p.onCreateComplete = function (e) {
        _super.prototype.onCreateComplete.call(this, e);
        this.textInput.prompt = '输入内容';
    };
    p.clickHandler = function (e) {
        switch (e.currentTarget) {
            case this.sendBtn:
                var str = this.textInput.text;
                Message.show(str);
                var reg;
                if (str == '@OPEN_NODE')
                    GameDispatcher.ins.dispatchEvent(new egret.Event(EventName.OPEN_MAP_NODE));
                else if (str.indexOf('@MOVE_') != -1) {
                    var moveArr = str.split('_');
                    var mapObj = { x: moveArr[1], y: moveArr[2] };
                    GameDispatcher.ins.dispatchEvent(new egret.Event(EventName.AUTO_SEARCH_ROAD, false, false, mapObj));
                }
                var date = new Date(parseInt(str));
                this.hostTxt.text = date.getFullYear() + "," + (date.getMonth() + 1) + "," + date.getDate() + ",\u661F\u671F" + date.getDay() + "," + date.getHours() + "," + date.getMinutes();
                console.log(this.hostTxt.text);
                break;
            case this.openNodeBtn:
                GameDispatcher.ins.dispatchEvent(new egret.Event(EventName.AUTO_SEARCH_ROAD));
                this.isPop = false;
                break;
            // case this.socketBtn:
            // 	GameDispatcher.ins.dispatchEventWith(EventName.OPEN_GM_PANEL,{type:1});
            // 	this.isPop = false;
            // 	break;
            case this.findBtn:
                GameDispatcher.ins.dispatchEventWith(EventName.OPEN_GM_PANEL, { type: 2 });
                this.isPop = false;
                break;
            case this.dressBtn:
                GameDispatcher.ins.dispatchEventWith(EventName.OPEN_GM_PANEL, { type: 3 });
                this.isPop = false;
                break;
        }
    };
    p.addEvent = function () {
        this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.openNodeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        // this.socketBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this);
        this.findBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.dressBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    p.removeEvent = function () {
    };
    p.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return ChatView;
}(BaseView));
egret.registerClass(ChatView,'ChatView',["eui.UIComponent"]);
//# sourceMappingURL=ChatView.js.map