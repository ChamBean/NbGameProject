class Avatar extends egret.DisplayObjectContainer{

	private _bodyMc:egret.MovieClip;
	private _roleData:BaseRoleData;
	public bodyHeight:number = 0;
	public refreshBodyHandler:Function;
	public constructor() {
		super();

		// var sp:egret.Shape = new egret.Shape();
		// sp.graphics.beginFill(0xff0000,1);
		// sp.graphics.drawRect(0,0,10,10);
		// sp.graphics.endFill;
		// // sp.anchorOffsetX = 100;
		// this.addChild(sp);
		var mc:egret.MovieClip = new egret.MovieClip();
		this._bodyMc = mc;
		// this._bodyMc.frameRate = 12;
		this.addChild(mc);
	}

	public setAvatarData(data:BaseRoleData):void
	{
		this._roleData = data;
		this.upDataAct();
	}

	private _newDir:number = 0;
	private _urlKey:string;
	public upDataAct():void
	{
		var dir:number = this._roleData.dir;
		var state:string = this._roleData.state;
		this._newDir = this.getFiveDir(dir);
		this._roleData.state = state;
		this._resData = null;
		this._texture = null;
		this._urlKey = StringUtil.substitute(RoleState.roleUrl,this._roleData.sex,this._roleData.dress,this._roleData.sex,this._newDir,state);
		// LoadManager.ins.addGroupLoad(key,this.onLoadComplete,this);
		// LoadManager.ins.addTextLoad(this._urlKey,this.onLoadTxtComplete,this);
		LoadConfigManager.ins.getConfig(this._urlKey + '.json',this.onLoadTxtComplete,this,LoadPriorityEnum.EFFECT_PRIORITY);
		ResourceManager.ins.getImageRes(this._urlKey + '.png',this.onLoadImgComplete,this,LoadPriorityEnum.EFFECT_PRIORITY);
		egret.log('生成对象地址' + this._urlKey);
	}

	private onLoadTxtComplete(obj:any):void
	{
		var avatar:Avatar = obj.data;
		avatar._resData = JSON.parse(obj.cfg);
		avatar.createMovieClip();
		// var key:string = StringUtil.substitute(RoleState.roleUrl,avatar._roleData.dress,avatar._roleData.sex,avatar._newDir,avatar._roleData.state);
	}

	private onLoadImgComplete(obj:any):void
	{
		var avatar:Avatar = obj.data;
		var cmd:CBitmapData = obj.bmd;
        //创建纹理对象
		if(avatar._texture == null)
			avatar._texture = new egret.Texture();
        avatar._texture.bitmapData = cmd.bitmapData;
		avatar.createMovieClip();
	}

	private _resData:any;
	private _texture:egret.Texture;
	

	private createMovieClip():void {
		var avatar:Avatar = this;
		if(avatar._resData == null || avatar._texture == null || avatar._texture.bitmapData == null)
			return;
        var mcFactor:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(this._resData,this._texture);
		// if(this.scaleX == -1)
			// this.anchorOffsetX
		var mcName:string = StringUtil.substitute(RoleState.ROLEKEY,avatar._roleData.dress,avatar._roleData.sex,avatar._newDir,avatar._roleData.state)
		avatar._bodyMc.movieClipData = mcFactor.generateMovieClipData(mcName);
		avatar._bodyMc.play(-1);
		avatar._bodyMc.addEventListener(egret.Event.LOOP_COMPLETE, function (){
            // egret.log("LOOP_COMPLETE");
			// egret.log('++++帧频：' + avatar._bodyMc.frameRate);
        }, this);
		if(this.bodyHeight < this._bodyMc.height)
		{
			this.bodyHeight = this._bodyMc.height;
			this.dispatchEvent(new egret.Event(SceneEventName.UPDATA_ROLE_SIZE,false));
		}
		egret.log('创建对象成功'+mcName);
	}
	
	private getFiveDir($dir:number):number
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
		this._bodyMc.scaleX = scalex;
		return newDir;
	}
	public stop():void
	{
		this._bodyMc.stop();
	}

	public gotoAndStop(frame:any):void
	{
		this._bodyMc.gotoAndStop(frame);
	}
	public gotoAndPlay(frame:any,playTimes:number=0):void
	{
		this._bodyMc.gotoAndPlay(frame,playTimes);
	}

}