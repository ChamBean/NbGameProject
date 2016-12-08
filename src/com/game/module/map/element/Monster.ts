class Monster extends BaseRole{
	public constructor() {
		super();
	}

	public setRoleData(roleData:BaseRoleData):void{
		roleData.type = RoleType.TYPE_MONSTER;
		super.setRoleData(roleData);
	}
}