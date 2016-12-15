var net;
(function (net) {
    var SocketManager = (function () {
        function SocketManager() {
            this._socket = null;
            this._cmdMap = null;
            this._enterSp = null;
            this._cachBytes = [];
            this._socket = new net.SocketBase();
            this._cmdMap = new CommandMap();
            this._enterSp = new egret.Shape();
            this.initListener();
        }
        var d = __define,c=SocketManager,p=c.prototype;
        p.initListener = function () {
            this._socket.addEventListener(net.SocketEvent.DATA_RECEIVE, this.onSocketDataHandler, this);
            this._socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this._socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        };
        //连接成功返回
        p.onSocketOpen = function (e) {
            if (!this._enterSp.hasEventListener(egret.Event.ENTER_FRAME)) {
                this._enterSp.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            }
            Message.show('socket连接成功');
        };
        //连接成功返回
        p.onSocketClose = function (e) {
            this._enterSp.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            Message.show('socket已关闭');
        };
        p.onSocketError = function (e) {
            Message.show('socket连接错误');
        };
        p.onEnterFrame = function (e) {
            var t = 0;
            var oldT = egret.getTimer();
            var nextTime = oldT + 20;
            while (t < nextTime) {
                if (this._cachBytes.length > 0) {
                    this.shiftBytes();
                    t = egret.getTimer();
                }
                else {
                    break;
                }
            }
        };
        p.onSocketDataHandler = function (e) {
            var byte = e.data;
            this._cachBytes.push(byte);
        };
        p.shiftBytes = function () {
            var byte = this._cachBytes.shift();
            var mainId = byte.readInt();
            var subId = byte.readUnsignedByte();
            var cmd = mainId * 100 + subId;
            var cls = this._cmdMap.commands[cmd];
            if (cls == null) {
                return;
            }
            var vo = new cls();
            vo.decodeCode(byte);
            byte.clear();
            this.printSocketLog(vo);
            net.SocketDispatcher.dispatcher(vo.command, vo);
        };
        p.printSocketLog = function (vo) {
            GameDispatcher.ins.dispatchEventWith(net.SocketEvent.SOCKET_LOG, vo);
        };
        p.connect = function (host, port) {
            this._socket.connect(host, port);
        };
        /**
         * 发送对象
         * */
        p.send = function (vo) {
            if (this._socket.connected == false) {
                Message.show('服务器还未连接');
                return false;
            }
            var data = new net.GameByteArray();
            var mainCmd = Math.floor(vo.command / 100);
            var subCmd = vo.command % 100;
            data.writeUnsignedShort(mainCmd);
            data.writeUnsignedShort(subCmd);
            vo.encodeCode(data);
            this._socket.send(data);
            this.printSocketLog(vo);
            return true;
        };
        return SocketManager;
    }());
    net.SocketManager = SocketManager;
    egret.registerClass(SocketManager,'net.SocketManager');
})(net || (net = {}));
//# sourceMappingURL=SocketManager.js.map