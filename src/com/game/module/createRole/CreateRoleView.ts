/**
 * 创建角色视图类
 * @author Bean
 * @since 2016.12.04
 */
class CreateRoleView extends BaseView implements  eui.UIComponent {
	public tab1:eui.ToggleButton = null;
	public tab2:eui.ToggleButton = null;
	public tab3:eui.ToggleButton = null;
	public tab4:eui.ToggleButton = null;
	public tab5:eui.ToggleButton = null;
	public tab6:eui.ToggleButton = null;
	public jobImg:eui.Image = null;
	public jobDesTxt:eui.Label = null;
	public nameTxt:eui.TextInput = null;
	public starBtn:eui.Button = null;
	public randomBtn:eui.Button = null;

	private _toggleGroup:CustomToggleGroup = null;

	private _roleData:PlayerInfoData = null;
	private static names:Array<string> = ['2呵','2v','卖萌的婷婷','榔头','傻z','逗比盖','大表哥','土豪炳','逗比摸头','流星'];
	private static desObj:any = {1:'近战物理职业，通过暴力摧毁敌人',2:'魔法职业，拥有最强大的远程群体攻击',3:'兼顾远程输出和辅助的职业，还能召唤宠物攻击'};
	private _module:MainModule;
	public constructor(module:MainModule){
		super();
		this._module = module;
	}

	protected onCreateComplete(e:eui.UIEvent):void{
		super.onCreateComplete(e);
		var group:CustomToggleGroup = new CustomToggleGroup();
		group.addEventListener(egret.Event.CHANGE,this.onToggleChangeHandelr,this);
		this._toggleGroup = group;
		group.setToggleBtn(this.tab1);
		group.setToggleBtn(this.tab2);
		group.setToggleBtn(this.tab3);
		group.setToggleBtn(this.tab4);
		group.setToggleBtn(this.tab5);
		group.setToggleBtn(this.tab6);
		this._roleData = new PlayerInfoData();
		group.selectTab = this.tab1;
		var nameStr:string = CreateRoleView.names[Math.floor(Math.random()*(CreateRoleView.names.length-1))];
		this.nameTxt.text = nameStr;
	}

	private onStartHandler(e:egret.Event):void{
		if(this.nameTxt.text == '')
		{
			Message.show('请创建一个名字');
			return;
		}
		this._roleData.name = this.nameTxt.text;
		this._module.createRole(this._roleData);
	}
	private onRandomHandler(e:egret.Event):void{
		var nameStr:string = CreateRoleView.names[Math.floor(Math.random()*(CreateRoleView.names.length-1))];
		this.nameTxt.text = nameStr;
	}
	private onNameChangeHandler(e:egret.Event):void{
		var txt:eui.TextInput = e.target;
		if(txt.text.length > 8)
			txt.text = txt.text.slice(0,8);
	}

	protected onToggleChangeHandelr(e:egret.Event):void{
		var group:CustomToggleGroup = e.target;
		var tab:eui.ToggleButton = group.selectTab;
		var job:number = 0;
		var sex:number = 0;
		var jobImgSrc:string = '';
		switch(tab){
			case this.tab1:
				jobImgSrc = 'cjsc_06';
				sex = 0;
				job = 1;
				break;
			case this.tab2:
				jobImgSrc = 'cjsc_06';
				sex = 1;
				job = 1;
				break;
			case this.tab3:
				job = 2;
				jobImgSrc = 'cjsc_07';
				sex = 0;
				break;
			case this.tab4:
				jobImgSrc = 'cjsc_07';
				sex = 1;
				job = 2;
				break;
			case this.tab5:
				jobImgSrc = 'cjsc_08';
				sex = 0;
				job = 3;
				break;
			case this.tab6:
				jobImgSrc = 'cjsc_08';
				sex = 1;
				job = 3;
				break;
		}
		this.jobImg.source = jobImgSrc;
		this.jobDesTxt.text = CreateRoleView.desObj[job];
		this._roleData.job = job;
		this._roleData.sex = sex;
	}

	public dispos():void
	{
		this.isPop = false;
		this.removeEvent();
		RES.destroyRes('cjjs');
	}

	protected addEvent():void{
		this.nameTxt.addEventListener(egret.Event.CHANGE,this.onNameChangeHandler,this);
		this.starBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartHandler,this);
		this.randomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRandomHandler,this);
	}

	protected removeEvent():void{
		this._toggleGroup.removeEventListener(egret.Event.CHANGE,this.onToggleChangeHandelr,this);
		this.nameTxt.removeEventListener(egret.Event.CHANGE,this.onNameChangeHandler,this);
		this.starBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartHandler,this);
		this.randomBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRandomHandler,this);
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