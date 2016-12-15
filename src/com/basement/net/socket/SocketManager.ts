module net {
	export class SocketManager {
		private _socket:SocketBase = null;
		private _cmdMap:CommandMap = null;

		private  _enterSp:egret.Shape = null;
		public constructor() {
			this._socket = new SocketBase();
			this._cmdMap = new CommandMap();
			this._enterSp = new egret.Shape();
			this.initListener();
		}

		private initListener():void{
			this._socket.addEventListener(SocketEvent.DATA_RECEIVE,this.onSocketDataHandler,this);
			this._socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
			this._socket.addEventListener(egret.Event.CLOSE,this.onSocketClose,this);
			this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onSocketError,this);
		}

		//连接成功返回
		private onSocketOpen(e:egret.Event): void {
			if(!this._enterSp.hasEventListener(egret.Event.ENTER_FRAME)){
				this._enterSp.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
			}
			Message.show('socket连接成功');
		}
		 //连接成功返回
		private onSocketClose(e:egret.Event): void {
			this._enterSp.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
			Message.show('socket已关闭');
		}

		private onSocketError(e:egret.IOErrorEvent):void{
			Message.show('socket连接错误');
		}

		private onEnterFrame(e:egret.Event):void{
			var t:number = 0;
			var oldT:number = egret.getTimer();
			var nextTime:number = oldT + 20;
			while(t < nextTime)
			{
				if(this._cachBytes.length > 0)
				{
					this.shiftBytes();
					t = egret.getTimer();
				}
				else
				{
					break;
				}
			}
		}

		private _cachBytes:Array<GameByteArray> = [];
		private onSocketDataHandler(e:SocketEvent):void{
			var byte:GameByteArray = e.data;
			this._cachBytes.push(byte);
		}

		private shiftBytes():void{
			var byte:GameByteArray = this._cachBytes.shift();
			var mainId:number = byte.readByte();
			var subId:number = byte.readByte();
			var cmd:number = mainId * 100 + subId;
			var cls:any = this._cmdMap.commands[cmd];
			if(cls == null){
				return;
			}
			var vo:NetVo = new cls();
			vo.decodeCode(byte);
			byte.clear();
			this.printSocketLog(vo);
			SocketDispatcher.dispatcher(vo.command,vo);
		}

		private printSocketLog(vo:NetVo):void{
			GameDispatcher.ins.dispatchEventWith(SocketEvent.SOCKET_LOG,vo);
		}

		public connect(host: string, port: number):void{
			this._socket.connect(host,port);
		}

		/**
		 * 发送对象
		 * */
		public send(vo:net.NetVo):Boolean
		{
			if(this._socket.connected  == false)
			{
				Message.show('服务器还未连接');
				return false;
			}
			var data:GameByteArray = new GameByteArray() ;
			
			var mainCmd:number = Math.floor(vo.command / 100);
			var subCmd:number = vo.command % 100;
			data.writeByte(mainCmd);
			data.writeByte(subCmd);
			vo.encodeCode(data);
			this._socket.send(data);
			this.printSocketLog(vo);
			return true;
		}
	}
}