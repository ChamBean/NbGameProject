module net {
	export class GameByteArray extends egret.ByteArray{
		public constructor() {
			super();
			this.endian = egret.Endian.BIG_ENDIAN;
		}
	}
}