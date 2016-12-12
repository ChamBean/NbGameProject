var PlayerInfoData = (function (_super) {
    __extends(PlayerInfoData, _super);
    function PlayerInfoData() {
        _super.call(this);
        /**元宝数 */
        this.yuanbao = 0;
        /**银币数 */
        this.yinbi = 10000;
        /**vip等级 */
        this.vipLvl = 0;
        /**战斗力 */
        this.fightNum = 1000;
    }
    var d = __define,c=PlayerInfoData,p=c.prototype;
    return PlayerInfoData;
}(BaseRoleData));
egret.registerClass(PlayerInfoData,'PlayerInfoData');
//# sourceMappingURL=PlayerInfoData.js.map