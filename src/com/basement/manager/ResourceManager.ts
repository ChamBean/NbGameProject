class ResourceManager {
	private _loadDic:any;
	private _images:any;
	private _inited:boolean = false;
	private second:number = 0;
	private static _ins:ResourceManager = null;
	public constructor() {
		this._images = {};
		this._loadDic = {};
	}

	public static get ins():ResourceManager
	{
		if(ResourceManager._ins == null)
			ResourceManager._ins = new ResourceManager();
		return ResourceManager._ins;
	}

	/**
	 * 加载图片
	 * @param url 二级路径 前置的资源路径已设置
	 * @param funs  完成回调
	 * @param data  传参
	 * @param property 加载优先级
	 * 
	 */		
	public getImageRes(url:string,funs:Function,data:any = null,property:number = 0,progressHandler:Function= null):void
	{
		var image:CBitmapData = this._images[url];
		if(image == null)
		{
			var loadArr:Array<any> = this._loadDic[url];
			if(loadArr == null)
			{
				loadArr = [];
				this._loadDic[url] = loadArr;
				LoadManager.ins.addImgLoad(url,this.onImageComplete,this,property,progressHandler)
			}
			loadArr.push({fun:funs,data:data});
		}else
		{
			var param:any = {bmd:image,data:data,url:url};
			funs(param);
		}
	}
	
	private onImageComplete(ld:LoadInfo):void
	{
		var self:ResourceManager = ld.info;
		var url:string = ld.url;
		var loadArr:Array<any> = self._loadDic[url];
		var bmp:egret.Bitmap = ld.content;
		var image:CBitmapData = new CBitmapData(url,bmp.bitmapData);
		self._images[url] = image;
		for(var i:number = 0;i < loadArr.length;i++)
		{
			var obj:any = loadArr[i];
			var param:any = {bmd:image,data:obj.data,url:url};
			obj.fun(param);
		}
		self._loadDic[url] = null;
		delete self._loadDic[url];
	}
	
	public loadCompletedByUrl(url:string):Boolean
	{
		if(this._images[url])
		{
			return true;	
		}else
		{
			return false;
		}
	}
	
	
	/**
	 * 开启内存清理检测
	 */		
	public initLoopClear() : void
	{
		if (this._inited == false)
		{
			// LoopManager.addToSecond("ImageRescourceLoop", gc);
			this._inited = true;
		}else
		{
			this.gc(true);
		}
	}
	
	private gc($bool:Boolean = false):void
	{
		this.second++;
		if (this.second >= 300 ||$bool)
		{
			this.second = 0;
			var image:CBitmapData;
			var _imgaeDic1:any = {};
			var _imgaeDic2:any = {};
			// for each(image:CBitmapData in this._images)
			// {
			// 	image.dispose();
			// 	if(image.bitmapData !=null)
			// 	{
			// 		_imgaeDic1[image.url] = image;
			// 	}
			// }
			// for each(image in _imgNames)
			// {
			// 	image.dispose();
			// 	if(image.bitmapData !=null)
			// 	{
			// 		_imgaeDic2[image.url] = image;
			// 	}
			// }
			// _images = _imgaeDic1;
			// _imgNames = _imgaeDic2;
		}
	}
}