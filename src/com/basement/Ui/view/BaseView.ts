class BaseView extends eui.Component implements  eui.UIComponent {
	private _isPop:boolean = false;

	private _panelW:number;
	private _panelH:number;
	public constructor(w:number=0,h:number=0) {
		super();
		this._panelW = w;
		this._panelH = h;
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}

	public set isPop(value){
		if(this._isPop == value)
			return;
		this._isPop = value;
		if(value){
			UiManager.show(this);
		}
		else{
			UiManager.hide(this);
		}
	}
	
	public get panelW():number{
		if(this._panelW == 0)
			this._panelW = this.width;
		return this._panelW;
	}
	public get panelH():number{
		if(this._panelH == 0)
			this._panelH = this.height;
		return this._panelH;
	}
	
}