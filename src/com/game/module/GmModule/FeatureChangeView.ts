class FeatureChangeView extends BaseView implements  eui.UIComponent {
	private sexBtn:eui.Button;
	private jobBtn:eui.Button;
	private dressBtn:eui.Button;
	public constructor() {
		super(2);
	}

	protected onCreateComplete(e:eui.UIEvent):void{
		super.onCreateComplete(e);
		
	}

	protected addEvent():void{
		this.sexBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this);
		this.jobBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this);
		this.dressBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this);
	}

	private clickHandler(e:egret.TouchEvent):void{
		if(e.currentTarget == this.sexBtn){
			GameDispatcher.ins.dispatchEventWith(EventName.CHANGE_FEATURE,{key:'sex'});
		}
		else if(e.currentTarget == this.jobBtn){
			GameDispatcher.ins.dispatchEventWith(EventName.CHANGE_FEATURE,{key:'job'});
		}
		else if(e.currentTarget == this.dressBtn){
			GameDispatcher.ins.dispatchEventWith(EventName.CHANGE_FEATURE,{key:'dress'});
		}
		this.isPop = false;
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