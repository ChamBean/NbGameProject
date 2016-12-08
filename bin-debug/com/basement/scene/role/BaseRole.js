var BaseRole = (function (_super) {
    __extends(BaseRole, _super);
    function BaseRole() {
        _super.call(this);
        this._startPoint = null;
        this._isMoving = false;
        this._onlyKey = '';
        this.runEndFunc = null;
        BaseRole._index++;
        this._onlyKey = 'baseRole' + BaseRole._index;
        this._startPoint = new egret.Point(0, 0);
        this._avatar = new Avatar();
        this.addChild(this._avatar);
    }
    var d = __define,c=BaseRole,p=c.prototype;
    d(p, "isMoving"
        ,function () {
            return this._isMoving;
        }
        ,function (value) {
            this._isMoving = value;
            if (value) {
                LoopManager.addToFrame(this._onlyKey, this.loop, this);
            }
            else {
                LoopManager.removeFromFrame(this._onlyKey);
            }
        }
    );
    d(p, "roleData"
        ,function () {
            return this._roleData;
        }
    );
    p.setRoleData = function (roleData) {
        this._roleData = roleData;
        this._avatar.setAvatarData(roleData);
    };
    p.loop = function (role) {
        if (!role._isMoving)
            return;
        role.move();
    };
    p.move = function () {
        var curTime = egret.getTimer();
        var moveTime = (curTime - this._startTime) / 1000;
        this.x = Math.floor(this._startPoint.x + this._curSpeedX * moveTime);
        this.y = Math.floor(this._startPoint.y + this._curSpeedY * moveTime);
        if (curTime >= this._endTime) {
            this.x = this._targetPoint.x;
            this.y = this._targetPoint.y;
            if (this._movePaths != null && this._movePaths.length > 0) {
                this.doNextMove();
            }
            else {
                if (this.runEndFunc) {
                    this.runEndFunc();
                    this.runEndFunc = null;
                }
                this.doStandAct();
            }
        }
    };
    p.removePath = function () {
        if (this._movePaths && this._movePaths.length > 0)
            this._movePaths.length = 0;
    };
    p.startMove = function (paths, func) {
        if (func === void 0) { func = null; }
        this._movePaths = paths;
        if (paths.length == 0) {
            this.doStandAct();
        }
        else {
            this.runEndFunc = func;
            this.doNextMove();
        }
    };
    p.doNextMove = function () {
        this.isMoving = true;
        var paths = this._movePaths;
        if (paths != null && paths.length > 0) {
            this._startPoint.x = this.x;
            this._startPoint.y = this.y;
            this._targetPoint = paths.pop();
            var startX = this._startPoint.x;
            var startY = this._startPoint.y;
            var tarX = this._targetPoint.x;
            var tarY = this._targetPoint.y;
            var distance = egret.Point.distance(this._startPoint, this._targetPoint);
            var moveTime = distance / this._roleData.speed;
            if (moveTime == 0) {
                moveTime = 0.001;
            }
            var dir = this.getDirection(this._targetPoint);
            this._roleData.dir = dir;
            this._startTime = egret.getTimer();
            this._curSpeedX = (tarX - startX) / moveTime;
            this._curSpeedY = (tarY - startY) / moveTime;
            this._endTime = this._startTime + Math.floor(moveTime * 1000);
            this.doRunAct();
        }
    };
    p.stopMove = function () {
        this.isMoving = false;
        this.removePath();
        this.doStandAct();
    };
    /**执行跑的动作 */
    p.doRunAct = function () {
        this._roleData.state = RoleState.ROLE_RUN;
        this._avatar.upDataAct();
    };
    /**执行站立动作 */
    p.doStandAct = function () {
        this._targetPoint = null;
        this._roleData.state = RoleState.ROLE_STAND;
        this.isMoving = false;
        this._avatar.upDataAct();
    };
    /**执行攻击动作 */
    p.doAttackAct = function () {
        this._targetPoint = null;
        this._roleData.state = RoleState.ROLE_ATTACK;
        this.isMoving = false;
        this._avatar.upDataAct();
    };
    p.getDirection = function (tarPoint) {
        var tarX = tarPoint.x;
        var tarY = tarPoint.y;
        var dir = 0;
        var disX = tarX - this.x;
        var disY = this.y - tarY;
        if (disX == 0 && disY == 0)
            return this.roleData.dir;
        var angle = Math.atan2(disY, disX) * 180 / Math.PI;
        if (angle >= 67 && angle < 112)
            return SceneType.TOP;
        else if (angle >= 22 && angle < 67)
            return SceneType.RIGHT_TOP;
        else if (angle >= -22 && angle < 22)
            return SceneType.RIGHT;
        else if (angle >= -67 && angle < -22)
            return SceneType.RIGHT_BOTTOME;
        else if (angle >= -112 && angle < -67)
            return SceneType.BOTTOM;
        else if (angle >= -157 && angle < -112)
            return SceneType.LEFT_BOTTOME;
        else if (angle < -157 || angle >= 157)
            return SceneType.LEFT;
        else if (angle >= 112 && angle < 157)
            return SceneType.LEFT_TOP;
        return dir;
    };
    p.remove = function () {
        if (this.parent)
            this.parent.removeChild(this);
        this.isMoving = false;
        this._roleData = null;
        this._avatar.clear();
        this.runEndFunc = null;
        this.removePath();
    };
    BaseRole._index = 0;
    return BaseRole;
}(egret.DisplayObjectContainer));
egret.registerClass(BaseRole,'BaseRole');
//# sourceMappingURL=BaseRole.js.map