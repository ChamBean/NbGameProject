module net {
	export class SocketManager {
		private _socket:SocketBase = null;
		public constructor() {
			this._socket = new SocketBase();
		}

		public connect(host: string, port: number):void{
			this._socket.connect(host,port);
		}
	}
}