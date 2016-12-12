/**
 * 创建角色视图类
 * @author Bean
 * @since 2016.12.04
 */
var CreateRoleView = (function (_super) {
    __extends(CreateRoleView, _super);
    function CreateRoleView(module) {
        _super.call(this);
        this.tab1 = null;
        this.tab2 = null;
        this.tab3 = null;
        this.tab4 = null;
        this.tab5 = null;
        this.tab6 = null;
        this.jobImg = null;
        this.jobDesTxt = null;
        this.nameTxt = null;
        this.starBtn = null;
        this.randomBtn = null;
        this._toggleGroup = null;
        this._roleData = null;
        this._module = module;
    }
    var d = __define,c=CreateRoleView,p=c.prototype;
    p.onCreateComplete = function (e) {
        _super.prototype.onCreateComplete.call(this, e);
        var group = new CustomToggleGroup();
        group.addEventListener(egret.Event.CHANGE, this.onToggleChangeHandelr, this);
        this._toggleGroup = group;
        group.setToggleBtn(this.tab1);
        group.setToggleBtn(this.tab2);
        group.setToggleBtn(this.tab3);
        group.setToggleBtn(this.tab4);
        group.setToggleBtn(this.tab5);
        group.setToggleBtn(this.tab6);
        this._roleData = new PlayerInfoData();
        group.selectTab = this.tab1;
        var nameStr = CreateRoleView.names[Math.floor(Math.random() * (CreateRoleView.names.length - 1))];
        this.nameTxt.text = nameStr;
    };
    p.onStartHandler = function (e) {
        if (this.nameTxt.text == '') {
            Message.show('请创建一个名字');
            return;
        }
        this._roleData.name = this.nameTxt.text;
        this._module.createRole(this._roleData);
    };
    p.onRandomHandler = function (e) {
        var nameStr = CreateRoleView.names[Math.floor(Math.random() * (CreateRoleView.names.length - 1))];
        this.nameTxt.text = nameStr;
    };
    p.onNameChangeHandler = function (e) {
        var txt = e.target;
        if (txt.text.length > 8)
            txt.text = txt.text.slice(0, 8);
    };
    p.onToggleChangeHandelr = function (e) {
        var group = e.target;
        var tab = group.selectTab;
        var job = 0;
        var sex = 0;
        var jobImgSrc = '';
        switch (tab) {
            case this.tab1:
                jobImgSrc = 'cjsc_06';
                sex = 0;
                job = 1;
                break;
            case this.tab2:
                jobImgSrc = 'cjsc_06';
                sex = 1;
                job = 1;
                break;
            case this.tab3:
                job = 2;
                jobImgSrc = 'cjsc_07';
                sex = 0;
                break;
            case this.tab4:
                jobImgSrc = 'cjsc_07';
                sex = 1;
                job = 2;
                break;
            case this.tab5:
                jobImgSrc = 'cjsc_08';
                sex = 0;
                job = 3;
                break;
            case this.tab6:
                jobImgSrc = 'cjsc_08';
                sex = 1;
                job = 3;
                break;
        }
        this.jobImg.source = jobImgSrc;
        this.jobDesTxt.text = CreateRoleView.desObj[job];
        this._roleData.job = job;
        this._roleData.sex = sex;
    };
    p.dispos = function () {
        this.isPop = false;
        this.removeEvent();
        RES.destroyRes('cjjs');
    };
    p.addEvent = function () {
        this.nameTxt.addEventListener(egret.Event.CHANGE, this.onNameChangeHandler, this);
        this.starBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartHandler, this);
        this.randomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRandomHandler, this);
    };
    p.removeEvent = function () {
        this._toggleGroup.removeEventListener(egret.Event.CHANGE, this.onToggleChangeHandelr, this);
        this.nameTxt.removeEventListener(egret.Event.CHANGE, this.onNameChangeHandler, this);
        this.starBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartHandler, this);
        this.randomBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRandomHandler, this);
    };
    p.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CreateRoleView.names = ['2呵', '2v', '卖萌的婷婷', '榔头', '傻z', '逗比盖', '大表哥', '土豪炳', '逗比摸头', '流星'];
    CreateRoleView.desObj = { 1: '近战物理职业，通过暴力摧毁敌人', 2: '魔法职业，拥有最强大的远程群体攻击', 3: '兼顾远程输出和辅助的职业，还能召唤宠物攻击' };
    return CreateRoleView;
}(BaseView));
egret.registerClass(CreateRoleView,'CreateRoleView',["eui.UIComponent"]);
//# sourceMappingURL=CreateRoleView.js.map