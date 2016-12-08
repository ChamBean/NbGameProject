/**
 * 所有图片资源加载管理器
 * @author Bean
 * @since 2016.12.04
 */
class ResourceManager {
	private _loadDic:any;
	private _images:any;
	private _inited:boolean = false;
	private second:number = 0;
	public constructor() {
		this._images = {};
		this._loadDic = {};
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
		var texture:egret.Texture = ld.data;
		var image:CBitmapData = new CBitmapData(url,texture);
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
			LoopManager.addToSecond("ImageRescourceLoop",this.gc,this);
			this._inited = true;
		}else
		{
			this.second = 300;
			this.gc(this);
		}
	}
	
	private gc(self:ResourceManager):void
	{
		self.second++;
		if(self.second <= 300)
			return;
		self.second = 0;
		var image:CBitmapData;
		var _imgaeDic1:any = {};
		var _imgaeDic2:any = {};
		for(var url in self._images){
			var image:CBitmapData = self._images[url];
			image.dispose();
			if(image.texture != null)
			{
				_imgaeDic1[url] = image;
			}
		}
		self._images = _imgaeDic1;
	}
}