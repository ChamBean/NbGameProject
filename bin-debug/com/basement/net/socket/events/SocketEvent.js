var net;
(function (net) {
    var SocketEvent = (function (_super) {
        __extends(SocketEvent, _super);
        function SocketEvent(type, $data) {
            _super.call(this, type, false);
            this._data = $data;
        }
        var d = __define,c=SocketEvent,p=c.prototype;
        d(p, "data"
            ,function () {
                return this._data;
            }
        );
        /**
         * 数据产生
         */
        SocketEvent.DATA_RECEIVE = 'data_Receive';
        SocketEvent.SOCKET_LOG = "socket_log";
        return SocketEvent;
    }(egret.Event));
    net.SocketEvent = SocketEvent;
    egret.registerClass(SocketEvent,'net.SocketEvent');
})(net || (net = {}));
//# sourceMappingURL=SocketEvent.js.map