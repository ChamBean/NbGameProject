/**
 * @des 场景地图加载
 * @author Bean
 */	
class MapLoadProxy extends egret.EventDispatcher{
	private static mapCfgSrc:string = 'resource/map/map{0}/data.mp';
	public constructor() {
		super();
		this._mapConvert = new MapDataConvert();
	}

	private _mapid:number;
	private _mapTrans:MapDataConvert;
	/**
	 * 地图缩略图
	 */		
	private _previewTexture:egret.Texture;
	private _bgView:MapBackGroundLayer;

	public setBgView(bg:MapBackGroundLayer):void{
		this._bgView = bg;
	}

	public setMapId(id:number):void
	{
		this._mapid = id;
		var url:string = StringUtil.substitute(MapLoadProxy.mapCfgSrc,id);
		LoadManager.ins.addByteLoad(url,this.onLoadMapCfgHandler,this,LoadPriorityEnum.MAPCONFIG_PRIORITY);
		this.loadSmallMap();
		// string.su
	}

	private _mapConvert:MapDataConvert = null;
	private _mapData:MapVo = null;
	private onLoadMapCfgHandler(ld:LoadInfo):void
	{
		var self:MapLoadProxy = ld.info;
		self._mapData = self._mapConvert.numbertranfromToMapVO(ld.data);
		self._mapData.mapId = self._mapid;
		self.dispatchEventWith(SceneEventName.GAMEMAP_DATA_LOAD_COMPLETE,false,self._mapData);
		self.drawMark();
	}

	public get mapData():MapVo
	{
		return this._mapData;
	}

	private loadSmallMap():void{
		this._previewTexture = null;
		var src:string = StringUtil.substitute(MapLoadProxy.mapClipSrc,this._mapid,'preview.jpg');
		LoadManager.ins.addImgLoad(src,this.onLoadSmallMapComplete,this,LoadPriorityEnum.MAPCONFIG_PRIORITY);
	}

	private onLoadSmallMapComplete(ld:LoadInfo):void{
		var self:MapLoadProxy = ld.info;
		self._previewTexture = ld.data;
		self.drawMark();
	}

	private drawMark():void{
		if(this._mapData == null || this._previewTexture == null)
			return;
		this._bgView.setMark(this._previewTexture,this._mapData.mapWidth,this._mapData.mapHeight)
	}

	private _waitClips:any = {};
	private static mapClipSrc:string = 'resource/map/map{0}/{1}';
	public loadClips(clips:Array<string>):void{
		var mapData:MapVo = this._mapData;
		for(var i:number = 0;i < clips.length;i++)
		{
			var obj:any = clips[i];
			if(mapData.tileArray[obj.x]){
				if(mapData.tileArray[obj.x][obj.y])
				{
					var title:string =  mapData.tileArray[obj.x][obj.y];
					var url:string = StringUtil.substitute(MapLoadProxy.mapClipSrc,mapData.mapId,title);
					if(this._waitClips[url] != null)continue;
					if(this._bgView.hasClipBmp(url)){
						this._bgView.setClipBmd(url);
						continue;
					}
					this._waitClips[url] = url;
					var params:any = {mapid:mapData.mapId,url:url,self:this,x:obj.x,y:obj.y};
					LoadManager.ins.addImgLoad(url,this.loadMapComplete,params,LoadPriorityEnum.MAPCLIP_PRIORITY);
				}
			}
		}
	}

	private loadMapComplete(ld:LoadInfo):void{
		var param:any = ld.info;
		var self:MapLoadProxy = param.self;
		var nodeX:number = param.x;
		var nodeY:number = param.y;
		var url:string = param.url;
		var id:number = param.mapid;
		if(self._mapid != id)
			return;
		self._waitClips[url] = null;
		delete self._waitClips[url];
		var bmp:egret.Bitmap = new egret.Bitmap(ld.data);
		bmp.x = nodeX * MapConfig.MAP_CLIP_IMAGE_WIDTH;
		bmp.y = nodeY * MapConfig.MAP_CLIP_IMAGE_HEIGHT;
		self._bgView.setClipBmd(url,bmp);
	}

	public clear():void{
		for(var key in this._waitClips){
			LoadManager.ins.clearLoad(key);
		}
		this._waitClips = {};
		this._mapData = null;
	}
}