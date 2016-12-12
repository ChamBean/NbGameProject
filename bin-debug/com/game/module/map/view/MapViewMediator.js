/**
 * 场景视图层级管理中心
 * @author Bean
 * @since 2016.12.04
 */
var MapViewMediator = (function () {
    function MapViewMediator(parent) {
        this._mapBackLayer = null;
        this._mapAvatarLayer = null;
        this._mapEffectLayer = null;
        this._parent = parent;
        this.init();
    }
    var d = __define,c=MapViewMediator,p=c.prototype;
    p.init = function () {
        this._map = new MapContainer();
        this._parent.addChild(this._map);
        this._mapBackLayer = new MapBackGroundLayer();
        this._mapEffectLayer = new MapEffectLayer();
        this._mapAvatarLayer = new MapAvatarLayer();
        this._map.addChild(this._mapBackLayer);
        this._map.addChild(this._mapEffectLayer);
        this._map.addChild(this._mapAvatarLayer);
        this._mapAvatarLayer.init();
        this._map.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMapClick, this);
    };
    p.onMapClick = function (e) {
        SceneManager.ins.clickMap(e.localX, e.localY);
    };
    d(p, "map"
        ,function () {
            return this._map;
        }
    );
    d(p, "backLayer"
        ,function () {
            return this._mapBackLayer;
        }
    );
    d(p, "effectLayer"
        ,function () {
            return this._mapEffectLayer;
        }
    );
    d(p, "avatarLayer"
        ,function () {
            return this._mapAvatarLayer;
        }
    );
    p.createMyRole = function (data) {
        var role = new Player();
        role.isSelf = true;
        data.dir = 4; //Math.random() * 7);
        data.dress = 0;
        data.level = Math.floor(Math.random() * 80 + 10);
        var index = Math.floor(Math.random() * 3.9);
        var obj = RoleState.STATES;
        var state = obj[index];
        data.state = RoleState.ROLE_STAND;
        data.nodeX = Math.floor(Math.random() * 22) + 22;
        data.nodeY = Math.floor(Math.random() * 22) + 22;
        role.setRoleData(data);
        return role;
    };
    p.createOtherPlayer = function () {
        var role = new Player();
        var data = new PlayerInfoData();
        role.isSelf = false;
        data.dir = 4;
        data.sex = Math.floor(Math.random() * 1);
        data.dress = Math.floor(Math.random() * 3);
        data.level = Math.floor(Math.random() * 80 + 10);
        var index = Math.floor(Math.random() * 3.9);
        var obj = RoleState.STATES;
        var state = obj[index];
        data.state = state;
        data.nodeX = Math.floor(Math.random() * 43) + 4;
        data.nodeY = Math.floor(Math.random() * 43) + 4;
        role.setRoleData(data);
        role.x = data.nodeX * MapConfig.MAP_NODE_WIDTH + MapConfig.MAP_NODE_WIDTH * 0.5;
        role.y = data.nodeY * MapConfig.MAP_NODE_HEIGHT + MapConfig.MAP_NODE_HEIGHT * 0.5;
        return role;
    };
    p.clear = function () {
        this._mapBackLayer.clear();
        this._mapEffectLayer.clear();
        this._mapAvatarLayer.clear();
    };
    return MapViewMediator;
}());
egret.registerClass(MapViewMediator,'MapViewMediator');
//# sourceMappingURL=MapViewMediator.js.map