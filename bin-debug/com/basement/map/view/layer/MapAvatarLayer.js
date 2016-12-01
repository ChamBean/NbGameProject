/**
 * @des 场景形象层
 * @author Bean
 */
var MapAvatarLayer = (function (_super) {
    __extends(MapAvatarLayer, _super);
    function MapAvatarLayer() {
        _super.call(this);
    }
    var d = __define,c=MapAvatarLayer,p=c.prototype;
    p.init = function () {
        var layer = this;
        this._roleArr = new Array();
        addRole();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, addRole, this);
        for (var i = 0; i < 1; i++) {
            addRole(null);
        }
        function addRole(event) {
            if (event === void 0) { event = null; }
            var data = new BaseRoleData();
            data.dir = Math.floor(Math.random() * 7);
            data.sex = Math.floor(Math.random() * 1.9);
            data.dress = Math.floor(Math.random() * 2.9);
            var index = Math.floor(Math.random() * 3.9);
            var obj = RoleState.STATES;
            var state = obj[index];
            data.state = state;
            var role = new BaseRole();
            layer.addChild(role);
            role.x = 30 + Math.random() * 450;
            role.y = 100 + Math.random() * 750;
            role.setRoleData(data);
            layer._roleArr.push(role);
            // egret.log('舞台宽度'+ layer.stage.stageWidth,'     舞台高度'+ layer.stage.stageHeight);
        }
        var dir = 0;
        egret.setInterval(function () {
            for (var i = 0; i < layer._roleArr.length; i++) {
                var role = layer._roleArr[i];
                dir = role.roleData.dir;
                dir++;
                if (dir > SceneType.LEFT_TOP)
                    dir = 0;
                role.roleData.dir = dir;
                role.setRoleData(role.roleData);
            }
        }, layer, 2000);
    };
    return MapAvatarLayer;
}(BaseMapLayer));
egret.registerClass(MapAvatarLayer,'MapAvatarLayer');
//# sourceMappingURL=MapAvatarLayer.js.map