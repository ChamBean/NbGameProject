class BaseRole extends egret.DisplayObjectContainer{
	private static _index:number = 0;
	protected _avatar:Avatar;
	private _roleData:BaseRoleData;

	private _startPoint:egret.Point = null;

	private _isMoving:boolean = false;
	private _onlyKey:string = '';
	public constructor() {
		super();
		BaseRole._index++;
		this._onlyKey = 'baseRole'+BaseRole._index;
		this._startPoint = new egret.Point(0,0);
		this._avatar = new Avatar();
		this.addChild(this._avatar);
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
		}
	}

	public randomMove():void
	{
		var arr:Array<egret.Point> = [];
		var x:number = this.x;
		var y:number = this.y;
		var offX:number = Math.random() * 70 - 10;
		var offY:number = Math.random() * 70 - 10;
		for(var i:number = 0;i < 8;i++)
		{
			x += offX;
			y += offY;
			if(x < 50 || x > this.stage.stageWidth - 50){
				offX = -offX;
				x += offX;
			}
			if(y < 90 || y > this.stage.stageHeight - 90){
				offY = -offY;
				y += offY;
			}
			var point:egret.Point = new egret.Point(x,y);
			arr.push(point);
		}
		this.startMove(arr);

	}

	public get isMoving():boolean
	{
		return this._isMoving;
	}

	public get roleData():BaseRoleData{
		return this._roleData;
	}

	public setRoleData(roleData:BaseRoleData):void{
		this._roleData = roleData;
		this._avatar.setAvatarData(roleData);
	}

	private loop(role:BaseRole):void
	{
		if(!role._isMoving)
			return;
		role.move();
	}

	private move():void
	{
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
				this.randomMove();
				// this.normal();
			}
		}
	}

	public stopMove():void
	{
		this.isMoving = false;
		this.removePath();
		this.doStandAct();
	}
	/**执行跑的动作 */
	public doRunAct():void{
		this._roleData.state = RoleState.ROLE_RUN;
		this._avatar.upDataAct();
	}
	/**执行站立动作 */
	private doStandAct():void{
		this._targetPoint = null;
		this._roleData.state = RoleState.ROLE_STAND;
		this.isMoving = false;
		this._avatar.upDataAct();
	}

	/**执行攻击动作 */
	private doAttackAct():void{
		this._targetPoint = null;
		this._roleData.state = RoleState.ROLE_STAND;
		this.isMoving = false;
		this._avatar.upDataAct();
	}

	private removePath():void
	{
		if(this._movePaths && this._movePaths.length > 0)
			this._movePaths.length = 0;
	}

	private _movePaths:Array<egret.Point>;
	public startMove(paths:Array<egret.Point>):void{
		this._movePaths = paths;
		if(paths.length == 0){
			this.doStandAct();
		}
		else{
			this.doNextMove();
		}
	}
	private _targetPoint:egret.Point;
	private _curSpeedX:number;
	private _curSpeedY:number;
	private _startTime:number;
	private _endTime:number;
	private doNextMove():void{
		this.isMoving = true;
		var paths = this._movePaths;
		if(paths != null && paths.length > 0)
		{
			this._startPoint.x = this.x;
			this._startPoint.y = this.y;
			this._targetPoint = paths.pop();
			var startX:number = this._startPoint.x;
			var startY:number = this._startPoint.y;
			var tarX:number = this._targetPoint.x;
			var tarY:number = this._targetPoint.y;
			var distance:number = egret.Point.distance(this._startPoint,this._targetPoint);
			var moveTime:number = distance/this._roleData.speed;
			if(moveTime == 0)
			{
				moveTime = 0.001;
			}
			var dir:number = this.getDirection(this._targetPoint);
			this._roleData.dir = dir;
			this._startTime = egret.getTimer();
			this._curSpeedX = (tarX - startX)/moveTime;
			this._curSpeedY = (tarY - startY)/moveTime;
			this._endTime = this._startTime + Math.floor(moveTime * 1000);
			this.doRunAct();
		}
	}

	private getDirection(tarPoint:egret.Point):number{
		var tarX:number = tarPoint.x;
		var tarY:number = tarPoint.y;
		var dir:number = 0;
		var disX:number = tarX - this.x;
		var disY:number = this.y - tarY;
		if(disX == 0 && disY == 0)
			return this.roleData.dir;
		var angle:Number = Math.atan2(disY, disX) * 180 / Math.PI;
		if(angle >= 67 && angle < 112)
			return SceneType.TOP;
		else if(angle >= 22 && angle < 67)
			return SceneType.RIGHT_TOP;
		else if(angle >= -22 && angle < 22)
			return SceneType.RIGHT;
		else if(angle >= -67 && angle < -22)
			return SceneType.RIGHT_BOTTOME;
		else if(angle >= -112 && angle < -67)
			return SceneType.BOTTOM;
		else if(angle >= -157 && angle < -112)
			return SceneType.LEFT_BOTTOME;
		else if(angle < -157 || angle >= 157)
			return SceneType.LEFT;
		else if(angle >= 112 && angle < 157)
			return SceneType.LEFT_TOP;
		return dir;
	}

	public remove():void
	{
		if(this.parent)
			this.parent.removeChild(this);
		this.isMoving = false;
		this._roleData = null;
		// this._avatar.
	}

}