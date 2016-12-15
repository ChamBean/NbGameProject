/**
第一个测试消息体
1100:sever_sub
*/
class Scmd1100Data extends net.NetVo{
	/**byte:类型*/
	public type:number = 0;
	public constructor() {
		super();
	}

	public decodeCode(byteArray:egret.ByteArray):void{
		this.type = BinaryUtil.readByte(byteArray);
	}
}