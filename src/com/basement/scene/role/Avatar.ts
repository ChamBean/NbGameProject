/**
 * 场景角色形象实现
 * @author Bean
 * @since 2016.12.04
 */
class Avatar extends egret.DisplayObjectContainer{

	/**url  性别 key*/
	private static roleUrl:string = 'resource/art/movie/body/{0}/{1}';
    /**url 服装类型 性别 朝向 状态*/
	private static ROLEKEY:string = 'body00{0}_{1}_{2}{3}';
    /**url 朝向 状态*/
	private static WEAPONKEY:string = 'weapon000_1_{0}{1}';
	/**url  */
	private static WEAPONURL:string = 'resource/art/movie/weapon/{0}';

	private _newDir:number = 0;
	private _bodyMc:CustomMoviClip;
	private _weaponMc:CustomMoviClip;
	private _roleData:BaseRoleData;
	public bodyHeight:number = 0;
	public refreshBodyHandler:Function;
	public constructor() {
		super();
		var mc:CustomMoviClip = new CustomMoviClip;
		this._bodyMc = mc;
		this._bodyMc.addEventListener(EventName.MOVIE_CREATE_SUCCESS,this.createBodyComplete,this);
		// this._bodyMc.frameRate = 12;
		this.addChild(mc);
	}

	public setAvatarData(data:BaseRoleData):void
	{
		this._roleData = data;
		this.upDataAct();
	}

	public upDataAct():void
	{
		var dir:number = this._roleData.dir;
		var state:string = this._roleData.state;
		this._newDir = this.getFiveDir(dir,this._bodyMc);
		var mcName:string = StringUtil.substitute(Avatar.ROLEKEY,this._roleData.dress,this._roleData.sex,this._newDir,state);
		// var key:string = StringUtil.substitute(Avatar.roleUrl,this._roleData.sex,this._roleData.dress,this._roleData.sex,this._newDir,state);
		var key = StringUtil.substitute(Avatar.roleUrl,this._roleData.sex,mcName);
		this._bodyMc.startLoad(key,mcName,LoadPriorityEnum.AVATAR_PRIORITY);
		this.checkWeapon();
	}

	private onBodyEnterFrame():void{
		if(this._weaponMc && this._weaponMc.movieClipData != null)
			this._weaponMc.gotoAndStop(this._bodyMc.currentFrame);
	}

	private createBodyComplete(e:egret.Event):void {
		var avatar:Avatar = this;
		if(avatar.bodyHeight < avatar._bodyMc.height)
		{
			avatar.bodyHeight = avatar._bodyMc.height;
			avatar.dispatchEvent(new egret.Event(SceneEventName.UPDATA_ROLE_SIZE,false));
		}
		// if(this._weaponMc){

		// }
	}

	/**检查是否需要加载武器mc */
	private checkWeapon():void{
		if(this._roleData.type == RoleType.TYPE_PLAYER){
			if(this._weaponMc == null)
			{
				this._weaponMc = new CustomMoviClip();
				this._weaponMc.addEventListener(EventName.MOVIE_CREATE_SUCCESS,this.createWeaponComplete,this);
				this.addChild(this._weaponMc);
			}
			var dir:number = this._roleData.dir;
			var state:string = this._roleData.state;
			var mcName:string = StringUtil.substitute(Avatar.WEAPONKEY,this._newDir,state);
			this._newDir = this.getFiveDir(dir,this._weaponMc);
			var key = StringUtil.substitute(Avatar.WEAPONURL,mcName);
			this._weaponMc.startLoad(key,mcName,LoadPriorityEnum.AVATAR_PRIORITY);
			if(!this._bodyMc.hasEventListener(egret.Event.ENTER_FRAME))
				this._bodyMc.addEventListener(egret.Event.ENTER_FRAME,this.onBodyEnterFrame,this);
		}
		else if(this._bodyMc.hasEventListener(egret.Event.ENTER_FRAME)){
			this._bodyMc.removeEventListener(egret.Event.ENTER_FRAME,this.onBodyEnterFrame,this);
		}
	}

	private createWeaponComplete():void{
		
	}


	private getFiveDir($dir:number,mc:egret.MovieClip):number
	{
		var newDir:number = $dir;
		var scalex:number = 1;
		switch($dir)
		{
			case SceneType.LEFT_BOTTOME:
			scalex = -1;
			newDir = SceneType.RIGHT_BOTTOME;
			break;
			case SceneType.LEFT:
			scalex = -1;
			newDir = SceneType.RIGHT;
			break;
			case SceneType.LEFT_TOP:
			scalex = -1;
			newDir = SceneType.RIGHT_TOP;
			break;
		}
		mc.scaleX = scalex;
		return newDir;
	}
	public stop():void
	{
		this._bodyMc.stop();
		if(this._weaponMc)
			this._weaponMc.gotoAndStop(this._bodyMc.currentFrame);
	}

	public gotoAndStop(frame:any):void
	{
		this._bodyMc.gotoAndStop(frame);
		if(this._weaponMc)
			this._weaponMc.gotoAndStop(this._bodyMc.currentFrame);
	}
	public gotoAndPlay(frame:any,playTimes:number=0):void
	{
		this._bodyMc.gotoAndPlay(frame,playTimes);
		if(this._weaponMc)
			this._weaponMc.gotoAndPlay(frame,playTimes);
	}

	public clear():void{
		this._roleData = null;
		this._bodyMc.removeEventListener(EventName.MOVIE_CREATE_SUCCESS,this.createBodyComplete,this);
		this._bodyMc.dispos();
		this._bodyMc = null;
		if(this._weaponMc)
		{
			this._weaponMc.removeEventListener(EventName.MOVIE_CREATE_SUCCESS,this.createWeaponComplete,this);
			this._weaponMc.dispos();
			this._weaponMc = null;
		}
	}

}