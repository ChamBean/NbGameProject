var net;
(function (net) {
    var SocketDispatcher = (function () {
        function SocketDispatcher() {
            this._observers = {};
        }
        var d = __define,c=SocketDispatcher,p=c.prototype;
        d(SocketDispatcher, "ins"
            ,function () {
                if (SocketDispatcher._ins == null)
                    SocketDispatcher._ins = new SocketDispatcher();
                return SocketDispatcher._ins;
            }
        );
        p.addCmdListener = function (cmd, func) {
            var arr = this._observers[cmd];
            if (arr == null) {
                arr = [];
                this._observers[cmd] = arr;
            }
            if (arr.indexOf(func) == -1)
                arr.push(func);
        };
        p.removeCmdListener = function (cmd, func) {
            var arr = this._observers[cmd];
            if (arr == null || func == null)
                return;
            var index = arr.indexOf(func);
            if (index != -1)
                arr.splice(index, 1);
            if (arr.length <= 0)
                delete this._observers[cmd];
        };
        p.excute = function (cmd, data) {
            var arr = this._observers[cmd];
            if (arr != null) {
                for (var i = 0; i < arr.length; i++) {
                    arr[i].apply(null, data);
                }
            }
        };
        SocketDispatcher.dispatcher = function (cmd, data) {
            SocketDispatcher.ins.excute(cmd, data);
        };
        SocketDispatcher.add = function (cmd, func) {
            SocketDispatcher.ins.addCmdListener(cmd, func);
        };
        SocketDispatcher.remove = function (cmd, func) {
            SocketDispatcher.ins.removeCmdListener(cmd, func);
        };
        SocketDispatcher._ins = null;
        return SocketDispatcher;
    }());
    net.SocketDispatcher = SocketDispatcher;
    egret.registerClass(SocketDispatcher,'net.SocketDispatcher');
})(net || (net = {}));
//# sourceMappingURL=SocketDispatcher.js.map