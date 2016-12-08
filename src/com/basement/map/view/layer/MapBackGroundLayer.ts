/**
 * @des 场景地图层
 * @author Bean
 */	
class MapBackGroundLayer extends BaseMapLayer {
	private _hasClips:any = {};
	/**同时存在最大切片数 */
	private static MAX_CLIP_NUM:number = 60;
	private _markBmp:egret.Bitmap = null;
	public constructor() {
		super();
		this._markBmp = new egret.Bitmap();
		this.addChild(this._markBmp);
	}

	public setMark(texture:egret.Texture,mw:number,mh:number):void
	{
		var sx:number = mw/texture.bitmapData.width;
		var sy:number = mh/texture.bitmapData.height;
		var mt:egret.Matrix = new egret.Matrix();
		mt.scale(sx,sy);
		this._markBmp.matrix = mt;
		this._markBmp.texture = texture;
	}

	/**
	 * 添加地图切片
	 * @param url
	 * @param bmp
	 */		
	public setClipBmd(url:string,bmp:egret.Bitmap):void{
		this._hasClips[url] = bmp;
		this.addChild(bmp);
	}

	public hasClipBmp(url:string):boolean{
		if(this._hasClips[url] != null)
			return true;
		else 
		return false;
	}
	
	/**检测是否有多余的切片 如果有就清除 */
	public clearClips(px:number,py:number):void{
		if(this.numChildren < MapBackGroundLayer.MAX_CLIP_NUM)
			return;
		var minx:number = px - MapConfig.MAP_CLIP_IMAGE_WIDTH;
		var maxx:number = px + MapConfig.MAP_SCREEN_WIDTH + MapConfig.MAP_CLIP_IMAGE_WIDTH;
		var miny:number = py - MapConfig.MAP_CLIP_IMAGE_HEIGHT;
		var maxy:number = py + MapConfig.MAP_SCREEN_HEIGHT + MapConfig.MAP_CLIP_IMAGE_HEIGHT;
		var delArr:Array<string> = [];
		for(var url in this._hasClips){
			var bmp:egret.Bitmap = this._hasClips[url];
			if(bmp.x < minx || bmp.x > maxx || bmp.y < miny || bmp.y > maxy){
				delArr.push(url);
			}
		}
		for(var i:number = 0;i < delArr.length;i++)
		{
			url = delArr[i];
			var bmp:egret.Bitmap = this._hasClips[url];
			this._hasClips[url] = null;
			delete this._hasClips[url];
			if(this.contains(bmp))
				this.removeChild(bmp);
			bmp.texture.dispose();
			bmp = null;
		}
	}

	public clear():void
	{
		for(var url in this._hasClips)
		{
			var bmp:egret.Bitmap = this._hasClips[url];
			if(this.contains(bmp))
				this.removeChild(bmp);
			bmp.texture.dispose();
			bmp = null;
		}
		this._hasClips = {};
		if(this._markBmp.texture != null){
			this._markBmp.texture.dispose();
			this._markBmp.texture = null;
		}
	}
}