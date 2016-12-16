class SocketLogView extends BaseView implements  eui.UIComponent {
	private hostTxt:eui.TextInput;

	private portTxt:eui.TextInput;

	private connectBtn:eui.Button;
	private sendBtn:eui.Button;

	private logTxt:eui.Label;
	private list:eui.List;
	private scrListHeros:eui.Scroller;
	private verticalScrollBar:eui.VScrollBar;
	private idTxt:eui.TextInput;
	private nameTxt:eui.TextInput;
	private typeTxt:eui.TextInput;
	private arrTxt:eui.TextInput;

	private _modeul:GmModule;
	private _logArr:Array<net.NetVo> = null;
	private _selectIndex:number = -1;
	public constructor(module:GmModule) {
		super();
		this._modeul = module;
	}

	protected onCreateComplete(e:eui.UIEvent):void{
		super.onCreateComplete(e);
		this.hostTxt.prompt = '输入ip';
		this.portTxt.prompt = '输入端口';
		this._logArr = [];
		this.list.dataProvider = new eui.ArrayCollection(this._logArr);
		this.list.itemRenderer = SocketLogItem;
		this.scrListHeros.scrollPolicyV = eui.ScrollPolicy.AUTO;
		// this.list.itemRendererFunction
	}

	private onItemTab(e:eui.ItemTapEvent):void{
		if(e != null){
			this._selectIndex = e.itemIndex;
		}
		this.logTxt.text = egret.getQualifiedClassName(this.list.selectedItem) + ':\n';
		var vo:any = this.list.selectedItem;
		for(var key in vo){
			if(SocketLogView.delArr.indexOf(key) != -1)continue;
			this.logTxt.text += '\t' + key + ':' + vo[key] + '\n';
		}
	}
	private static delArr:Array<string> = ['constructor','command','encodeCode','__class__','__types__','decodeCode'];
	private clickHandler(e:egret.TouchEvent):void{
		if(e.currentTarget == this.connectBtn){
			let host:string = this.hostTxt.text;
			let port:number = parseInt(this.portTxt.text);
			App.ins.socket.connect(host,port);
		}
		if(e.currentTarget == this.sendBtn){
			var id:number = parseInt(this.idTxt.text);
			var userName:string = this.nameTxt.text;
			var type:number = parseInt(this.typeTxt.text);
			var arr:Array<string> = this.arrTxt.text.split(',');
			var numArr:Array<number> = [];
			for(var i:number = 0;i < arr.length;i++){
					if(isNaN(parseInt(arr[i])))
						numArr.push(0);
					else
						numArr.push(parseInt(arr[i]));
			}
			this._modeul.send1100(id,userName,type,numArr);
		}
	}

	public printLog(vo:net.NetVo):void{
		// this._logArr.push(vo);
		(this.list.dataProvider as eui.ArrayCollection).addItem(vo);
		if(this._selectIndex == -1){
			this._selectIndex = this._logArr.length - 1;
			this.list.selectedIndex = this._selectIndex;
			this.onItemTab(null);
		}
		if(303 < 33 * this._logArr.length)
			this.list.scrollV = 33 * this._logArr.length - 303;
	}

	protected addEvent():void{
		this.connectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this);
		this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this);
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTab,this);
	}

	protected removeEvent():void{
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
	}
	
}

class SocketLogItem extends eui.ItemRenderer {
	private labelDisplay:eui.Label = null;
    constructor() {
        super();
		this.width = 180;
		this.height = 30;
    }

    protected createChildren():void {
        super.createChildren();
		this.labelDisplay.size = 16;
		this.labelDisplay.top = 2;
    }

    protected dataChanged():void{
		this.labelDisplay.text = egret.getQualifiedClassName(this.data);
     }

}