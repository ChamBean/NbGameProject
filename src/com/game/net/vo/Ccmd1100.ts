/**
第一个测试消息体
1100:client_main
*/
class Ccmd1100 extends net.NetVo{
	/**byte:类型*/
	public type:number = 0;
	/**string:名字*/
	public name:string = '';
	/**int:id*/
	public id:number = 0;
	/**array:数字集合:int*/
	public numArr:Array<number> = null;
	public constructor() {
		super();
	}
	public get command():number{
		return 1100;
	};
	public encodeCode(byteArray:net.GameByteArray):void{
		BinaryUtil.writeByte(byteArray,this.type);
		BinaryUtil.writeUTF(byteArray,this.name);22
		BinaryUtil.writeInt(byteArray,this.id);26
		let len:number = this.numArr.length;
		let i:number = 0;
		BinaryUtil.writeUnsignedInt(byteArray,len);
		for(i = 0;i < len;i++){
			BinaryUtil.writeByte(byteArray,this.numArr[i]);
		}
	}
}