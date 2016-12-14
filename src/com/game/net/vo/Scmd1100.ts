/**
 第一个测试消息体
 1100:sm 
*/
class Scmd1100 extends net.NetVo{
	/**int8:类型*/
	public type:number = 0;
	/**string:名字*/
	public name:string = '';
	/**int32:id*/
	public id:number = 0;
	public constructor() {
		super();
	}
	public get command():number{
		return 1100;
	}
	
	public decodeCode(byteArray:egret.ByteArray):void{
		this.type = BinaryUtil.readByte(byteArray);
		this.id = BinaryUtil.readInt(byteArray);
		this.name = BinaryUtil.readUTF(byteArray);
	}
}