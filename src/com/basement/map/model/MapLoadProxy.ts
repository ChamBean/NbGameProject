/**
 * @des 场景地图加载
 * @author Bean
 */	
class MapLoadProxy {
	private static mapCfgSrc:string = 'resource/map/config/{0}.mp';
	private static _ins:MapLoadProxy = null;
	public constructor() {
		this._mapConvert = new MapDataConvert();
	}

	private _mapid:number;
	private _mapTrans:MapDataConvert;
	private _gameMapData:MapVo;
	/**
	 * 
	 */		
	private _bmp:egret.Bitmap;
	private _bgView:MapContainer;
	
	public static get ins():MapLoadProxy
	{
		if(MapLoadProxy._ins == null)
			MapLoadProxy._ins = new MapLoadProxy();
		return MapLoadProxy._ins;
	}

	public setMapId(id:number):void
	{
		this._mapid = id;
		var url:string = StringUtil.substitute(MapLoadProxy.mapCfgSrc,id);
		LoadManager.ins.addByteLoad(url,this.onLoadMapCfgHandler,id,LoadPriorityEnum.MAPCONFIG_PRIORITY);
		// string.su
	}

	private _mapConvert:MapDataConvert = null;
	private _mapData:MapVo = null;
	private onLoadMapCfgHandler(ld:LoadInfo):void
	{
		if(ld.info == MapLoadProxy.ins._mapid)
		{
			MapLoadProxy.ins._mapData = MapLoadProxy.ins._mapConvert.numbertranfromToMapVO(ld.data);
		}
	}
}