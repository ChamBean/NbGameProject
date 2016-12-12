class CustomImage extends egret.Bitmap{
	public static LOAD_IMG_COMPLETE:string = 'load_img_complete';

	private _url:string = '';
	private _cbmd:CBitmapData = null;
	public constructor() {
		super();
	}

	public set url(value:string){
		if(this._url == value)
		{
			if(value == null || value == ''){
				this.clear();
			}
			return;
		}
		App.ins.resManager.getImageRes(value,this.oLoadComplete,this,LoadPriorityEnum.IMAGE_PRIORITY);
	}

	private oLoadComplete(data:any):void{
		var img:CustomImage = data.data;
		img._cbmd = data.bmd;
		img._cbmd.count(true);
        img.texture = data.bmd.texture;
		img.dispatchEvent(new egret.Event(CustomImage.LOAD_IMG_COMPLETE));
	}

	public dispos():void{
		if(this.parent)
			this.parent.removeChild(this);
		this.clear();
	}

	private clear():void{
		this._url = '';
		if(this.texture){
			this.texture.dispose();
			this.texture = null;
		}
		if(this._cbmd){
			this._cbmd.count(false);
			this._cbmd = null;
		}
	}
}