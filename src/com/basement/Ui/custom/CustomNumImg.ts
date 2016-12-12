class CustomNumImg extends egret.DisplayObjectContainer{
	private resKey:string = '{0}{1}_png';
	private _head:string;
	public constructor(head:string) {
		super();
		this.touchEnabled = false;
		this._head = head;
	}

	public upDataNum(num:string):void{
		this.clear();
		var offX:number = 0;
		for(var i:number = 0;i < num.length;i++){
			var s:string = num.charAt(i);
			s = StringUtil.substitute(this.resKey,this._head,s);
			var bmp:egret.Bitmap = new egret.Bitmap(RES.getRes(s));
			bmp.x = offX;
			offX += bmp.width;
			this.addChild(bmp);
		}
	}

	private clear():void{
		while(this.numChildren > 0){
			var bmp:egret.Bitmap = this.removeChildAt(0) as egret.Bitmap;
			bmp.texture = null;
			bmp = null;
		}
	}
}