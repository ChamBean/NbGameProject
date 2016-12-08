class UiWindow extends eui.Component implements  eui.UIComponent {
	public closeBtn:eui.Button;
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE,this.createComplete,this);
	}

	protected createComplete(e:eui.UIEvent):void{
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closePanel,this);
	}

	private closePanel(e:egret.TouchEvent):void{
		if(this.parent)
		{
			(this.parent as BaseView).isPop = false;
		}
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