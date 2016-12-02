var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.call(this);
        this._nameTxt = null;
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
        this._nameTxt.width = this._nameTxt.textWidth + 3;
        this._nameTxt.x = -this._nameTxt.width / 2;
        this._nameTxt.y = -this._avatar.bodyHeight - 3;
    };
    return Player;
}(BaseRole));
egret.registerClass(Player,'Player');
//# sourceMappingURL=Player.js.map