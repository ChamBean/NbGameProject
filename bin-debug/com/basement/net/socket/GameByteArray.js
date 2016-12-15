var net;
(function (net) {
    var GameByteArray = (function (_super) {
        __extends(GameByteArray, _super);
        function GameByteArray() {
            _super.call(this);
            this.endian = egret.Endian.BIG_ENDIAN;
        }
        var d = __define,c=GameByteArray,p=c.prototype;
        return GameByteArray;
    }(egret.ByteArray));
    net.GameByteArray = GameByteArray;
    egret.registerClass(GameByteArray,'net.GameByteArray');
})(net || (net = {}));
//# sourceMappingURL=GameByteArray.js.map