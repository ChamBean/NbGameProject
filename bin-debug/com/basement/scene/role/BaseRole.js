var BaseRole = (function (_super) {
    __extends(BaseRole, _super);
    function BaseRole() {
        _super.call(this);
        this._nameTxt = null;
        this._avatar = new Avatar();
        this.addChild(this._avatar);
    }
    var d = __define,c=BaseRole,p=c.prototype;
    d(p, "roleData"
        ,function () {
            return this._roleData;
        }
    );
    p.setRoleData = function (roleData) {
        this._roleData = roleData;
        this._avatar.setAvatarData(roleData);
        this._avatar.upDataAct(roleData.dir, roleData.state);
    };
    p.resetPosition = function () {
    };
    return BaseRole;
}(egret.DisplayObjectContainer));
egret.registerClass(BaseRole,'BaseRole');
//# sourceMappingURL=BaseRole.js.map