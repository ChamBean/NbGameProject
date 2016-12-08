class CustomToggleGroup extends egret.EventDispatcher{
	private _toggleArr:Array<eui.ToggleButton> = null;
	private _selectTab:eui.ToggleButton = null;
	public constructor() {
		super();
		this._toggleArr = [];
	}


	public setToggleBtn(btn:eui.ToggleButton):void{
		if(this._toggleArr.indexOf(btn) != -1)
			return;
		this._toggleArr.push(btn);
		btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTabHandler,this);
	}

	public set selectTab(tab:eui.ToggleButton){
		if(this._selectTab == tab)
			return;
		if(this._selectTab)
		{
			this._selectTab.selected = false;
			this._selectTab.enabled = true;
		}
		this._selectTab = tab;
		this._selectTab.enabled = false;
		this._selectTab.selected = true;
		this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
	}

	public get selectTab():eui.ToggleButton{
		return this._selectTab;
	}

	private onTouchTabHandler(e:egret.TouchEvent):void
	{
		if(this._selectTab == e.currentTarget)
			return;
			this.selectTab = e.currentTarget;
		
	}
}