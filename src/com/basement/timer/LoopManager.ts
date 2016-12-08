class LoopManager {

	private static _isInited:boolean = false;
	private static _currentFrame:number = 0;
	private static _currentTime:number = 0;
	private static _curTime:number = 0;
	private static lastTime:number = 0;
	private static _realFrameRate:number = 30;
	private static frameLoopDic:any;
	private static _timeTime:number = 0;
	private static _secondTime:number = 0;
	private static timeoutDic:any;
	private static timeLoopDic:any;
	private static delayIDKey:number = 0;
	private static secondLoopDic:any;
	private static stage:egret.Stage;
	private static _frameHold:number = 30;
	private static secFrames:number = 0;
	private static frameTime:number = 0;

	public constructor() {
	}

	 public static init($stage:egret.Stage):void{
		if (LoopManager._isInited == false)
		{
			LoopManager.frameLoopDic = {};
			LoopManager.timeoutDic = {};
			LoopManager.timeLoopDic = {};
			LoopManager.secondLoopDic = {};
			LoopManager.stage = $stage;
			LoopManager.stage.addEventListener(egret.Event.ENTER_FRAME, LoopManager.frameLoop,null);
			LoopManager._isInited = true;
			LoopManager._currentTime = egret.getTimer();
			var timer:egret.Timer = new egret.Timer(1000);
			timer.addEventListener(egret.TimerEvent.TIMER,LoopManager.onTimerIntvel,LoopManager);
			timer.start();
		}
	}

		/**
		 * 帧循环
		 * @param event
		 */		
        private static frameLoop(event:egret.Event) : void
        {
			LoopManager.doFrameRate();
			var obj:any;
			var dic:any = LoopManager.frameLoopDic;
			for(var key in dic)
			{
				obj = LoopManager.frameLoopDic[key];
				if(obj != null)
				{
					var loopFunc:Function = obj.handler;
					loopFunc(obj.param);
				}
			}
			if(LoopManager._curTime - LoopManager._timeTime >= 100)
			{
				LoopManager._timeTime = LoopManager._curTime;
				LoopManager.timerLoop();
			}
        }

		/**
		 * 100毫秒循环
		 * @param event
		 */	
        private static timerLoop() : void
        {
			var obj:any;
			for(var i in LoopManager.timeoutDic)
			{
				obj = LoopManager.timeoutDic[i];
				if(LoopManager._curTime - obj.startTime >= obj.count)
				{
					obj.handler.apply(null, obj.arg);
					LoopManager.timeoutDic[obj.key] = null;
					delete LoopManager.timeoutDic[obj.key];
				}
			}
			for(i in LoopManager.timeLoopDic)
			{
				obj = LoopManager.timeLoopDic[i];
				if(LoopManager._curTime - obj.startTime >= obj.count)
				{
					obj.startTime = LoopManager._curTime;
					obj.handler.apply(null, obj.arg);
				}
			}
        }

		/**
		 * 1秒循环
		 * @param event
		 */	
        private static onTimerIntvel(e:egret.TimerEvent) : void
        {
			var obj:any;
			for(var i in LoopManager.secondLoopDic)
			{
				obj = LoopManager.secondLoopDic[i];
				obj.handler(obj.param);

			}
        }
		/**
		 * 添加一个enterFrame监听
		 * @param event
		 */	
        public static addToFrame(loopKey:string, loopFun:Function,params:any=null) : void
        {
			var dic:any = LoopManager.frameLoopDic;
			if(dic[loopKey] == null)
			{
				var obj:any = {handler:loopFun,param:params};
				LoopManager.frameLoopDic[loopKey] = obj;
			}
        }

        public static removeFromFrame(loopKey:string) : void
        {
            if (LoopManager.frameLoopDic[loopKey])
            {
                LoopManager.frameLoopDic[loopKey] = null;
                delete LoopManager.frameLoopDic[loopKey];
            }
        }

        public static hasFrame(loopKey:string) : Boolean
        {
            if (LoopManager.frameLoopDic[loopKey])
            {
                return true;
            }
            return false;
        }
		/**
		 * 添加一个每秒钟执行的函数
		 * @param event
		 */	
        public static addToSecond(scendKey:string, scendFun:Function,param:any) : void
        {
            if (LoopManager.secondLoopDic[scendKey] == null)
            {
				var obj:any = {handler:scendFun,param:param};
				LoopManager.frameLoopDic[scendKey] = obj;
            }
        }

        public static removeFromSceond(scendKey:string) : void
        {
            if (LoopManager.secondLoopDic[scendKey])
            {
                LoopManager.secondLoopDic[scendKey] = null;
                delete LoopManager.secondLoopDic[scendKey];
            }
        }
		
		public static hasScendKey(scendKey:string) : Boolean
		{
			if(LoopManager.secondLoopDic[scendKey])
			{
				return true;
			}
			return false;
		}

		/**
		 * 延迟回调
		 * @param handler
		 * @param time
		 * @param param3
		 * @return 
		 */		
        public static setTimeout(handler:Function, time:number, arg:Array<any> = null) : number
        {
            if (time == 0)
            {
				handler.apply(null, arg);
                return 0;
            }
			 LoopManager.delayIDKey++;
            var data:Object = {key: LoopManager.delayIDKey, startTime:egret.getTimer(), count:time, handler:handler, arg:arg};
            if ( LoopManager.timeoutDic[ LoopManager.delayIDKey] == null)
            {
                 LoopManager.timeoutDic[LoopManager.delayIDKey] = data;
            }
            return  LoopManager.delayIDKey;
        }

        public static clearTimeout(key:number) : void
        {
            if ( LoopManager.timeoutDic[key])
            {
                 LoopManager.timeoutDic[key] = null;
                delete  LoopManager.timeoutDic[key];
            }
        }

        public static hasTimeout(key:number) : Boolean
        {
            return  LoopManager.timeoutDic[key] != null;
        }
		
		/**
		 * 设置循环调用
		 * @param handler  循环方法
		 * @param time     循环时间  毫秒级  100豪秒一次检查   
		 * @param arg      参数
		 * @return    KEY
		 */		
		public static setInterval(handler:Function, time:number, arg:Array<any> = null):number
		{
			if (time == 0)
			{
				handler.apply(null, arg);
				return 0;
			}
			 LoopManager.delayIDKey++;
			var data:Object = {key: LoopManager.delayIDKey, startTime:egret.getTimer(), count:time, handler:handler, arg:arg};
			if ( LoopManager.timeLoopDic[ LoopManager.delayIDKey] == null)
			{
				 LoopManager.timeLoopDic[ LoopManager.delayIDKey] = data;
			}
			return  LoopManager.delayIDKey;
		}
		
		public static clearInterval(key:number):void
		{
			if ( LoopManager.timeLoopDic[key])
			{
				 LoopManager.timeLoopDic[key] = null;
				delete  LoopManager.timeLoopDic[key];
			}
		}
		
		public static hasInterval(key:number) : Boolean
		{
			return  LoopManager.timeLoopDic[key] != null;
		}

		/**
		 * 实际帧速
		 * @return 
		 */		
        public static get realRate() : number
        {
            return  LoopManager._realFrameRate;
        }

		/**
		 * 上一帧的毫秒数
		 * @return 
		 */		
        public static get frameHold() : number
        {
            return  LoopManager._frameHold;
        }

        private static doFrameRate() : void
        {
			LoopManager._currentFrame++;
			LoopManager._curTime = egret.getTimer();
			LoopManager._currentTime =  LoopManager._curTime;
			LoopManager._frameHold =  LoopManager._curTime -  LoopManager.lastTime;
			LoopManager.lastTime =  LoopManager._curTime;
			LoopManager.secFrames++;
			if ( LoopManager._curTime -  LoopManager.frameTime >= 1000)
			{
				LoopManager._realFrameRate = LoopManager.secFrames;
				LoopManager.frameTime =  LoopManager._curTime;
				LoopManager.secFrames = 0;
			}
            return;
        }

        public static get currentFrame() : number
        {
            return  LoopManager._currentFrame;
        }
		
		/**
		 * 当前程序时间
		 * 如果slowDown赋值不为零，则改变currentTime更新值 
		 * 控制动作和动画播放的快慢速度
		 * @return 
		 */		
		public static get currentTime():number
		{
			return  LoopManager._currentTime;
		}

		/**
		 * 帧数转毫秒
		 * @param numFrame
		 * @return 
		 */		
        public static frameToTime(numFrame:number) : number
        {
            return numFrame * (1000 /  LoopManager.stage.frameRate);
        }

		/**
		 * 秒数转帧数
		 * @param time
		 * @return 
		 */		
        public static timeToFrame(time:number) : number
        {
            return time / 1000 *  LoopManager.stage.frameRate;
        }
}