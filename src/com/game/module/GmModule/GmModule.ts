class GmModule extends BaseModule{
	public constructor() {
		super();
	}
	private _socketView:SocketLogView = null;
	private _featureChangeView:FeatureChangeView = null;
	public startup():void{
		this.initListeners();
	}

	protected initListeners():void{
		this.addModuleListener(EventName.OPEN_GM_PANEL,this.onOpenGmHandler);
		this.addModuleListener(net.SocketEvent.SOCKET_LOG,this.printSocketLog);
		this.addSocketListener(1100,this.onHandler1100);
	}

	public send1100(id:number,userName:string,type:number,numArr:Array<number>):void{
		if(isNaN(id)){
			Message.show('id不能为空');
			return;
		}
		if(isNaN(type)){
			Message.show('type不能为空');
			return;
		}
		// if(numArr.length == 0){
		// 	Message.show('李彪');
		// 	return;
		// }

		let cmd:Ccmd1100 = new Ccmd1100();
		cmd.id =id;
		cmd.name = userName;
		cmd.type = type;
		cmd.numArr = numArr;
		this.sendSocketMessage(cmd);
	}

	private onHandler1100(vo:Scmd1100):void{
		
	}

	private printSocketLog(e:egret.Event):void{
		this._socketView.printLog(e.data);
	}

	private onOpenGmHandler(e:egret.Event):void{
		switch(e.data.type){
			case 1:
				if(this._socketView == null){
					this._socketView = new SocketLogView(this);
				}
				this._socketView.isPop = true;
			break;
			case 2:
				Message.show('没有其他人');
			break;
			case 3:
				if(this._featureChangeView == null){
					this._featureChangeView = new FeatureChangeView();
				}
				this._featureChangeView.isPop = true;
			break;
		}
	}
}