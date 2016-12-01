class RoleState {
	/**url 服装类型 性别 朝向 状态*/
	public static roleUrl:string = 'resource/art/movie/body/{0}/body00{1}_{2}_{3}{4}';
    /**url 服装类型 性别 朝向 状态*/
	public static ROLEKEY:string = 'body00{0}_{1}_{2}{3}';

	/**角色状态 站立*/
	public static ROLE_STAND:string = 's';
	/**角色状态 行走*/
	public static ROLE_RUN:string = 'r';
	/**角色状态 攻击*/
	public static ROLE_ATTACK:string = 'a';
	/**角色状态 攻击*/
	public static ROLE_C:string = 'c';
	public static STATES:any = {0:RoleState.ROLE_STAND,1:RoleState.ROLE_RUN,2:RoleState.ROLE_ATTACK,3:RoleState.ROLE_C};
	public constructor() {
	}
}