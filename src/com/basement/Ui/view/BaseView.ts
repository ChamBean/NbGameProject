/**
 * 模块面板显示基类
 * @author Bean
 * @since 2016.12.04
 */
class BaseView extends eui.Component implements  eui.UIComponent {
	public viewType:number = 0;

	private _isPop:boolean = false;

	private _panelW:number;
	private _panelH:number;
	/**
	 * 构建函数
	 * w 自定义面板宽度
	 * h 自定义面板高度
	 * type 面板类型 1不需要遮罩 2需要遮罩
	 * 
	 */
	public constructor(type:number = 1,w:number=0,h:number=0) {
		super();
		this.viewType = type;
		this._panelW = w;
		this._panelH = h;
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE,this.onCreateComplete,this);
	}

	protected onCreateComplete(e:eui.UIEvent):void{
		this.removeEventListener(eui.UIEvent.CREATION_COMPLETE,this.onCreateComplete,this);
		this.addEvent();
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

	public get isPop():boolean{
		return this._isPop
	}

	protected addEvent():void{
		throw "需要被重写";
	}

	protected removeEvent():void{
		throw "需要被重写";
	}
	
}