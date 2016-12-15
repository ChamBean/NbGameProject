/**
第一个测试消息体
1100:sever_main
*/
var Scmd1100 = (function (_super) {
    __extends(Scmd1100, _super);
    function Scmd1100() {
        _super.call(this);
        /**byte:类型*/
        this.type = 0;
        /**string:名字*/
        this.name = '';
        /**int:id*/
        this.id = 0;
        /**array:数组:int*/
        this.arr = null;
    }
    var d = __define,c=Scmd1100,p=c.prototype;
    d(p, "command"
        ,function () {
            return 1100;
        }
    );
    ;
    p.decodeCode = function (byteArray) {
        this.type = BinaryUtil.readByte(byteArray);
        this.name = BinaryUtil.readUTF(byteArray);
        this.id = BinaryUtil.readInt(byteArray);
        this.arr = [];
        var len = BinaryUtil.readUnsignedInt(byteArray);
        var i = 0;
        for (i = 0; i < len; i++) {
            this.arr[i] = BinaryUtil.readByte(byteArray);
        }
    };
    return Scmd1100;
}(net.NetVo));
egret.registerClass(Scmd1100,'Scmd1100');
//# sourceMappingURL=Scmd1100.js.map