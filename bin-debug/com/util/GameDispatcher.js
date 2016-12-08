var GameDispatcher = (function (_super) {
    __extends(GameDispatcher, _super);
    function GameDispatcher() {
        _super.call(this);
    }
    var d = __define,c=GameDispatcher,p=c.prototype;
    d(GameDispatcher, "ins"
        ,function () {
            if (GameDispatcher._ins == null)
                GameDispatcher._ins = new GameDispatcher();
            return GameDispatcher._ins;
        }
    );
    return GameDispatcher;
}(egret.EventDispatcher));
egret.registerClass(GameDispatcher,'GameDispatcher');
//# sourceMappingURL=GameDispatcher.js.map