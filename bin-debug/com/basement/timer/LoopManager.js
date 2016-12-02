var LoopManager = (function () {
    function LoopManager() {
    }
    var d = __define,c=LoopManager,p=c.prototype;
    LoopManager.init = function ($stage) {
        if (LoopManager._isInited == false) {
            LoopManager.frameLoopDic = {};
            LoopManager.timeoutDic = {};
            LoopManager.timeLoopDic = {};
            LoopManager.secondLoopDic = {};
            LoopManager.stage = $stage;
            LoopManager.stage.addEventListener(egret.Event.ENTER_FRAME, LoopManager.frameLoop, null);
            LoopManager._isInited = true;
            LoopManager._currentTime = egret.getTimer();
            var timer = new egret.Timer(1000);
            timer.addEventListener(egret.TimerEvent.TIMER, LoopManager.onTimerIntvel, LoopManager);
            timer.start();
        }
    };
    /**
     * 帧循环
     * @param event
     */
    LoopManager.frameLoop = function (event) {
        LoopManager.doFrameRate();
        var obj;
        var dic = LoopManager.frameLoopDic;
        for (var key in dic) {
            obj = LoopManager.frameLoopDic[key];
            if (obj != null) {
                var loopFunc = obj.handler;
                loopFunc(obj.param);
            }
        }
        if (LoopManager._curTime - LoopManager._timeTime >= 100) {
            LoopManager._timeTime = LoopManager._curTime;
            LoopManager.timerLoop();
        }
    };
    /**
     * 100毫秒循环
     * @param event
     */
    LoopManager.timerLoop = function () {
        var obj;
        for (var i in LoopManager.timeoutDic) {
            obj = LoopManager.timeoutDic[i];
            if (LoopManager._curTime - obj.startTime >= obj.count) {
                obj.handler.apply(null, obj.arg);
                LoopManager.timeoutDic[obj.key] = null;
                delete LoopManager.timeoutDic[obj.key];
            }
        }
        for (i in LoopManager.timeLoopDic) {
            obj = LoopManager.timeLoopDic[i];
            if (LoopManager._curTime - obj.startTime >= obj.count) {
                obj.startTime = LoopManager._curTime;
                obj.handler.apply(null, obj.arg);
            }
        }
    };
    /**
     * 1秒循环
     * @param event
     */
    LoopManager.onTimerIntvel = function (e) {
        var obj;
        for (var i in LoopManager.secondLoopDic) {
            obj = LoopManager.secondLoopDic[i];
            obj.handler(obj.param);
        }
    };
    /**
     * 添加一个enterFrame监听
     * @param event
     */
    LoopManager.addToFrame = function (loopKey, loopFun, params) {
        var dic = LoopManager.frameLoopDic;
        if (dic[loopKey] == null) {
            var obj = { handler: loopFun, param: params };
            LoopManager.frameLoopDic[loopKey] = obj;
        }
    };
    LoopManager.removeFromFrame = function (loopKey) {
        if (LoopManager.frameLoopDic[loopKey]) {
            LoopManager.frameLoopDic[loopKey] = null;
            delete LoopManager.frameLoopDic[loopKey];
        }
    };
    LoopManager.hasFrame = function (loopKey) {
        if (LoopManager.frameLoopDic[loopKey]) {
            return true;
        }
        return false;
    };
    /**
     * 添加一个每秒钟执行的函数
     * @param event
     */
    LoopManager.addToSecond = function (scendKey, scendFun, param) {
        if (LoopManager.secondLoopDic[scendKey] == null) {
            var obj = { handler: scendFun, param: param };
            LoopManager.frameLoopDic[scendKey] = obj;
        }
    };
    LoopManager.removeFromSceond = function (scendKey) {
        if (LoopManager.secondLoopDic[scendKey]) {
            LoopManager.secondLoopDic[scendKey] = null;
            delete LoopManager.secondLoopDic[scendKey];
        }
    };
    LoopManager.hasScendKey = function (scendKey) {
        if (LoopManager.secondLoopDic[scendKey]) {
            return true;
        }
        return false;
    };
    /**
     * 延迟回调
     * @param handler
     * @param time
     * @param param3
     * @return
     */
    LoopManager.setTimeout = function (handler, time, arg) {
        if (arg === void 0) { arg = null; }
        if (time == 0) {
            handler.apply(null, arg);
            return 0;
        }
        LoopManager.delayIDKey++;
        var data = { key: LoopManager.delayIDKey, startTime: egret.getTimer(), count: time, handler: handler, arg: arg };
        if (LoopManager.timeoutDic[LoopManager.delayIDKey] == null) {
            LoopManager.timeoutDic[LoopManager.delayIDKey] = data;
        }
        return LoopManager.delayIDKey;
    };
    LoopManager.clearTimeout = function (key) {
        if (LoopManager.timeoutDic[key]) {
            LoopManager.timeoutDic[key] = null;
            delete LoopManager.timeoutDic[key];
        }
    };
    LoopManager.hasTimeout = function (key) {
        return LoopManager.timeoutDic[key] != null;
    };
    /**
     * 设置循环调用
     * @param handler  循环方法
     * @param time     循环时间  毫秒级  100豪秒一次检查
     * @param arg      参数
     * @return    KEY
     */
    LoopManager.setInterval = function (handler, time, arg) {
        if (arg === void 0) { arg = null; }
        if (time == 0) {
            handler.apply(null, arg);
            return 0;
        }
        LoopManager.delayIDKey++;
        var data = { key: LoopManager.delayIDKey, startTime: egret.getTimer(), count: time, handler: handler, arg: arg };
        if (LoopManager.timeLoopDic[LoopManager.delayIDKey] == null) {
            LoopManager.timeLoopDic[LoopManager.delayIDKey] = data;
        }
        return LoopManager.delayIDKey;
    };
    LoopManager.clearInterval = function (key) {
        if (LoopManager.timeLoopDic[key]) {
            LoopManager.timeLoopDic[key] = null;
            delete LoopManager.timeLoopDic[key];
        }
    };
    LoopManager.hasInterval = function (key) {
        return LoopManager.timeLoopDic[key] != null;
    };
    d(LoopManager, "realRate"
        /**
         * 实际帧速
         * @return
         */
        ,function () {
            return LoopManager._realFrameRate;
        }
    );
    d(LoopManager, "frameHold"
        /**
         * 上一帧的毫秒数
         * @return
         */
        ,function () {
            return LoopManager._frameHold;
        }
    );
    LoopManager.doFrameRate = function () {
        LoopManager._currentFrame++;
        LoopManager._curTime = egret.getTimer();
        LoopManager._currentTime = LoopManager._curTime;
        LoopManager._frameHold = LoopManager._curTime - LoopManager.lastTime;
        LoopManager.lastTime = LoopManager._curTime;
        LoopManager.secFrames++;
        if (LoopManager._curTime - LoopManager.frameTime >= 1000) {
            LoopManager._realFrameRate = LoopManager.secFrames;
            LoopManager.frameTime = LoopManager._curTime;
            LoopManager.secFrames = 0;
        }
        return;
    };
    d(LoopManager, "currentFrame"
        ,function () {
            return LoopManager._currentFrame;
        }
    );
    d(LoopManager, "currentTime"
        /**
         * 当前程序时间
         * 如果slowDown赋值不为零，则改变currentTime更新值
         * 控制动作和动画播放的快慢速度
         * @return
         */
        ,function () {
            return LoopManager._currentTime;
        }
    );
    /**
     * 帧数转毫秒
     * @param numFrame
     * @return
     */
    LoopManager.frameToTime = function (numFrame) {
        return numFrame * (1000 / LoopManager.stage.frameRate);
    };
    /**
     * 秒数转帧数
     * @param time
     * @return
     */
    LoopManager.timeToFrame = function (time) {
        return time / 1000 * LoopManager.stage.frameRate;
    };
    LoopManager._isInited = false;
    LoopManager._realFrameRate = 30;
    LoopManager._frameHold = 30;
    return LoopManager;
}());
egret.registerClass(LoopManager,'LoopManager');
//# sourceMappingURL=LoopManager.js.map