/**
 * 单例派发事件类
 * @author Bean
 * @since 2016.12.04
 */
var GameDispatcher = (function (_super) {
    __extends(GameDispatcher, _super);
    function GameDispatcher() {
        _super.call(this);
        GameDispatcher._dispatcher = new egret.EventDispatcher();
    }
    var d = __define,c=GameDispatcher,p=c.prototype;
    d(GameDispatcher, "ins"
        ,function () {
            if (GameDispatcher._ins == null)
                GameDispatcher._ins = new GameDispatcher();
            return GameDispatcher._ins;
        }
    );
    p.dispatchEvent = function (event) {
        return _super.prototype.dispatchEvent.call(this, event);
        // return GameDispatcher._dispatcher.dispatchEvent(event);
    };
    p.dispatchEventWith = function (type, data) {
        return _super.prototype.dispatchEventWith.call(this, type, false, data);
        // return GameDispatcher._dispatcher.dispatchEventWith(type,false,data);
    };
    return GameDispatcher;
}(egret.EventDispatcher));
egret.registerClass(GameDispatcher,'GameDispatcher');
//# sourceMappingURL=GameDispatcher.js.map