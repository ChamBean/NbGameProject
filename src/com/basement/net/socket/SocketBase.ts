module net {
	export class SocketBase extends egret.WebSocket {
		private _host:string = '';
		private _port:number = 0;

		public constructor() {
			super();
			this.type = egret.WebSocket.TYPE_BINARY;
			this.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
			this.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
			this.addEventListener(egret.Event.CLOSE,this.onSocketClose,this);
			this.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onSocketError,this);
		}

		public connect(host: string, port: number):void{
			if(this._host == host && this._port == port)
				if(this.connected)return;
			this._host = host;
			this._port = port;
			super.connect(host,port);
		}

		 //连接成功返回
		public onSocketOpen(e:egret.Event): void {
			Message.show('socket连接成功');
		}
		 //连接成功返回
		public onSocketClose(e:egret.Event): void {
			Message.show('socket已关闭');
		}

		public onSocketError(e:egret.IOErrorEvent):void{
			Message.show('socket连接错误');
		}

		public close():void{
			if(this.connected){
				this.close();
			}
		}

		//消息返回  
		public onReceiveMessage(e:egret.ProgressEvent): void {
			var _arr: egret.ByteArray = new egret.ByteArray();
			this.readBytes(_arr);
			var mainId = _arr.readInt();
			var subId = _arr.readShort();
			var cmdDataBA: egret.ByteArray = new egret.ByteArray();
			_arr.readBytes(cmdDataBA);
		}

		//向服务端发送消息
		public sendMessage(mainId: number,subId: number,msg: any): void {
			var sendMsg: egret.ByteArray = new egret.ByteArray();
			sendMsg.writeInt(mainId);
			sendMsg.writeShort(subId);
			sendMsg.writeBytes(new egret.ByteArray(msg));
			this.writeBytes(sendMsg);
		}
	}
}