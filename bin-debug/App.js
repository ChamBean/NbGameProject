/**
 * 应用内各种单例类管理中心
 * @author Bean
 * @since 2016.12.04
 */
var App = (function () {
    function App() {
        this.resManager = null;
        this.configManager = null;
        this.socket = null;
    }
    var d = __define,c=App,p=c.prototype;
    p.init = function (stage) {
        this.stage = stage;
        this.socket = new net.SocketManager();
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