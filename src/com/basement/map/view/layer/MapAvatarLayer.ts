/**
 * @des 场景形象层 
 * @author Bean
 */	
class MapAvatarLayer extends BaseMapLayer {
	private _childList:Array<egret.DisplayObject>
	public constructor() {
		super();
		this._childList = [];
	}
	private _roleArr:Array<BaseRole>;
	public init():void{
	}

	public addChild(child:egret.DisplayObject):egret.DisplayObject
	{
		if(this._childList.indexOf(child) != -1)
		{
			return child;
		}
		this._childList.push(child);
		return super.addChild(child);
	}
	public removeChild(child:egret.DisplayObject):egret.DisplayObject
	{
		var index:number = this._childList.indexOf(child);
		if(index == -1)
		{
			return child;
		}
		this._childList.splice(index,1);
		return super.addChild(child);
	}

	public clear():void{
		while(this.numChildren > 0)
		{
			super.removeChildAt(0);
		}
		this._childList.length = 0;
	}

	/**
	 * 排序
	 */		
	public doSortAvatar():void 
	{  
		var sortedLayers = this._childList;  
		var maxNum:number = sortedLayers.length;
		sortedLayers.sort(this.sort);
		var item:egret.DisplayObject = null;  
		while (maxNum--) 
		{  
			item = sortedLayers[maxNum];  
			this.setChildIndex(item, maxNum);
		}  
	}  

	private sort(child1:egret.DisplayObject,child2:egret.DisplayObject):number
	{
		if(child1.y < child2.y)
			return 1;
		return 0;
	}
}