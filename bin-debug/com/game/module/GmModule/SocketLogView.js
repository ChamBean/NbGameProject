var SocketLogView = (function (_super) {
    __extends(SocketLogView, _super);
    function SocketLogView(module) {
        _super.call(this);
        this._logArr = null;
        this._selectIndex = -1;
        this._modeul = module;
    }
    var d = __define,c=SocketLogView,p=c.prototype;
    p.onCreateComplete = function (e) {
        _super.prototype.onCreateComplete.call(this, e);
        this.hostTxt.prompt = '输入ip';
        this.portTxt.prompt = '输入端口';
        this._logArr = [];
        this.list.dataProvider = new eui.ArrayCollection(this._logArr);
        this.list.itemRenderer = SocketLogItem;
        this.scrListHeros.scrollPolicyV = eui.ScrollPolicy.AUTO;
        // this.list.itemRendererFunction
    };
    p.onItemTab = function (e) {
        if (e != null) {
            this._selectIndex = e.itemIndex;
        }
        this.logTxt.text = egret.getQualifiedClassName(this.list.selectedItem) + ':\n';
        var vo = this.list.selectedItem;
        for (var key in vo) {
            if (SocketLogView.delArr.indexOf(key) != -1)
                continue;
            this.logTxt.text += '\t' + key + ':' + vo[key] + '\n';
        }
    };
    p.clickHandler = function (e) {
        if (e.currentTarget == this.connectBtn) {
            var host = this.hostTxt.text;
            var port = parseInt(this.portTxt.text);
            App.ins.socket.connect(host, port);
        }
        if (e.currentTarget == this.sendBtn) {
            var id = parseInt(this.idTxt.text);
            var userName = this.nameTxt.text;
            var type = parseInt(this.typeTxt.text);
            var arr = this.arrTxt.text.split(',');
            var numArr = [];
            for (var i = 0; i < arr.length; i++) {
                if (isNaN(parseInt(arr[i])))
                    numArr.push(0);
                else
                    numArr.push(parseInt(arr[i]));
            }
            this._modeul.send1100(id, userName, type, numArr);
        }
    };
    p.printLog = function (vo) {
        // this._logArr.push(vo);
        this.list.dataProvider.addItem(vo);
        if (this._selectIndex == -1) {
            this._selectIndex = this._logArr.length - 1;
            this.list.selectedIndex = this._selectIndex;
            this.onItemTab(null);
        }
        // if(303 < 30 * this._logArr.length)
        // 	this.list.y = 303 - 30 * this._logArr.length;
        // this.verticalScrollBar.verticalScrollPosition 
        // this.list.dataProvider = new eui.ArrayCollection(this._logArr);
    };
    p.addEvent = function () {
        this.connectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTab, this);
    };
    p.removeEvent = function () {
    };
    p.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    SocketLogView.delArr = ['constructor', 'command', 'encodeCode', '__class__', '__types__', 'decodeCode'];
    return SocketLogView;
}(BaseView));
egret.registerClass(SocketLogView,'SocketLogView',["eui.UIComponent"]);
var SocketLogItem = (function (_super) {
    __extends(SocketLogItem, _super);
    function SocketLogItem() {
        _super.call(this);
        this.labelDisplay = null;
        this.width = 201;
        this.height = 30;
    }
    var d = __define,c=SocketLogItem,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.labelDisplay.size = 16;
        this.labelDisplay.top = 2;
    };
    p.dataChanged = function () {
        this.labelDisplay.text = egret.getQualifiedClassName(this.data);
    };
    return SocketLogItem;
}(eui.ItemRenderer));
egret.registerClass(SocketLogItem,'SocketLogItem');
//# sourceMappingURL=SocketLogView.js.map