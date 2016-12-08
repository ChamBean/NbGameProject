class Message {

	public static layer:egret.Sprite = null;
	private static maxCount:number = 3;
	private static items:Array<MessageItem> = [];
	public constructor() {
	}
	private static fixedY:number = 400;
	public static show(msg:string):void
	{
		if(Message.layer == null)
			Message.layer = App.ins.layer.msgLayer;
		var item:MessageItem = null;
		var arr:Array<MessageItem> = Message.items;
		if(arr.length >= Message.maxCount){
			item = arr.shift();
			item.dispos();
		}
		item = MessageItem.getItem();
		item.setMsg(msg);
		var moveH:number = item.height;
		for(var i:number = arr.length-1;i >=0 ;i--)
		{
			var tempItem:MessageItem = arr[i];
			tempItem.upTo(moveH);
			moveH = tempItem.height;
		}
		arr.push(item);
		item.alpha = 1;
		item.x = (App.ins.stage.stageWidth-item.width)/2;
		item.y = Message.fixedY;
		item.addToContainer();
	}
	
	public static removeItem(ietm:MessageItem):void
	{
		var dex:number = Message.items.indexOf(ietm);
		if(dex != -1)
		{
			Message.items.splice(dex,1);
		}
	}
}

class MessageItem extends egret.DisplayObjectContainer{
		private static _pools:Array<MessageItem> = new Array();
		private _removeKey:number = 0;
		private _count:number = 0;
		
		private static defaultStayTime:number = 1500;
		private static upMoveY:number = 30;
		private _msgTxt:egret.TextField = null;
		private _msgBackImg:eui.Image = null;
		public constructor(){
			super();
			if(MessageItem._pools == null)
				MessageItem._pools = new Array();
			this._msgBackImg = new eui.Image();
			this._msgBackImg.texture = RES.getRes('wing_08-bg_png');
			this._msgBackImg.scale9Grid = new egret.Rectangle(40,7,400,100);
			// this._msgBackImg.width = 100;
			// this._msgBackImg.height = 40;
			this.addChild(this._msgBackImg);
			this._msgTxt = new egret.TextField();
			this._msgTxt.x = 6;
			this._msgTxt.y = 6;
			// this._msgTxt.background = true;
			// this._msgTxt.backgroundColor = 0xff0000;
			this._msgTxt.textColor = 0xffff00;
			this._msgTxt.stroke = 2;
			this._msgTxt.strokeColor = 0;
			// this._msgTxt.width = this._msgBackImg.width;
			// this._msgTxt.height = 35;
			this._msgTxt.size = 20;
			this._msgTxt.bold = true;
			this._msgTxt.wordWrap = false;
			this._msgTxt.textAlign = egret.HorizontalAlign.CENTER;
			this.addChild(this._msgTxt);
		}

		public upTo(h:number):void
		{
			 var tw = egret.Tween.get(this);
            tw.to({"y": this.y-h}, 200);
		}

		public setMsg(msg:string):void
		{
			this._msgTxt.textFlow = HtmlUtil.getHtmlStr(msg);
			// this._msgTxt.width = this._msgTxt.textWidth + 3;
			// this._msgTxt.height = this._msgTxt.textHeight + 3;
			this._msgBackImg.width = this._msgTxt.textWidth + 3 + 12;
			this._msgBackImg.height = this._msgTxt.textHeight + 3 + 12;
		}

		public get width():number
		{
			return this._msgBackImg.width;
		}

		public get height():number
		{
			return this._msgBackImg.height;
		}

		/**
		 * 将此显示对象添加到目标容器中
		 */		
		public addToContainer():void
		{
			this.clearKey();
			var layer:egret.Sprite = Message.layer;
			layer.addChild(this);
			this.alpha = 0;
			this.y = 200;
			var self:any = this;
			var tw:egret.Tween = egret.Tween.get(this);
			tw.to({alpha:1},300).call(endMax,this);
			function endMax():void
			{
				this._removeKey = egret.setTimeout(upFly,this,MessageItem.defaultStayTime);
			}
			function upFly():void
			{
				var tw:egret.Tween = egret.Tween.get(self);
				tw.to({y:self.y-10,alpha:0.1},500);
				tw.call(endMax,self);
				function endMax(item:MessageItem):void
				{
					Message.removeItem(self);
					self.dispos();
				}
			}
		}


		public clearKey():void
		{
			if(this._removeKey != 0)
			{
				egret.clearTimeout(this._removeKey);
				this._removeKey = 0;
			}
		}

		public dispos():void
		{
			egret.Tween.removeTweens(this);
			if(this.parent)
				this.parent.removeChild(this);
			MessageItem._pools.push(this);
			this.clearKey();
		}

		public static getItem():MessageItem
		{
			if(MessageItem._pools.length > 0)
			{
				return MessageItem._pools.shift();
			}
			return new MessageItem();
		}

}
