class BaseRole extends egret.DisplayObjectContainer{
	private _avatar:Avatar;
	private _roleData:BaseRoleData;
	private _nameTxt:egret.TextField = null;
	public constructor() {
		super();
		this._avatar = new Avatar();
		this.addChild(this._avatar);
	}

	public get roleData():BaseRoleData{
		return this._roleData;
	}

	public setRoleData(roleData:BaseRoleData):void{
		this._roleData = roleData;
		this._avatar.setAvatarData(roleData);
		this._avatar.upDataAct(roleData.dir,roleData.state);
	}

	private resetPosition():void{

	}
}