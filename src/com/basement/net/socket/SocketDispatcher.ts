module net{
	export class SocketDispatcher {

		private static _ins:SocketDispatcher = null;

		private _observers:any = {};

		public constructor() {
		}

		public static get ins():SocketDispatcher{
			if(SocketDispatcher._ins == null)
				SocketDispatcher._ins = new SocketDispatcher();
			return SocketDispatcher._ins;
		}

		private addCmdListener(cmd:number,func:Function):void{
			var arr:Array<Function> = this._observers[cmd];
			if(arr == null){
				arr = [];
				this._observers[cmd] = arr;
			}
			if(arr.indexOf(func) == -1)
				arr.push(func);
		}

		private removeCmdListener(cmd:number,func:Function):void{
			var arr:Array<Function> = this._observers[cmd];
			if(arr == null || func == null)return;
			var index:number = arr.indexOf(func);
			if(index != -1)
				arr.splice(index,1);
			if(arr.length <= 0)
				delete this._observers[cmd];
		}

		private excute(cmd:number,data:any):void{
			var arr:Array<Function> = this._observers[cmd];
			if(arr != null){
				for(var i:number = 0;i < arr.length;i++){
					arr[i].apply(null,data);
				}
			}
		}

		public static dispatcher(cmd:number,data:any):void{
			SocketDispatcher.ins.excute(cmd,data);
		}

		public static add(cmd:number,func:Function):void{
			SocketDispatcher.ins.addCmdListener(cmd,func);
		}

		public static remove(cmd:number,func:Function):void{
			SocketDispatcher.ins.removeCmdListener(cmd,func);
		}
	}

}
