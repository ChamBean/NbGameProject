class Player extends BaseRole{
	private _nameTxt:egret.TextField = null;
	/**是否是我自己的形象 */
	public isSelf:boolean = false;
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
	public set isMoving(value:boolean)
	{
		this._isMoving = value;
		if(value)
		{
			LoopManager.addToFrame(this._onlyKey,this.loop,this);
		}
		else
		{
			LoopManager.removeFromFrame(this._onlyKey);
			if(this._autoMove){
			this._autoMove = false;
			this.autoMove();
			}
		}
	} 

	private _autoMove:boolean = false;
	public autoMove():void{
		if(this._autoMove){
			this._autoMove = false;
			this.stopMove();
			return;
		}
		this._autoMove = true;
		var tarX:number = this.x + Math.floor(Math.random() * 800) - 400;
		var tarY:number = this.x + Math.floor(Math.random() * 800) - 400;
		var mapVo:MapVo = SceneManager.ins.mapData;
		if((tarX + 200) > mapVo.mapWidth){
			tarX = mapVo.mapWidth - 200;
		}
		if(tarX - 200 < 0){
			tarX = 200;
		}
		if(tarY + 200 > mapVo.mapHeight){
			tarY = mapVo.mapHeight - 200;
		}
		if(tarY - 200 < 0){
			tarY = 200;
		}
		SceneManager.ins.clickMap(tarX,tarY);
	}

	private refreshBodySize(e:egret.Event):void
	{
		this._nameTxt.text = this.roleData.name;
		this._nameTxt.width = this._nameTxt.textWidth + 3;
		this._nameTxt.x = -this._nameTxt.width/2;
		this._nameTxt.y = -this._avatar.bodyHeight - 5;

	}

	protected move() : void
	{
		if(this._targetPoint == null)
		{
			return;
		}
		var curTime:number = egret.getTimer();
		var moveTime:number = (curTime - this._startTime) / 1000;
		this.x = Math.floor(this._startPoint.x + this._curSpeedX * moveTime);
		this.y = Math.floor(this._startPoint.y + this._curSpeedY * moveTime);
		if(curTime >= this._endTime)
		{
			this.x = this._targetPoint.x;
			this.y = this._targetPoint.y;
			if (this._movePaths != null && this._movePaths.length > 0)
			{
				this.doNextMove();
			}else
			{
				if(this.runEndFunc){
					this.runEndFunc();
					this.runEndFunc = null;
				}
				this.doStandAct();
			}
		}
		if(this.isSelf){
			GameDispatcher.ins.dispatchEventWith(SceneEventName.MY_ROLE_CHANGE_POSITION,{x:this.x,y:this.y});
		}
	}

	public setRoleData(roleData:BaseRoleData):void{
		roleData.type = RoleType.TYPE_PLAYER;
		super.setRoleData(roleData);
	}

	public remove():void{
		this._avatar.removeEventListener(SceneEventName.UPDATA_ROLE_SIZE,this.refreshBodySize,this);
		this._nameTxt.filters = null;
		this.removeChild(this._nameTxt);
		this._nameTxt = null;
		super.remove();
	}
}