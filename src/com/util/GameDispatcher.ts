class GameDispatcher extends egret.EventDispatcher{
	private static _ins:GameDispatcher;
	public constructor() {
		super();
	}

	public static get ins():GameDispatcher
	{
		if(GameDispatcher._ins == null)
			GameDispatcher._ins = new GameDispatcher();
		return GameDispatcher._ins;
	}
}