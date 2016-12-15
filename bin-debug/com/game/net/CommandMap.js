var CommandMap = (function () {
    function CommandMap() {
        this._commands = null;
        this._commands = {
            1100: Scmd1100,
            0: 0
        };
    }
    var d = __define,c=CommandMap,p=c.prototype;
    d(p, "commands"
        ,function () {
            return this._commands;
        }
    );
    return CommandMap;
}());
egret.registerClass(CommandMap,'CommandMap');
//# sourceMappingURL=CommandMap.js.map