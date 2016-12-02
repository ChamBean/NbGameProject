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
        var sp = new egret.Shape();
        sp.graphics.beginFill(0xf0ff00);
        sp.graphics.drawRect(0, 0, 480, 800);
        sp.graphics.endFill;
        this.addChild(sp);
        var layer = this;
        this._roleArr = new Array();
        // addRole();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.move, this);
        for (var i = 0; i < 18; i++) {
            addRole();
        }
        function addRole() {
            // this.load();
            var data = new BaseRoleData();
            data.dir = 4; //Math.floor(Math.random() * 7);
            data.sex = Math.floor(Math.random() * 1.9);
            data.dress = Math.floor(Math.random() * 2.9);
            var index = Math.floor(Math.random() * 3.9);
            var obj = RoleState.STATES;
            var state = obj[index];
            data.state = RoleState.ROLE_STAND;
            var role = new Player();
            layer.addChild(role);
            role.x = 30 + Math.random() * 450;
            role.y = 100 + Math.random() * 750;
            role.setRoleData(data);
            layer._roleArr.push(role);
        }
    };
    p.move = function (event) {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.move, this);
        var role = null;
        for (var i = 0; i < this._roleArr.length; i++) {
            role = this._roleArr[i];
            role.randomMove();
        }
        // if(event.target == role)
        //     role = event.target;
        // var p:egret.Point = new egret.Point(event.localX,event.localY);
        // var arr:Array<egret.Point> = [p];
        // role.startMove(arr);
    };
    return MapAvatarLayer;
}(BaseMapLayer));
egret.registerClass(MapAvatarLayer,'MapAvatarLayer');
//# sourceMappingURL=MapAvatarLayer.js.map