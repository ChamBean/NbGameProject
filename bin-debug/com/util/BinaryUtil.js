var BinaryUtil = (function () {
    function BinaryUtil() {
    }
    var d = __define,c=BinaryUtil,p=c.prototype;
    /**
     * 从字节流中读取一个带符号的 32 位整数
     @return 介于 -2147483648 和 2147483647 之间的 32 位带符号整数
     */
    BinaryUtil.readInt = function (byte) {
        return byte.readInt();
    };
    /**
     * 在字节流中写入一个带符号的 32 位整数
     */
    BinaryUtil.writeInt = function (byte, value) {
        byte.writeInt(value);
    };
    /**
     *从字节流中读取布尔值。读取单个字节，如果字节非零，则返回 true，否则返回 false
     */
    BinaryUtil.readBoolean = function (byte) {
        return byte.readBoolean();
    };
    /**
     * 写入布尔值。根据 value 参数写入单个字节。如果为 true，则写入 1，如果为 false，则写入 0
     */
    BinaryUtil.writeBoolean = function (byte, value) {
        byte.writeBoolean(value);
    };
    /**
     * 从字节流中读取带符号的字节
     *@return 介于 -128 和 127 之间的整数
     */
    BinaryUtil.readByte = function (byte) {
        return byte.readByte();
    };
    /**
     * 在字节流中写入一个字节
     *使用参数的低 8 位。忽略高 24 位
     */
    BinaryUtil.writeByte = function (byte, value) {
        byte.writeByte(value);
    };
    /**
     * 从字节流中读取一个 IEEE 754 双精度（64 位）浮点数
     */
    BinaryUtil.readDouble = function (byte) {
        return byte.readDouble();
    };
    /**
     * 在字节流中写入一个 IEEE 754 双精度（64 位）浮点数
     */
    BinaryUtil.writeDouble = function (byte, value) {
        byte.writeDouble(value);
    };
    /**
     * 从字节流中读取一个 IEEE 754 单精度（32 位）浮点数
     */
    BinaryUtil.readFloat = function (byte) {
        return byte.readFloat();
    };
    /**
     * 在字节流中写入一个 IEEE 754 单精度（32 位）浮点数
     */
    BinaryUtil.writeFloat = function (byte, value) {
        byte.writeFloat(value);
    };
    /**
     * 从字节流中读取一个带符号的 16 位整数
        @return 介于 -32768 和 32767 之间的 16 位带符号整数
     */
    BinaryUtil.readShort = function (byte) {
        return byte.readShort();
    };
    /**
     * 在字节流中写入一个 16 位整数。使用参数的低 16 位。忽略高 16 位
     */
    BinaryUtil.writeShort = function (byte, value) {
        byte.writeShort(value);
    };
    /**
     * 从字节流中读取一个无符号的 32 位整数
        @return 介于 0 和 4294967295 之间的 32 位无符号整数
     */
    BinaryUtil.readUnsignedInt = function (byte) {
        return byte.readUnsignedInt();
    };
    /**
     * 在字节流中写入一个无符号的 32 位整数
     */
    BinaryUtil.writeUnsignedInt = function (byte, value) {
        byte.writeUnsignedInt(value);
    };
    /**
     *
     */
    BinaryUtil.readUnsignedByte = function (byte) {
        return byte.readUnsignedByte();
    };
    /**
     * 从字节流中读取无符号的字节
        @return 介于 0 和 65535 之间的 32 位无符号整数
     */
    BinaryUtil.readUnsignedShort = function (byte) {
        return byte.readUnsignedShort();
    };
    /**
     * 在字节流中写入一个无符号的 16 位整数
     */
    BinaryUtil.writeUnsignedShort = function (byte, value) {
        byte.writeUnsignedShort(value);
    };
    /**
     * 从字节流中读取一个 UTF-8 字符串。假定字符串的前缀是无符号的短整型（以字节表示长度）
     */
    BinaryUtil.readUTF = function (byte) {
        return byte.readUTF();
    };
    /**
     * 将 UTF-8 字符串写入字节流。先写入以字节表示的 UTF-8 字符串长度（作为 16 位整数），然后写入表示字符串字符的字节
     */
    BinaryUtil.writeUTF = function (byte, value) {
        byte.writeUTF(value);
    };
    return BinaryUtil;
}());
egret.registerClass(BinaryUtil,'BinaryUtil');
//# sourceMappingURL=BinaryUtil.js.map