var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.call(this);
        this._nameTxt = null;
        /**是否是我自己的形象 */
        this.isSelf = false;
        this.touchEnabled = true;
        var txt = new egret.TextField();
        txt.textAlign = egret.HorizontalAlign.CENTER;
        txt.size = 14;
        txt.filters = [new egret.GlowFilter(0, 1, 3, 3, 2, 1)];
        txt.text = '12324';
        this._nameTxt = txt;
        this.addChild(txt);
        this._avatar.addEventListener(SceneEventName.UPDATA_ROLE_SIZE, this.refreshBodySize, this);
    }
    var d = __define,c=Player,p=c.prototype;
    p.refreshBodySize = function (e) {
        this._nameTxt.text = this.roleData.name;
        this._nameTxt.width = this._nameTxt.textWidth + 3;
        this._nameTxt.x = -this._nameTxt.width / 2;
        this._nameTxt.y = -this._avatar.bodyHeight - 3;
    };
    p.move = function () {
        if (this._targetPoint == null) {
            return;
        }
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
        if (this.isSelf) {
            GameDispatcher.ins.dispatchEventWith(SceneEventName.MY_ROLE_CHANGE_POSITION, false, { x: this.x, y: this.y });
        }
    };
    p.setRoleData = function (roleData) {
        roleData.type = RoleType.TYPE_PLAYER;
        _super.prototype.setRoleData.call(this, roleData);
    };
    p.remove = function () {
        this._avatar.removeEventListener(SceneEventName.UPDATA_ROLE_SIZE, this.refreshBodySize, this);
        this._nameTxt.filters = null;
        this.removeChild(this._nameTxt);
        this._nameTxt = null;
        _super.prototype.remove.call(this);
    };
    return Player;
}(BaseRole));
egret.registerClass(Player,'Player');
//# sourceMappingURL=Player.js.map