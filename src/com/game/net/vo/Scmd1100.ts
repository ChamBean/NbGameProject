/**
第一个测试消息体
1100:sever_main
*/
class Scmd1100 extends net.NetVo{
	/**byte:类型*/
	public type:number = 0;
	/**string:名字*/
	public name:string = '';
	/**int:id*/
	public id:number = 0;
	/**array:数组:int*/
	public arr:Array<number> = null;
	public constructor() {
		super();
	}
	public get command():number{
		return 1100;
	};
	public decodeCode(byteArray:net.GameByteArray):void{
		this.type = BinaryUtil.readByte(byteArray);
		this.name = BinaryUtil.readUTF(byteArray);
		this.id = BinaryUtil.readInt(byteArray);
		this.arr= [];
		let len:number = BinaryUtil.readUnsignedInt(byteArray);
		let i:number = 0;
		for(i = 0;i < len;i++){
			this.arr[i] = BinaryUtil.readByte(byteArray);
		}
	}
}