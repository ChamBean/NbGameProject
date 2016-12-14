/**
 第一个测试消息体
 1100:cm 
 */
class Ccmd1100 extends net.NetVo{
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
	
	public encodeCode(byteArray:egret.ByteArray):void{
		 BinaryUtil.writeByte(byteArray,this.type);
		 BinaryUtil.writeInt(byteArray,this.id);
		 BinaryUtil.writeUTF(byteArray,this.name);
	}
}