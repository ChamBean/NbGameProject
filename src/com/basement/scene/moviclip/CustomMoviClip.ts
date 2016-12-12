/**
 * 特效实现类
 * @author Bean
 * @since 2016.12.04
 */
class CustomMoviClip extends egret.MovieClip{

	public constructor() {
		super();
	}

	private _resData:any;
	private _mcTexture:egret.Texture;
	private _mcName:string;
	private _mcBitmap:CBitmapData;
	
	public setRes(data:any,texture:egret.Texture,mcName:string):void{
		this._resData = data;
		this._mcTexture = texture;
		this._mcName = mcName;
		if(this._mcBitmap){
			this._mcBitmap.count(false);
			this._mcBitmap = null;
		}
		this.createMc();
	}
	private _url:string;
	public startLoad(url:string,mcName:string,priority:number=0):void{
		if(this._url == url && this.isPlaying)
			return;
		if(this._mcBitmap){
			this._mcBitmap.count(false);
			this._mcBitmap = null;
		}
		this._url = url;
		App.ins.configManager.getConfig(url + '.json',this.onLoadTxtComplete,this,priority);
		App.ins.resManager.getImageRes(url + '.png',this.onLoadImgComplete,this,priority);
	}

	private onLoadTxtComplete(obj:any):void
	{
		var avatar:CustomMoviClip = obj.data;
		avatar._resData = JSON.parse(obj.cfg);
		avatar.createMc();
	}

	private onLoadImgComplete(obj:any):void
	{
		var avatar:CustomMoviClip = obj.data;
		avatar._mcBitmap = obj.bmd;
		obj.bmd.count(true);
        avatar._mcTexture = obj.bmd.texture;
		avatar.createMc();
	}

	private createMc():void {
		var mc:CustomMoviClip = this;
		if(mc._resData == null || mc._mcTexture == null || mc._mcTexture.bitmapData == null)
			return;
        var mcFactor:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(this._resData,this._mcTexture);
		mc.movieClipData = mcFactor.generateMovieClipData(mc._mcName);
		mc.play(-1);
		this.dispatchEvent(new egret.Event(EventName.MOVIE_CREATE_SUCCESS))
		// this.addEventListener(egret.MovieClipEvent.RENDER)
	}

	public dispos():void{
		this.stop();
		this._resData = null;
		if(this._mcBitmap != null){
			this._mcBitmap.count(false);
			this._mcBitmap = null;
		}
		this._mcTexture = null;
		if(this.parent)
			this.parent.removeChild(this);
	}
}