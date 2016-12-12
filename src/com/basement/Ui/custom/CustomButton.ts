class CustomButton extends egret.Sprite{
	private _btnImg:CustomImage = null;

	private _data:any = null;
	public constructor() {
		super();
		this.touchEnabled = true;
		this._btnImg = new CustomImage();
		this.addChild(this._btnImg);
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchHandler,this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
		this.addEventListener(egret.TouchEvent.TOUCH_ROLL_OUT,this.onTouchHandler,this);
		this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchHandler,this);
	}

	public setUrl(value:string):void{
		this._btnImg.url = value;
	}

	public setTexture(value:egret.Texture):void{
		this._btnImg.texture = value;
	}

	private onTouchHandler(e:egret.TouchEvent):void{
		switch(e.type){
			case egret.TouchEvent.TOUCH_BEGIN:
				this._btnImg.x = 1;
				this._btnImg.y = 1;
				break;
			case egret.TouchEvent.TOUCH_TAP:
			case egret.TouchEvent.TOUCH_ROLL_OUT:
			case egret.TouchEvent.TOUCH_END:
				this._btnImg.x = 0;
				this._btnImg.y = 0;
				break;
		}
	}

	public set data(val:any){
		this._data = val;
	}

	public get data():any{
		return this._data;
	}
	

}