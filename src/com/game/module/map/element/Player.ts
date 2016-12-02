class Player extends BaseRole{
	private _nameTxt:egret.TextField = null;
	public constructor() {
		super();
		this.touchEnabled = true;
		var txt:egret.TextField = new egret.TextField();
		txt.textAlign = egret.HorizontalAlign.CENTER;
		txt.size = 14;
		txt.filters = [new egret.GlowFilter(0,1,3,3,2,1)];
		txt.text = '12324';
		this._nameTxt = txt;
		this.addChild(txt);
		this._avatar.addEventListener(SceneEventName.UPDATA_ROLE_SIZE,this.refreshBodySize,this);
	}

	private refreshBodySize(e:egret.Event):void
	{
		this._nameTxt.width = this._nameTxt.textWidth + 3;
		this._nameTxt.x = -this._nameTxt.width/2;
		this._nameTxt.y = -this._avatar.bodyHeight - 3;

	}
}