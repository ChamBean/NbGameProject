var net;
(function (net) {
    var SocketBase = (function (_super) {
        __extends(SocketBase, _super);
        function SocketBase() {
            _super.call(this);
            this._host = '';
            this._port = 0;
            this.type = egret.WebSocket.TYPE_BINARY;
            this.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            this.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        }
        var d = __define,c=SocketBase,p=c.prototype;
        p.connect = function (host, port) {
            if (this._host == host && this._port == port)
                if (this.connected)
                    return;
            this._host = host;
            this._port = port;
            _super.prototype.connect.call(this, host, port);
        };
        //连接成功返回
        p.onSocketOpen = function (e) {
            Message.show('socket连接成功');
        };
        //连接成功返回
        p.onSocketClose = function (e) {
            Message.show('socket已关闭');
        };
        p.onSocketError = function (e) {
            Message.show('socket连接错误');
        };
        p.close = function () {
            if (this.connected) {
                this.close();
            }
        };
        //消息返回  
        p.onReceiveMessage = function (e) {
            var _arr = new egret.ByteArray();
            this.readBytes(_arr);
            var mainId = _arr.readInt();
            var subId = _arr.readShort();
            var cmdDataBA = new egret.ByteArray();
            _arr.readBytes(cmdDataBA);
        };
        //向服务端发送消息
        p.sendMessage = function (mainId, subId, msg) {
            var sendMsg = new egret.ByteArray();
            sendMsg.writeInt(mainId);
            sendMsg.writeShort(subId);
            sendMsg.writeBytes(new egret.ByteArray(msg));
            this.writeBytes(sendMsg);
        };
        return SocketBase;
    }(egret.WebSocket));
    net.SocketBase = SocketBase;
    egret.registerClass(SocketBase,'net.SocketBase');
})(net || (net = {}));
//# sourceMappingURL=SocketBase.js.map