class CBitmapData {
	private _count:number = 0;
	private _bitmapData:egret.BitmapData;
	private _url:String;
	private _lastTime:number;
	public constructor(url:String,value:egret.BitmapData) {
		this._bitmapData = value;
		this._url = url;
	}

	public get width():number
		{
			if(this._bitmapData == null)
				return 0;
			return this._bitmapData.width;
		}
		
		public get height():number
		{
			if(this._bitmapData == null)
				return 0;
			return this._bitmapData.height;
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
		public get bitmapData():egret.BitmapData
		{
			return this._bitmapData;
		}
		
		public dispose():void
		{
			if (this._count > 0)
			{
				return;
			}
			// if (LoopManager.currentTime - _lastTime < 30000)
			// {
			// 	return;
			// }
			// this._bitmapData.dispose();
			this._bitmapData = null;
		}
}