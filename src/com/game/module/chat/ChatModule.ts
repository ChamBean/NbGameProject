class ChatModule extends BaseModule{
	private _chatView:ChatView = null;
	public constructor() {
		super();
	}

	/**
	 * 启动模块
	 */		
	public startup():void
	{
		this.initListeners();
	}

	protected initListeners():void{
	}

	public openView():void{
		if(this._chatView == null){
			this._chatView = new ChatView();
		}
		this._chatView.isPop = true;
	}
}