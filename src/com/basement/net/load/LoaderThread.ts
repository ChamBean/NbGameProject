class LoaderThread extends egret.EventDispatcher {
	private _urlLoad:egret.URLLoader;
	private _imgLoad:egret.ImageLoader;

	public loadInfo:LoadInfo;
	public isLoad:boolean;
	public constructor() {
		super();
	}

	public reset():void
	{
		this.isLoad = false;
		this.loadInfo = null;
	}

	public load(info:LoadInfo):void
	{
		// this._urlLoad.once
		this.loadInfo = info;
		this.isLoad = true;
		// egret.log(egret.getTimer() + '开始加载'+info.url);
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
				RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR,this.onLoadConfigError,this);
				RES.loadConfig(info.url);
				break;
			case LoadInfo.IMG:
				var imgLoader:egret.ImageLoader = this.imgLoader;
				imgLoader.once(egret.Event.COMPLETE,this.onImgLoadComplete,this);
				imgLoader.once(egret.ProgressEvent.PROGRESS,this.onImgLoadProgress,this);
				imgLoader.once(egret.IOErrorEvent.IO_ERROR,this.onImgLoadError,this);
				imgLoader.load(info.url);
				break;
			case LoadInfo.TEXT:
			case LoadInfo.XML:
				var urlloader:egret.URLLoader = this.urlLoad;
				urlloader.dataFormat = egret.URLLoaderDataFormat.TEXT;
				urlloader.addEventListener(egret.Event.COMPLETE,this.onTextLoadComplete,this);
				urlloader.addEventListener(egret.ProgressEvent.PROGRESS,this.onTextLoadProgress,this);
				urlloader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onTextLoadError,this);
				urlloader.load(new egret.URLRequest(info.url));
				break;
			case LoadInfo.BYTE:
				var urlloader:egret.URLLoader = this.urlLoad;
				urlloader.dataFormat = egret.URLLoaderDataFormat.BINARY;
				urlloader.addEventListener(egret.Event.COMPLETE,this.onTextLoadComplete,this);
				urlloader.addEventListener(egret.ProgressEvent.PROGRESS,this.onTextLoadProgress,this);
				urlloader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onTextLoadError,this);
				urlloader.load(new egret.URLRequest(info.url));
				break;
		}
	}
	
	private onTextLoadComplete(e:egret.Event):void
	{
		// egret.log(egret.getTimer() + '结束加载'+ this.loadInfo.url);
		var urlload:egret.URLLoader = e.target;
		this.loadInfo.data = urlload.data;
		this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));

	}
	private onImgLoadComplete(e:egret.Event):void
	{
		// egret.log(egret.getTimer() + '结束加载'+ this.loadInfo.url);
		var loader:egret.ImageLoader = e.target;
		 var bmd:egret.BitmapData = loader.data;
		this.loadInfo.content = new egret.Bitmap(bmd);
		this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
	}
	
	private onLoadConfigComplete(e:RES.ResourceEvent):void{
		RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onLoadConfigComplete,this);
		this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
	}
	
	private onLoadGroupComplete(e:RES.ResourceEvent):void{
		RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onLoadGroupProgress,this);
		RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onLoadGroupError,this);
		RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onLoadGroupComplete,this);
		this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
	}

	private onLoadGroupProgress(e:RES.ResourceEvent):void{
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
		this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR,false,{text:'加载' + e.groupName + "资源组时出错"});
	}

	private onLoadConfigError(e:RES.ResourceEvent):void{
		this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR,false,{text:'加载' + this.loadInfo.url + "json配置时出错"});
	}

	private onImgLoadError(e:egret.IOErrorEvent):void
	{
		this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR,false,{text:'加载' + this.loadInfo.url + "出错"});
	}

	private onTextLoadError(e:egret.IOErrorEvent):void
	{
		this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR,false,{text:'加载' + this.loadInfo.url + "出错"});
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