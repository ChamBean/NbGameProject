class ChatView extends BaseView implements  eui.UIComponent {
	private sendBtn:eui.Button;
	private textInput:eui.TextInput;
	private openNodeBtn:eui.Button;
	private createBtn:eui.Button;
	private findBtn:eui.Button;
	private dressBtn:eui.Button;
	public constructor() {
		super();
	}

	protected onCreateComplete(e:eui.UIEvent):void{
		super.onCreateComplete(e);
		this.textInput.prompt = '输入内容';
	}
	
	private clickHandler(e:egret.TouchEvent):void{
		switch(e.currentTarget){
			case this.sendBtn:
				var str:string = this.textInput.text;
				Message.show(str);
				var reg:RegExp
				if(str == '@OPEN_NODE')
					GameDispatcher.ins.dispatchEvent(new egret.Event(EventName.OPEN_MAP_NODE));
				else if(str.indexOf('@MOVE_')!=-1){
					var moveArr:Array<string> = str.split('_');
					var mapObj:any = {x:moveArr[1],y:moveArr[2]};
					GameDispatcher.ins.dispatchEvent(new egret.Event(EventName.AUTO_SEARCH_ROAD,false,false,mapObj));
				}
				break;
			case this.openNodeBtn:
				GameDispatcher.ins.dispatchEvent(new egret.Event(EventName.AUTO_SEARCH_ROAD));
				this.isPop = false;
				break;
			case this.createBtn:
				GameDispatcher.ins.dispatchEventWith(EventName.OPEN_GM_PANEL,{type:1});
				this.isPop = false;
				break;
			case this.findBtn:
				GameDispatcher.ins.dispatchEventWith(EventName.OPEN_GM_PANEL,{type:2});
				this.isPop = false;
				break;
			case this.dressBtn:
				GameDispatcher.ins.dispatchEventWith(EventName.OPEN_GM_PANEL,{type:3});
				this.isPop = false;
				break;
		}
		
	}

	protected addEvent():void{
		this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this);
		this.openNodeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this);
		this.createBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this);
		this.findBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this);
		this.dressBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this);
	}

	protected removeEvent():void{
	}
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}
	
}