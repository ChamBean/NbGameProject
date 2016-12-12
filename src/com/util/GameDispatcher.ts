/**
 * 单例派发事件类
 * @author Bean
 * @since 2016.12.04
 */
class GameDispatcher extends egret.EventDispatcher{
	private static _ins:GameDispatcher;

	private static _dispatcher:egret.EventDispatcher;
	public constructor() {
		super();
		GameDispatcher._dispatcher = new egret.EventDispatcher();
	}

	public static get ins():GameDispatcher
	{
		if(GameDispatcher._ins == null)
			GameDispatcher._ins = new GameDispatcher();
		return GameDispatcher._ins;
	}

	public dispatchEvent(event: egret.Event):boolean{
		return super.dispatchEvent(event);
		// return GameDispatcher._dispatcher.dispatchEvent(event);
	}
	public dispatchEventWith(type: string, data:any):boolean{
		return super.dispatchEventWith(type,false,data);
		// return GameDispatcher._dispatcher.dispatchEventWith(type,false,data);
	}

	// public addEventListener():void{
	// 	GameDispatcher._dispatcher.addEventListener()
	// }
}