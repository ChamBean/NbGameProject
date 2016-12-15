module net {
	export class SocketBase extends egret.WebSocket {
		private _host:string = '';
		private _port:number = 0;
		
		public constructor() {
			super();
			this.type = egret.WebSocket.TYPE_BINARY;
			this.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
		}

		public connect(host: string, port: number):void{
			if(this._host == host && this._port == port)
				if(this.connected)return;
			this._host = host;
			this._port = port;
			super.connect(host,port);
		}

		public send(byte:GameByteArray):void{
			byte.position = 0;
			this.writeBytes(byte,0,byte.bytesAvailable);
		}

		public close():void{
			if(this.connected){
				this.close();
			}
		}

		//消息返回  
		public onReceiveMessage(e:egret.ProgressEvent): void {
			var byte: GameByteArray = new GameByteArray();
			this.readBytes(byte);
			this.dispatchEvent(new SocketEvent(SocketEvent.DATA_RECEIVE,byte))
		}

		//向服务端发送消息
		private sendMessage(mainId: number,subId: number,msg: any): void {
			var sendMsg: egret.ByteArray = new egret.ByteArray();
			sendMsg.writeInt(mainId);
			sendMsg.writeShort(subId);
			sendMsg.writeBytes(new egret.ByteArray(msg));
			this.writeBytes(sendMsg);
		}
	}
}