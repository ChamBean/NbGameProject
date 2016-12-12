var EventName = (function () {
    function EventName() {
    }
    var d = __define,c=EventName,p=c.prototype;
    /**换形象 */
    EventName.CHANGE_FEATURE = 'change_feature';
    /**打开gm面板{type:1} */
    EventName.OPEN_GM_PANEL = 'open_gm_panel';
    /**打开地图节点显示*/
    EventName.OPEN_MAP_NODE = 'open_map_node';
    /**打开模块视图{id:对应系统id，其余字段可自行扩展} */
    EventName.OPEN_MODULE_VIEW = 'open_module_view';
    /**创建角色成功 */
    EventName.CREATE_ROLE_SUCCESS = 'create_role_success';
    /**创建特效成功 */
    EventName.MOVIE_CREATE_SUCCESS = 'movie_create_success';
    /**自动寻路到目标点{x:10,y:20,mapid:1} */
    EventName.AUTO_SEARCH_ROAD = 'auto_search_road';
    return EventName;
}());
egret.registerClass(EventName,'EventName');
//# sourceMappingURL=EventName.js.map