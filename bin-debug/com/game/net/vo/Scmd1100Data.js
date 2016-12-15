/**
第一个测试消息体
1100:sever_sub
*/
var Scmd1100Data = (function (_super) {
    __extends(Scmd1100Data, _super);
    function Scmd1100Data() {
        _super.call(this);
        /**byte:类型*/
        this.type = 0;
    }
    var d = __define,c=Scmd1100Data,p=c.prototype;
    p.decodeCode = function (byteArray) {
        this.type = BinaryUtil.readByte(byteArray);
    };
    return Scmd1100Data;
}(net.NetVo));
egret.registerClass(Scmd1100Data,'Scmd1100Data');
//# sourceMappingURL=Scmd1100Data.js.map