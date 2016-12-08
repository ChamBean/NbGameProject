var App = (function () {
    function App() {
        this.resManager = null;
        this.configManager = null;
    }
    var d = __define,c=App,p=c.prototype;
    p.init = function (stage) {
        this.stage = stage;
        LoopManager.init(stage);
        this.layer = new LayerManager();
        this.resManager = new ResourceManager();
        this.configManager = new LoadConfigManager();
        this.resManager.initLoopClear();
    };
    d(App, "ins"
        ,function () {
            if (App._ins == null)
                App._ins = new App();
            return App._ins;
        }
    );
    return App;
}());
egret.registerClass(App,'App');
//# sourceMappingURL=App.js.map