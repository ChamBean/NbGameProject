class LoaderThread extends egret.EventDispatcher {
	private _urlLoad:egret.URLLoader;
	private _imgLoad:egret.ImageLoader;

	public loadInfo:LoadInfo;
	public loading:boolean;
	public constructor() {
		super();
	}

	public reset():void
	{
		this.loadInfo = null;
	}

	public load(info:LoadInfo):void
	{
		// this._urlLoad.once
		this.loadInfo = info;
		this.loading = true;
		switch(info.loadType)
		{
			case LoadInfo.GROUP:
				RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onLoadGroupProgress,this);
				RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onLoadGroupError,this);
				RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onLoadGroupComplete,this);
				RES.loadGroup(info.url);
				break;
			case LoadInfo.JSON:
				RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onLoadConfigComplete,this);
				RES.loadConfig(info.url);
				break;
			case LoadInfo.IMG:
				egret.log('本次加载开始的时间' + egret.getTimer());
				this.imgLoader.once(egret.Event.COMPLETE,this.onImgLoadComplete,this);
				this.imgLoader.once(egret.ProgressEvent.PROGRESS,this.onImgLoadProgress,this);
				this.imgLoader.once(egret.IOErrorEvent.IO_ERROR,this.onImgLoadError,this);
				this.imgLoader.load(info.url);
				break;
			case LoadInfo.TEXT:
			case LoadInfo.XML:
				this.urlLoad.dataFormat = egret.URLLoaderDataFormat.TEXT;
				this.urlLoad.once(egret.Event.COMPLETE,this.onTextLoadComplete,this);
				this.urlLoad.once(egret.ProgressEvent.PROGRESS,this.onTextLoadProgress,this);
				this.urlLoad.once(egret.IOErrorEvent.IO_ERROR,this.onTextLoadError,this);
				this.urlLoad.load(new egret.URLRequest(info.url));
				break;
			case LoadInfo.BYTE:
				this.urlLoad.dataFormat = egret.URLLoaderDataFormat.BINARY;
				this.urlLoad.once(egret.Event.COMPLETE,this.onTextLoadComplete,this);
				this.urlLoad.once(egret.ProgressEvent.PROGRESS,this.onTextLoadProgress,this);
				this.urlLoad.once(egret.IOErrorEvent.IO_ERROR,this.onTextLoadError,this);
				this.urlLoad.load(new egret.URLRequest(info.url));
				break;
		}
	}
	
	private onTextLoadComplete(e:egret.Event):void
	{
		this.loading = false;
		var urlload:egret.URLLoader = e.target;
		this.loadInfo.data = urlload.data;
		this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));

	}
	private onImgLoadComplete(e:egret.Event):void
	{
		this.loading = false;
		var loader:egret.ImageLoader = e.target;
		 var bmd:egret.BitmapData = loader.data;
		this.loadInfo.content = new egret.Bitmap(bmd);
		this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
		egret.log('本次加载完成的时间' + egret.getTimer());
	}
	
	private onLoadConfigComplete(e:RES.ResourceEvent):void{
		this.loading = false;
		RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onLoadConfigComplete,this);
		this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
	}
	
	private onLoadGroupComplete(e:RES.ResourceEvent):void{
		RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onLoadGroupProgress,this);
		RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onLoadGroupError,this);
		RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onLoadGroupComplete,this);
		this.loading = false;
		this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
	}

	private onLoadGroupProgress(e:RES.ResourceEvent):void{
		if(this.loadInfo && this.loadInfo.progressHandler)
			this.dispatchEventWith(egret.ProgressEvent.PROGRESS,false,{loaded:e.itemsLoaded,total:e.itemsTotal});
	}
	private onImgLoadProgress(e:egret.ProgressEvent):void
	{
		this.dispatchEventWith(egret.ProgressEvent.PROGRESS,false,{loaded:e.bytesLoaded,total:e.bytesTotal});
	}
	private onTextLoadProgress(e:egret.ProgressEvent):void
	{
		this.dispatchEventWith(egret.ProgressEvent.PROGRESS,false,{loaded:e.bytesLoaded,total:e.bytesTotal});
	}

	private onLoadGroupError(e:RES.ResourceEvent):void{
		if(this.loadInfo.errorHandler)
			this.loadInfo.errorHandler(this.loadInfo);
		this.loading = false;
	}

	private onImgLoadError(e:egret.IOErrorEvent):void
	{
		if(this.loadInfo.errorHandler)
			this.loadInfo.errorHandler(this.loadInfo);
		this.loading = false;
	}

	private onTextLoadError(e:egret.IOErrorEvent):void
	{
		if(this.loadInfo.errorHandler)
			this.loadInfo.errorHandler(this.loadInfo);
		this.loading = false;
	}

	private get urlLoad():egret.URLLoader
	{
		if(this._urlLoad == null)
			this._urlLoad = new egret.URLLoader();
		return this._urlLoad;
	}
	private get imgLoader():egret.ImageLoader
	{
		if(this._imgLoad == null)
			this._imgLoad = new egret.ImageLoader();
		return this._imgLoad;
	}

}