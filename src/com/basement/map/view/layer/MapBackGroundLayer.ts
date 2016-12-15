/**
 * @des 场景地图层
 * @author Bean
 */	
class MapBackGroundLayer extends BaseMapLayer {
	private _hasClips:any = {};
	/**同时存在最大切片数 */
	private static MAX_CLIP_NUM:number = 70;
	/**地图上的最大切片数 */
	private static MAX_CHILDREN:number = 20;
	private _markBmp:egret.Bitmap = null;
	private _clipCount:number = 0;
	private _nodeLayer:egret.Shape;
	public constructor() {
		super();
		this._markBmp = new egret.Bitmap();
		this.addChild(this._markBmp);
	}

	public drawNodes(mapData:MapVo):void 
	{
		if(!DEBUG){
			return;
		}
		if(this._nodeLayer == null)
		{
			this._nodeLayer = new egret.Shape();
		}
		if(this._nodeLayer.parent){
			this.parent.removeChild(this._nodeLayer);
			return;
		}
		this.parent.addChild(this._nodeLayer);
		this._nodeLayer.graphics.clear();
		if(!mapData)
			return;
		
		for(let y:number = 0 ; y < mapData.row; y++)
		{
			for(let x:number = 0;x < mapData.col; x++)
			{
				let go:boolean = mapData.getNode(x,y).walkAble;
				let isMask:Boolean = mapData.getNode(x,y).isMask;
				let color:number = 0xFF0000;
				if(go)
				{
					color = isMask? 0x00FF00 : 0xFFFFFF;
				}
				let alpha:number = color == 0xFFFFFF ? 0 : 0.6;
				this._nodeLayer.graphics.beginFill(color,alpha);
				this._nodeLayer.graphics.lineStyle(1,0x666666,1);
				this._nodeLayer.graphics.drawRect(MapConfig.MAP_NODE_WIDTH*x,MapConfig.MAP_NODE_HEIGHT*y,MapConfig.MAP_NODE_WIDTH,MapConfig.MAP_NODE_HEIGHT);
				this._nodeLayer.graphics.endFill();
			}
		}
	}

	public setMark(texture:egret.Texture,mw:number,mh:number):void
	{
		let sx:number = mw/texture.bitmapData.width;
		let sy:number = mh/texture.bitmapData.height;
		let mt:egret.Matrix = new egret.Matrix();
		mt.scale(sx,sy);
		this._markBmp.matrix = mt;
		this._markBmp.texture = texture;
	}

	/**
	 * 添加地图切片
	 * @param url
	 * @param bmp
	 */		
	public setClipBmd(url:string,bmp:egret.Bitmap=null):void{
		if(bmp == null){
			bmp = this._hasClips[url];
		}
		if(!this.hasClipBmp(url))
			this._clipCount++;
		if(this.contains(bmp)){
			return;
		}
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
		if(this._clipCount >= MapBackGroundLayer.MAX_CLIP_NUM){
			let minx:number = px - MapConfig.MAP_CLIP_IMAGE_WIDTH;
			let maxx:number = px + MapConfig.MAP_SCREEN_WIDTH + MapConfig.MAP_CLIP_IMAGE_WIDTH;
			let miny:number = py - MapConfig.MAP_CLIP_IMAGE_HEIGHT;
			let maxy:number = py + MapConfig.MAP_SCREEN_HEIGHT + MapConfig.MAP_CLIP_IMAGE_HEIGHT;
			let delArr:Array<string> = [];
			let url:string;
			for(url in this._hasClips){
				let bmp:egret.Bitmap = this._hasClips[url];
				if(bmp.x < minx || bmp.x > maxx || bmp.y < miny || bmp.y > maxy){
					delArr.push(url);
				}
			}
			for(let i:number = 0;i < delArr.length;i++)
			{
				url = delArr[i];
				let bmp:egret.Bitmap = this._hasClips[url];
				this._hasClips[url] = null;
				delete this._hasClips[url];
				if(this.contains(bmp))
					this.removeChild(bmp);
				bmp.texture.dispose();
				bmp = null;
				this._clipCount--;
			}
			return;
		}
		// if(this.numChildren > MapBackGroundLayer.MAX_CHILDREN){
		// 	let minx:number = px - MapConfig.MAP_CLIP_IMAGE_WIDTH;
		// 	let maxx:number = px + MapConfig.MAP_SCREEN_WIDTH + MapConfig.MAP_CLIP_IMAGE_WIDTH;
		// 	let miny:number = py - MapConfig.MAP_CLIP_IMAGE_HEIGHT;
		// 	let maxy:number = py + MapConfig.MAP_SCREEN_HEIGHT + MapConfig.MAP_CLIP_IMAGE_HEIGHT;
		// 	let delArr:Array<egret.Bitmap> = [];
		// 	let url:string;
		// 	for(let i:number = 0;i < this.numChildren;i++){
		// 		let bmp:egret.Bitmap = this.getChildAt(i) as egret.Bitmap;
		// 		if(bmp == this._markBmp)continue;
		// 		if(bmp.x < minx || bmp.x > maxx || bmp.y < miny || bmp.y > maxy){
		// 			delArr.push(bmp);
		// 		}
		// 	}
		// 	for(let i:number = 0;i < delArr.length;i++)
		// 	{
		// 		if(this.contains(delArr[i]))
		// 			this.removeChild(delArr[i]);
		// 	}
		// }
	}

	public clear():void
	{
		if(this._nodeLayer)
		{
			this._nodeLayer.graphics.clear();
			if(this._nodeLayer.parent)
				this.parent.removeChild(this._nodeLayer);
			this._nodeLayer = null;
		}
		this._clipCount = 0;
		for(let url in this._hasClips)
		{
			let bmp:egret.Bitmap = this._hasClips[url];
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