class BaseRoleData {
	public constructor() {
	}
	/**唯一id */
	public onlyid:number;
	/**名字 */
	public name:string;
	/**职业*/
	public job:number;
	/**服装类型*/
	public dress:number;
	/**性别 0男1女*/
	public sex:number;
	/**角色类型 参照RoleType类*/
	public type:number;
	/**等级*/
	public level:number;
	/**朝向*/
	public dir:number;
	/**玩家状态*/
	public state:string;
	/**玩家所处格子X坐标*/
	public nodeX:number;
	/**玩家所处格子Y坐标*/
	public nodeY:number;
	/**玩家行走速度*/
	public speed:number = 160;
}