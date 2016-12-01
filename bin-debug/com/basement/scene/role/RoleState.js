var RoleState = (function () {
    function RoleState() {
    }
    var d = __define,c=RoleState,p=c.prototype;
    /**url 服装类型 性别 朝向 状态*/
    RoleState.roleUrl = 'resource/art/movie/body/{0}/body00{1}_{2}_{3}{4}';
    /**url 服装类型 性别 朝向 状态*/
    RoleState.ROLEKEY = 'body00{0}_{1}_{2}{3}';
    /**角色状态 站立*/
    RoleState.ROLE_STAND = 's';
    /**角色状态 行走*/
    RoleState.ROLE_RUN = 'r';
    /**角色状态 攻击*/
    RoleState.ROLE_ATTACK = 'a';
    /**角色状态 攻击*/
    RoleState.ROLE_C = 'c';
    RoleState.STATES = { 0: RoleState.ROLE_STAND, 1: RoleState.ROLE_RUN, 2: RoleState.ROLE_ATTACK, 3: RoleState.ROLE_C };
    return RoleState;
}());
egret.registerClass(RoleState,'RoleState');
//# sourceMappingURL=RoleState.js.map