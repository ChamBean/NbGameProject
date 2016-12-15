module net{
	export class SocketEvent extends egret.Event{
		/**
		 * 数据产生 
		 */		
		public static DATA_RECEIVE:string = 'data_Receive' ;

		public static SOCKET_LOG:string = "socket_log";
		private _data:any;
		public constructor(type:string,$data:any) {
			super(type,false);
			this._data = $data;
		}

		public get data():any{
			return this._data;
		}
	}
}
