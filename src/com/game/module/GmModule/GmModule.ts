class GmModule extends BaseModule{
	public constructor() {
		super();
	}

	private _featureChangeView:FeatureChangeView = null;
	public startup():void{
		this.initListeners();
	}

	protected initListeners():void{
		this.addModuleListener(EventName.OPEN_GM_PANEL,this.onOpenGmHandler)
	}

	private onOpenGmHandler(e:egret.Event):void{
		switch(e.data.type){
			case 1:
				Message.show('不能创建角色');
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