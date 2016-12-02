class LoadConfigManager {
	private static _ins:LoadConfigManager = null;

	private _loadDic:any;
	private _configs:any;

	public static get ins():LoadConfigManager
	{
		if(LoadConfigManager._ins == null)
			LoadConfigManager._ins = new LoadConfigManager();
		return LoadConfigManager._ins;
	}

	public constructor() {
		this._configs = {};
		this._loadDic = {};
	}

	public getConfig(url:string,funs:Function,data:any = null,property:number = 0,progressHandler:Function= null):void{
		var config:any = this._configs[url];
		if(config == null)
		{
			var loadArr:Array<any> = this._loadDic[url];
			if(loadArr == null)
			{
				loadArr = [];
				this._loadDic[url] = loadArr;
				LoadManager.ins.addTextLoad(url,this.onConfigComplete,this,property,progressHandler)
			}
			loadArr.push({fun:funs,data:data});
		}else
		{
			var param:Object = {cfg:config,data:data,url:url};
			funs(param);
		}
	}

	private onConfigComplete(ld:LoadInfo):void
	{
		var url:string = ld.url;
		var self:LoadConfigManager = ld.info;
		var loadArr:Array<any> = LoadConfigManager.ins._loadDic[url];
		var config:any = ld.data;
		LoadConfigManager.ins._configs[url] = config;
		for(var i:number = 0;i < loadArr.length;i++)
		{
			var obj:any = loadArr[i];
			var param:Object = {cfg:config,data:obj.data,url:url};
			obj.fun(param);
		}
		self._loadDic[url] = null;
		delete self._loadDic[url];
	}

}