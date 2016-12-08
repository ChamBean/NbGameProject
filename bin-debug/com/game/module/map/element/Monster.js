var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster() {
        _super.call(this);
    }
    var d = __define,c=Monster,p=c.prototype;
    p.setRoleData = function (roleData) {
        roleData.type = RoleType.TYPE_MONSTER;
        _super.prototype.setRoleData.call(this, roleData);
    };
    return Monster;
}(BaseRole));
egret.registerClass(Monster,'Monster');
//# sourceMappingURL=Monster.js.map