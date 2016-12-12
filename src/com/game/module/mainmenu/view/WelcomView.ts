class WelcomView extends egret.Sprite{
	private static backUrl:string = 'resource/art/img/welcome/welcome_01.png';
	private _startBtn:CustomButton;
	private _backImg:CustomImage;
	private _conatiner:egret.Sprite = null;
	public constructor() {
		super();
		this._conatiner = App.ins.layer.moduleLayer;
		this._backImg = new CustomImage();
		this._backImg.url = WelcomView.backUrl;
		this.addChild(this._backImg);
		this._startBtn = new CustomButton();
		this._startBtn.x = 168;
		this._startBtn.y = 430;
		this._startBtn.setTexture(RES.getRes('welcome_02'));
		this.addChild(this._startBtn);
		this._startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTab,this);
	}

	private onTouchTab(e:egret.TouchEvent):void{
		this.isPop = false;
	}

	public set isPop(val:boolean){
		if(val){
			this.y = 100;
			this._conatiner.addChild(this);
			this._conatiner.graphics.clear();
			this._conatiner.graphics.beginFill(0,0.6);
			this._conatiner.graphics.drawRect(0,0,App.ins.stage.stageWidth,App.ins.stage.stageHeight);
			this._conatiner.graphics.endFill();
			this._conatiner.touchEnabled = true;
		}
		else{
			this._conatiner.graphics.clear();
			this._conatiner.touchEnabled = false;
			if(this._conatiner.contains(this))
				this._conatiner.removeChild(this);
			this._backImg.dispos();
		}

	}
}