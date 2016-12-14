var BinaryUtil = (function () {
    function BinaryUtil() {
    }
    var d = __define,c=BinaryUtil,p=c.prototype;
    BinaryUtil.readInt = function (byte) {
        return byte.readInt();
    };
    BinaryUtil.writeInt = function (byte) {
        byte.readInt();
        byte.readBoolean();
        byte.readByte();
        byte.readDouble();
        byte.readFloat();
        byte.readShort();
        byte.readUnsignedInt();
        byte.readUnsignedByte();
        byte.readUnsignedShort();
        byte.readUTF();
    };
    return BinaryUtil;
}());
egret.registerClass(BinaryUtil,'BinaryUtil');
//# sourceMappingURL=BinaryUtil.js.map