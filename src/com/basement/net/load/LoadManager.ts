class LoadManager {
	
	public constructor() {
		this.init();
	}

	private static _ins:LoadManager;

	public static get ins():LoadManager
	{
		if(LoadManager._ins == null)
			LoadManager._ins = new LoadManager();
		return LoadManager._ins;
	}
	private waitLoadList:Array<LoadInfo> = [];
	private _max_thread:number = 5;
	// public ignoreErrorRequest:Boolean = true;
	// private _errorList:Object = new Object();
	private _loadMapByUrl:Object = new Object();
	/**
	 * 已经加载过的连接 
	 */		
	private static cacheUrl:Object = new Object;
	
	private _freePools:Array<LoaderThread>;

	private _taskLoads:Array<LoaderThread>;
	/**
	 * 是否获取到最新的版本资源
	 */		
	private _isGetVersion:Boolean = true ;

	public addGroupLoad(url:string,complete:Function,param:Object = null,priority:number = 0,progress:Function = null):void
	{
		var loadInfo:LoadInfo = new LoadInfo(url,complete,param,priority,progress);
		loadInfo.loadType = LoadInfo.GROUP;
		this.load(loadInfo);
	}

	public addConfigLoad(url:string,complete:Function,param:Object = null,priority:number = 0,progress:Function = null):void
	{
		var loadInfo:LoadInfo = new LoadInfo(url,complete,param,priority,progress);
		loadInfo.loadType = LoadInfo.JSON;
	}

	public addImgLoad(url:string,complete:Function,param:Object = null,priority:number = 0,progress:Function = null):void
	{
		var loadInfo:LoadInfo = new LoadInfo(url,complete,param,priority,progress);
		loadInfo.loadType = LoadInfo.IMG;
		this.load(loadInfo);
	}

	public addTextLoad(url:string,complete:Function,param:Object = null,priority:number = 0,progress:Function = null):void
	{
		var loadInfo:LoadInfo = new LoadInfo(url,complete,param,priority,progress);
		loadInfo.loadType = LoadInfo.TEXT;
		this.load(loadInfo);
	}
	public addByteLoad(url:string,complete:Function,param:Object = null,priority:number = 0,progress:Function = null):void
	{
		var loadInfo:LoadInfo = new LoadInfo(url,complete,param,priority,progress);
		loadInfo.loadType = LoadInfo.BYTE;
		this.load(loadInfo);
	}

	private load(info:LoadInfo):void
	{
		if(info == null)
			return;
		var loadArr:Array<LoadInfo> = this._loadMapByUrl[info.url];
		if(loadArr != null)
		{
			for(var i:number = 0;i < loadArr.length;i++)
			{
				var loadInfo:LoadInfo = loadArr[i];
				if(loadInfo.completeHandler == info.completeHandler){
					return;
				}
			}
			loadArr.push(info);
		}
		else{
			loadArr = new Array();
			loadArr.push(info);
			this._loadMapByUrl[info.url] = loadArr;
		}
		var loader:LoaderThread = this.getFreeLoader();
		if(loader != null)
		{
			loader.load(info);
		}
		else
		{
			this.waitLoadList.push(info);
			this.waitLoadList.sort(function(a:LoadInfo,b:LoadInfo):number{
				if(a.priority > b.priority)
					return 1;
				return 0;

			});
		}
	}

	private getFreeLoader():LoaderThread
	{
		var loader:LoaderThread;
		if(this._freePools.length > 0)
		{
			loader = this._freePools.pop();
			return loader;
		}
		return null;
	}

	private init():void
	{
		this._freePools = [];
		this._taskLoads = [];
		var loader:LoaderThread;
		for(var i:number = 0;i < this._max_thread;i++)
		{
			loader = new LoaderThread();
			loader.addEventListener(egret.Event.COMPLETE,this.loadComplete,this);
			loader.addEventListener(egret.ProgressEvent.PROGRESS,this.loadProgress,this);
			loader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.IoErrorHandle,this);
			this._freePools.push(loader);
			this._taskLoads.push(loader);
		}
	}

	private loadComplete(e:egret.Event):void
	{
		var loader:LoaderThread = e.target;
		var info:LoadInfo = loader.loadInfo;
		var loadArr:Array<LoadInfo> = this._loadMapByUrl[info.url];
		this._loadMapByUrl[info.url] = null;
		this.recrycleLoad(loader);
		for(var i:number = 0;i < loadArr.length;i++)
		{
			var loadInfo:LoadInfo = loadArr[i];
			loadInfo.data = info.data;
			loadInfo.content = info.content;
			if(loadInfo.completeHandler)
				loadInfo.completeHandler(loadInfo);
		}
	}

	private recrycleLoad(loader:LoaderThread):void
	{
		loader.reset();
		this._freePools.push(loader);
		this.loadNext();
	}

	private loadNext():void
	{
		while(this.waitLoadList.length > 0)
		{//判断等待队列数量
			var loader:LoaderThread = this.getFreeLoader();
			if (loader != null)
			{//是否还有空闲的加载器
				var loadInfo:LoadInfo = this.waitLoadList.shift();
				loader.load(loadInfo);
			}else
			{
				return;
			}
		}

	}
	

	private loadProgress(e:egret.Event):void
	{
		var loader:LoaderThread = e.target;
		if(loader.loadInfo && loader.loadInfo.progressHandler)
		loader.loadInfo.progressHandler(e);
	}
	private IoErrorHandle(e:egret.IOErrorEvent):void
	{
		var loader:LoaderThread = e.target;
		var url:string = loader.loadInfo.url;
		if(loader.loadInfo && loader.loadInfo.errorHandler)
			loader.loadInfo.errorHandler(loader.loadInfo);
	}
}