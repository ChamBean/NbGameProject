class MainView extends eui.Component implements  eui.UIComponent {
	private vipBtn:eui.Button;
	private rankBtn:eui.Button;
	private roleBtn:eui.Button;
	private skillBtn:eui.Button;
	private equipBtn:eui.Button;
	private bagBtn:eui.Button;
	private shopBtn:eui.Button;
	private headImg:eui.Image;
	private nameTxt:eui.Label;
	private lvlTxt:eui.Label;
	private yuanbaoTxt:eui.Label;
	private yinbiTxt:eui.Label;
	
	private _viplvlImg:CustomNumImg;
	private _fightNumImg:CustomNumImg;
	
	private testBtn:eui.Button = null;
	private _roleData:PlayerInfoData = null;

	private _module:MainModule;

	private _welcomView:WelcomView = null;
	public constructor(module:MainModule) {
		super();
		this._module = module;
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE,this.onCreateComplete,this);
	}

	private onCreateComplete(e:eui.UIEvent):void{
		this._viplvlImg = new CustomNumImg('5');
		this._viplvlImg.x = 150;
		this._viplvlImg.y = 98;
		this.addChild(this._viplvlImg)
		this._fightNumImg = new CustomNumImg('4');
		this._fightNumImg.x = 165;
		this._fightNumImg.y = 52;
		this.addChild(this._fightNumImg);
		this.addEvent();

		this._welcomView = new WelcomView();
		this._welcomView.isPop = true;
	}

	public setRoleData(data:PlayerInfoData):void{
		this._roleData = data;
		this.nameTxt.text = data.name;
		this.lvlTxt.text = data.level + '级';
		this.yuanbaoTxt.text = data.yuanbao.toString();
		this.yinbiTxt.text = data.yinbi.toString();
		this.headImg.source = 'uihead' + data.job + data.sex + '_png';
		this._viplvlImg.upDataNum(data.vipLvl.toString());
		this._fightNumImg.upDataNum(data.fightNum.toString());
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}
	
	private addEvent():void{
		this.testBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTestHandler,this);
	}

	private onTestHandler(e:egret.TouchEvent):void{
		App.ins.moduleManager.openModule(ModuleIdStatic.CHAT_MODULE);
	}
}