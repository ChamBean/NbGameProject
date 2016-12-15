/**
第一个测试消息体
1100:client_main
*/
var Ccmd1100 = (function (_super) {
    __extends(Ccmd1100, _super);
    function Ccmd1100() {
        _super.call(this);
        /**byte:类型*/
        this.type = 0;
        /**string:名字*/
        this.name = '';
        /**int:id*/
        this.id = 0;
        /**array:数字集合:int*/
        this.numArr = null;
    }
    var d = __define,c=Ccmd1100,p=c.prototype;
    d(p, "command"
        ,function () {
            return 1100;
        }
    );
    ;
    p.encodeCode = function (byteArray) {
        BinaryUtil.writeByte(byteArray, this.type);
        BinaryUtil.writeUTF(byteArray, this.name);
        22;
        BinaryUtil.writeInt(byteArray, this.id);
        26;
        var len = this.numArr.length;
        var i = 0;
        BinaryUtil.writeUnsignedInt(byteArray, len);
        for (i = 0; i < len; i++) {
            BinaryUtil.writeByte(byteArray, this.numArr[i]);
        }
    };
    return Ccmd1100;
}(net.NetVo));
egret.registerClass(Ccmd1100,'Ccmd1100');
//# sourceMappingURL=Ccmd1100.js.map