class CommandMap{
	private _commands:any = null;
	public constructor(){
		this._commands = {
			1100:Scmd1100,
			0:0
		}
	}
	public get commands():any{
		return this._commands;
	}
}