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
        p.send = function (byte) {
            byte.position = 0;
            this.writeBytes(byte, 0, byte.bytesAvailable);
        };
        p.close = function () {
            if (this.connected) {
                this.close();
            }
        };
        //消息返回  
        p.onReceiveMessage = function (e) {
            var byte = new net.GameByteArray();
            this.readBytes(byte);
            this.dispatchEvent(new net.SocketEvent(net.SocketEvent.DATA_RECEIVE, byte));
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