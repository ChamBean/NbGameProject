class LoadInfo {
	/**请求地址 */
	public url:string;
	// 扩展字段，用于参数回调
	public info:any;
	/**加载完成函数回调*/
	public completeHandler:Function;
	/**加载进度函数回调*/
	public progressHandler:Function;
	/**加载错误函数回调*/
	public errorHandler:Function;
	/**加载优先级*/
	public priority:number;
	/**加载资源类型*/
	public loadType:string;
	/**显示对象（用于imgloader加载使用）*/
	public content:any;
	/**字符串或byte（用于Urlloader加载使用）*/
	public data:any;
	/**创建时间*/
	public createTime:number=0;
	public static XML:string = 'xml';
	public static BYTE:string = 'byte';
	public static JSON:string = 'json';
	public static IMG:string = 'IMG';
	public static TEXT:string = 'text';
	public static GROUP:string = 'group';

	public constructor(url:string,complete:Function,param:Object = null,priority:number = 0,progress:Function = null,error:Function = null) {
		this.url = url;
		this.completeHandler = complete;
		this.info = param;
		this.priority = priority;
		this.progressHandler = progress;
		this.errorHandler = error;
		this.createTime = egret.getTimer();
	}
}