/**
 * 图片资源存储vo
 * @author Bean
 * @since 2016.12.04
 */
class CBitmapData {
	private _count:number = 0;
	private _texture:egret.Texture;
	private _url:String;
	private _lastTime:number;
	public constructor(url:String,value:egret.Texture) {
		this._texture = value;
		this._url = url;
	}

	public get width():number
		{
			if(this._texture == null)
				return 0;
			return this._texture.bitmapData.width;
		}
		
		public get height():number
		{
			if(this._texture == null)
				return 0;
			return this._texture.bitmapData.height;
		}
		
		public count(isUse:Boolean = true):void
		{
			if (isUse)
			{
				this._count++;
			}
			else
			{
				this._count--;
			}
			if(this._count == 0)
			{
				this._lastTime = egret.getTimer();
			}
		}
		
		public get url():String
		{
			return this._url;
		}
		
		/**
		 * 获取一次图片就+1次数
		 * @return 
		 */		
		public get texture():egret.Texture
		{
			return this._texture;
		}
		
		public dispose():void
		{
			if (this._count > 0)
			{
				return;
			}
			if (LoopManager.currentTime - this._lastTime < 30000)
			{
				return;
			}
			this._texture.dispose();
			this._texture = null;
		}
}