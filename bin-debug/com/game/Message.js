var Message = (function () {
    function Message() {
    }
    var d = __define,c=Message,p=c.prototype;
    Message.show = function (msg) {
        if (Message.layer == null)
            Message.layer = App.ins.layer.msgLayer;
        var item = null;
        var arr = Message.items;
        if (arr.length >= Message.maxCount) {
            item = arr.shift();
            item.dispos();
        }
        item = MessageItem.getItem();
        item.setMsg(msg);
        var moveH = item.height;
        for (var i = arr.length - 1; i >= 0; i--) {
            var tempItem = arr[i];
            tempItem.upTo(moveH);
            moveH = tempItem.height;
        }
        arr.push(item);
        item.alpha = 1;
        item.x = (App.ins.stage.stageWidth - item.width) / 2;
        item.y = Message.fixedY;
        item.addToContainer();
    };
    Message.removeItem = function (ietm) {
        var dex = Message.items.indexOf(ietm);
        if (dex != -1) {
            Message.items.splice(dex, 1);
        }
    };
    Message.layer = null;
    Message.maxCount = 3;
    Message.items = [];
    Message.fixedY = 400;
    return Message;
}());
egret.registerClass(Message,'Message');
var MessageItem = (function (_super) {
    __extends(MessageItem, _super);
    function MessageItem() {
        _super.call(this);
        this._removeKey = 0;
        this._count = 0;
        this._msgTxt = null;
        this._msgBackImg = null;
        if (MessageItem._pools == null)
            MessageItem._pools = new Array();
        this._msgBackImg = new eui.Image();
        this._msgBackImg.texture = RES.getRes('zjm_11');
        this._msgBackImg.scale9Grid = new egret.Rectangle(5, 5, 5, 5);
        // this._msgBackImg.width = 100;
        // this._msgBackImg.height = 40;
        this.addChild(this._msgBackImg);
        this._msgTxt = new egret.TextField();
        this._msgTxt.x = 6;
        this._msgTxt.y = 6;
        // this._msgTxt.background = true;
        // this._msgTxt.backgroundColor = 0xff0000;
        this._msgTxt.textColor = 0xffff00;
        this._msgTxt.stroke = 2;
        this._msgTxt.strokeColor = 0;
        // this._msgTxt.width = this._msgBackImg.width;
        // this._msgTxt.height = 35;
        this._msgTxt.size = 20;
        this._msgTxt.bold = true;
        this._msgTxt.wordWrap = false;
        this._msgTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this._msgTxt);
    }
    var d = __define,c=MessageItem,p=c.prototype;
    p.upTo = function (h) {
        var tw = egret.Tween.get(this);
        tw.to({ "y": this.y - h }, 200);
    };
    p.setMsg = function (msg) {
        this._msgTxt.textFlow = Global.getTextFlow(msg);
        // this._msgTxt.width = this._msgTxt.textWidth + 3;
        // this._msgTxt.height = this._msgTxt.textHeight + 3;
        this._msgBackImg.width = this._msgTxt.textWidth + 3 + 12;
        this._msgBackImg.height = this._msgTxt.textHeight + 3 + 12;
    };
    d(p, "width"
        ,function () {
            return this._msgBackImg.width;
        }
    );
    d(p, "height"
        ,function () {
            return this._msgBackImg.height;
        }
    );
    /**
     * 将此显示对象添加到目标容器中
     */
    p.addToContainer = function () {
        this.clearKey();
        var layer = Message.layer;
        layer.addChild(this);
        this.alpha = 0;
        this.y = 200;
        var self = this;
        var tw = egret.Tween.get(this);
        tw.to({ alpha: 1 }, 300).call(endMax, this);
        function endMax() {
            this._removeKey = egret.setTimeout(upFly, this, MessageItem.defaultStayTime);
        }
        function upFly() {
            var tw = egret.Tween.get(self);
            tw.to({ y: self.y - 10, alpha: 0.1 }, 500);
            tw.call(endMax, self);
            function endMax(item) {
                Message.removeItem(self);
                self.dispos();
            }
        }
    };
    p.clearKey = function () {
        if (this._removeKey != 0) {
            egret.clearTimeout(this._removeKey);
            this._removeKey = 0;
        }
    };
    p.dispos = function () {
        egret.Tween.removeTweens(this);
        if (this.parent)
            this.parent.removeChild(this);
        MessageItem._pools.push(this);
        this.clearKey();
    };
    MessageItem.getItem = function () {
        if (MessageItem._pools.length > 0) {
            return MessageItem._pools.shift();
        }
        return new MessageItem();
    };
    MessageItem._pools = new Array();
    MessageItem.defaultStayTime = 1500;
    MessageItem.upMoveY = 30;
    return MessageItem;
}(egret.DisplayObjectContainer));
egret.registerClass(MessageItem,'MessageItem');
//# sourceMappingURL=Message.js.map