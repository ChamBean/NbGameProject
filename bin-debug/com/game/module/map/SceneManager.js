/**
 * 场景管理器
 * @author Bean
 * @since 2016.12.04
 */
var SceneManager = (function () {
    function SceneManager() {
        this.mapViewMediator = null;
        this._myRole = null;
        this._loadProxy = null;
        this._sceneProxy = null;
        this.myRoleData = null;
        this._isMapClick = false;
        this._dispatcher = null;
        this._roleMap = {};
        this._loadProxy = new MapLoadProxy();
        this._sceneProxy = new MapSceneProxy();
        this._dispatcher = GameDispatcher.ins;
        this.initListener();
    }
    var d = __define,c=SceneManager,p=c.prototype;
    d(SceneManager, "ins"
        ,function () {
            if (SceneManager._ins == null)
                SceneManager._ins = new SceneManager();
            return SceneManager._ins;
        }
    );
    p.initListener = function () {
        this._dispatcher.addEventListener(SceneEventName.MY_ROLE_CHANGE_POSITION, this.onChangeMyRolePoint, this);
        this._dispatcher.addEventListener(EventName.AUTO_SEARCH_ROAD, this.onAutoMapSearch, this);
        this._dispatcher.addEventListener(EventName.CHANGE_FEATURE, this.onChangeFeature, this);
    };
    p.createMyRole = function (roleData) {
        this._myRole = this.mapViewMediator.createMyRole(roleData);
        this.myRoleData = this._myRole.roleData;
    };
    p.initMap = function () {
        this.clear();
        LoopManager.addToFrame('sceneManager', this.onLoopHandler);
        this._loadProxy.setBgView(this.mapViewMediator.backLayer);
        this._loadProxy.setMapId(2);
        this._loadProxy.addEventListener(SceneEventName.GAMEMAP_DATA_LOAD_COMPLETE, this.mapLoadComplete, this);
    };
    d(p, "myRole"
        ,function () {
            return this._myRole;
        }
    );
    p.mapLoadComplete = function (e) {
        this.mapData = e.data;
        this.mapViewMediator.avatarLayer.addChild(this.myRole);
        if (this._transLine == null) {
            this._transLine = new AcorrsLineGrid(e.data);
        }
        this._transLine.reset(e.data);
        this.resetMapView();
    };
    p.resetMapView = function () {
        this._isMapClick = true;
        var roleX = this.myRoleData.nodeX * MapConfig.MAP_NODE_WIDTH * 0.5;
        var roleY = this.myRoleData.nodeY * MapConfig.MAP_NODE_HEIGHT * 0.5;
        this._myRole.x = roleX;
        this._myRole.y = roleY;
        this._sceneProxy.upMapAreaRect(this.mapData.mapWidth, this.mapData.mapHeight);
        this._sceneProxy.upSceneRect(App.ins.stage.stageWidth, App.ins.stage.stageHeight);
        this._sceneProxy.setRolePoint(roleX, roleY);
        this._sceneProxy.moveScene();
        this.mapViewMediator.map.updataPosition(this._sceneProxy.sceneRect.x, this._sceneProxy.sceneRect.y);
        this.randomRole();
    };
    p.onChangeMyRolePoint = function (e) {
        var roleX = this._myRole.x;
        var roleY = this._myRole.y;
        this._sceneProxy.setRolePoint(roleX, roleY, true);
        this.mapViewMediator.map.updataPosition(this._sceneProxy.sceneRect.x, this._sceneProxy.sceneRect.y);
    };
    /**
     * 点击地图
     *
     */
    p.clickMap = function (clickX, clickY) {
        if (this._myRole == null)
            return;
        this._isMapClick = true;
        var list = this.searchAstar(clickX, clickY, this.myRoleData.nodeX, this.myRoleData.nodeY);
        if (list && list.length > 0) {
            //设置鼠标点击样式
            this._myRole.startMove(list);
        }
    };
    p.onLoopHandler = function () {
        var currentFrame = LoopManager.currentFrame;
        //检测是否需要加载切片
        if (currentFrame % 5 == 0) {
            SceneManager.ins.checkMapClips();
            if (currentFrame % 6 == 0) {
                SceneManager.ins.mapViewMediator.avatarLayer.doSortAvatar();
            }
        }
    };
    /**
     * 检测是否需要加载切片
     */
    p.checkMapClips = function () {
        if (this._isMapClick) {
            this._isMapClick = false;
            upDataClips();
        }
        if (this.mapData == null || !this._myRole.isMoving) {
            return;
        }
        upDataClips();
        function upDataClips() {
            var clips = SceneManager.ins._sceneProxy.clips;
            SceneManager.ins._loadProxy.loadClips(clips);
            SceneManager.ins.mapViewMediator.backLayer.clearClips(SceneManager.ins._sceneProxy.sceneRect.x, SceneManager.ins._sceneProxy.sceneRect.y);
        }
    };
    /**
     * A*寻路
     * @return
     */
    p.searchAstar = function (px, py, $startX, $startY, shift) {
        if (shift === void 0) { shift = 0; }
        var addx = px % MapConfig.MAP_NODE_WIDTH;
        var addy = py % MapConfig.MAP_NODE_HEIGHT;
        var end = this.mapData.getNodeByXY(px, py);
        var start = this.mapData.getNode($startX, $startY);
        var path = [];
        if (start == null || end == null)
            return null;
        if (start == end) {
            path.push(this.getPoint(addx, addy, end));
            return path;
        }
        end = this.getEnd(end);
        if (!end.walkAble) {
            var chx = 0;
            var chy = 0;
            while (end && !end.walkAble) {
                if (end == start) {
                    break;
                }
                chx = 0;
                chy = 0;
                if (start.x > end.x) {
                    chx = 1;
                }
                else if (start.x < end.x) {
                    chx = -1;
                }
                if (start.y > end.y) {
                    chy = 1;
                }
                else if (start.y < end.y) {
                    chy = -1;
                }
                end = this.mapData.getNode(end.x + chx, end.y + chy);
            }
        }
        this.mapData.startNode = start;
        this.mapData.endNode = end;
        // this.mapData.nodesRest();
        var list = Astart.findPath(this.mapData);
        if (list == null || list.length <= 0) {
            return null;
        }
        var node;
        list = Astart.profect(list); //缩减节点个数
        list = this._transLine.getPsnode(list); //取直线
        list.pop();
        for (var i = 0, len = list.length; i < len; i++) {
            node = list[i];
            if (node == end) {
                path.push(this.getPoint(addx, addy, node));
            }
            else {
                path.push(this.getPoint(0, 0, node));
            }
        }
        return path;
    };
    /**
     * 获取实际像素点坐标
     * @param px  x像素偏移
     * @param py
     * @return
     */
    p.getPoint = function (px, py, node) {
        var _point;
        if (_point == null) {
            _point = new egret.Point;
        }
        _point.setTo(node.x * MapConfig.MAP_NODE_WIDTH + px, node.y * MapConfig.MAP_NODE_HEIGHT + py);
        return _point;
    };
    /**
     * 获取当前node
     * @param $node
     * @return
     */
    p.getEnd = function ($node) {
        if ($node.walkAble) {
            return $node;
        }
        var node = null;
        var result = null;
        var i = -1;
        var j = -1;
        for (i = -1; i < 2; i++) {
            for (j = -1; j < 2; j++) {
                node = this.mapData.getNode($node.x + i, $node.y + j);
                if (node && node.walkAble) {
                    result = node;
                    break;
                }
            }
        }
        return result || $node;
    };
    p.removeRoleByid = function (id) {
        var role = this._roleMap[id];
        if (role) {
            role.remove();
            delete this._roleMap[id];
        }
    };
    p.onAutoMapSearch = function (e) {
        if (e.data != null)
            this.clickMap(e.data.x, e.data.y);
        else
            this._myRole.autoMove();
    };
    p.randomRole = function () {
        for (var i = 0; i < 50; i++) {
            var player = this.mapViewMediator.createOtherPlayer();
            player.roleData.onlyid = i + 1;
            player.roleData.name = '士兵' + (i + 1);
            this.mapViewMediator.avatarLayer.addChild(player);
            this._roleMap[i + 1] = player;
        }
    };
    p.onChangeFeature = function (e) {
        var key = e.data.key;
        var roleData = this.myRoleData;
        if (key == 'sex') {
            roleData.sex = Math.floor(Math.random() * 1);
        }
        if (key == 'job') {
            roleData.job = Math.floor(Math.random() * 3);
        }
        if (key == 'dress') {
            roleData.dress = Math.floor(Math.random() * 3);
        }
        this._myRole.setRoleData(roleData);
    };
    p.clear = function () {
        this.mapViewMediator.clear();
        this._loadProxy.clear();
        for (var id in this._roleMap) {
            var role = this._roleMap[id];
            role.remove();
        }
        this._roleMap = {};
    };
    SceneManager._ins = null;
    SceneManager.roleIndex = 0;
    return SceneManager;
}());
egret.registerClass(SceneManager,'SceneManager');
//# sourceMappingURL=SceneManager.js.map