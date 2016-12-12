class EventName {
	/**换形象 */
	public static CHANGE_FEATURE:string = 'change_feature';
	/**打开gm面板{type:1} */
	public static OPEN_GM_PANEL:string = 'open_gm_panel';
	/**打开地图节点显示*/
	public static OPEN_MAP_NODE:string = 'open_map_node';
	/**打开模块视图{id:对应系统id，其余字段可自行扩展} */
	public static OPEN_MODULE_VIEW:string = 'open_module_view';
	/**创建角色成功 */
	public static CREATE_ROLE_SUCCESS:string = 'create_role_success';
	/**创建特效成功 */
	public static MOVIE_CREATE_SUCCESS:string = 'movie_create_success';
	/**自动寻路到目标点{x:10,y:20,mapid:1} */
	public static AUTO_SEARCH_ROAD:string = 'auto_search_road';

	public constructor() {
	}
}