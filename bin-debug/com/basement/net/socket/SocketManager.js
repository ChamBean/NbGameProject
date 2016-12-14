var net;
(function (net) {
    var SocketManager = (function () {
        function SocketManager() {
            this._socket = null;
            this._socket = new net.SocketBase();
        }
        var d = __define,c=SocketManager,p=c.prototype;
        p.connect = function (host, port) {
            this._socket.connect(host, port);
        };
        return SocketManager;
    }());
    net.SocketManager = SocketManager;
    egret.registerClass(SocketManager,'net.SocketManager');
})(net || (net = {}));
//# sourceMappingURL=SocketManager.js.map