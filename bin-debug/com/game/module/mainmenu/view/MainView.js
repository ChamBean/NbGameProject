var MainView = (function (_super) {
    __extends(MainView, _super);
    function MainView(module) {
        _super.call(this);
        this.testBtn = null;
        this._roleData = null;
        this._welcomView = null;
        this._module = module;
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onCreateComplete, this);
    }
    var d = __define,c=MainView,p=c.prototype;
    p.onCreateComplete = function (e) {
        this._viplvlImg = new CustomNumImg('5');
        this._viplvlImg.x = 150;
        this._viplvlImg.y = 98;
        this.addChild(this._viplvlImg);
        this._fightNumImg = new CustomNumImg('4');
        this._fightNumImg.x = 165;
        this._fightNumImg.y = 52;
        this.addChild(this._fightNumImg);
        this.addEvent();
        this._welcomView = new WelcomView();
        this._welcomView.isPop = true;
    };
    p.setRoleData = function (data) {
        this._roleData = data;
        this.nameTxt.text = data.name;
        this.lvlTxt.text = data.level + '级';
        this.yuanbaoTxt.text = data.yuanbao.toString();
        this.yinbiTxt.text = data.yinbi.toString();
        this.headImg.source = 'uihead' + data.job + data.sex + '_png';
        this._viplvlImg.upDataNum(data.vipLvl.toString());
        this._fightNumImg.upDataNum(data.fightNum.toString());
    };
    p.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    p.addEvent = function () {
        this.testBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTestHandler, this);
    };
    p.onTestHandler = function (e) {
        App.ins.moduleManager.openModule(ModuleIdStatic.CHAT_MODULE);
    };
    return MainView;
}(eui.Component));
egret.registerClass(MainView,'MainView',["eui.UIComponent"]);
//# sourceMappingURL=MainView.js.map