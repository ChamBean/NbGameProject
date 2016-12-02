var Avatar = (function (_super) {
    __extends(Avatar, _super);
    function Avatar() {
        _super.call(this);
        this.bodyHeight = 0;
        this._newDir = 0;
        // var sp:egret.Shape = new egret.Shape();
        // sp.graphics.beginFill(0xff0000,1);
        // sp.graphics.drawRect(0,0,10,10);
        // sp.graphics.endFill;
        // // sp.anchorOffsetX = 100;
        // this.addChild(sp);
        var mc = new egret.MovieClip();
        this._bodyMc = mc;
        // this._bodyMc.frameRate = 12;
        this.addChild(mc);
    }
    var d = __define,c=Avatar,p=c.prototype;
    p.setAvatarData = function (data) {
        this._roleData = data;
        this.upDataAct();
    };
    p.upDataAct = function () {
        var dir = this._roleData.dir;
        var state = this._roleData.state;
        this._newDir = this.getFiveDir(dir);
        this._roleData.state = state;
        this._resData = null;
        this._texture = null;
        this._urlKey = StringUtil.substitute(RoleState.roleUrl, this._roleData.sex, this._roleData.dress, this._roleData.sex, this._newDir, state);
        // LoadManager.ins.addGroupLoad(key,this.onLoadComplete,this);
        // LoadManager.ins.addTextLoad(this._urlKey,this.onLoadTxtComplete,this);
        LoadConfigManager.ins.getConfig(this._urlKey + '.json', this.onLoadTxtComplete, this, LoadPriorityEnum.EFFECT_PRIORITY);
        ResourceManager.ins.getImageRes(this._urlKey + '.png', this.onLoadImgComplete, this, LoadPriorityEnum.EFFECT_PRIORITY);
        egret.log('生成对象地址' + this._urlKey);
    };
    p.onLoadTxtComplete = function (obj) {
        var avatar = obj.data;
        avatar._resData = JSON.parse(obj.cfg);
        avatar.createMovieClip();
        // var key:string = StringUtil.substitute(RoleState.roleUrl,avatar._roleData.dress,avatar._roleData.sex,avatar._newDir,avatar._roleData.state);
    };
    p.onLoadImgComplete = function (obj) {
        var avatar = obj.data;
        var cmd = obj.bmd;
        //创建纹理对象
        if (avatar._texture == null)
            avatar._texture = new egret.Texture();
        avatar._texture.bitmapData = cmd.bitmapData;
        avatar.createMovieClip();
    };
    p.createMovieClip = function () {
        var avatar = this;
        if (avatar._resData == null || avatar._texture == null || avatar._texture.bitmapData == null)
            return;
        var mcFactor = new egret.MovieClipDataFactory(this._resData, this._texture);
        // if(this.scaleX == -1)
        // this.anchorOffsetX
        var mcName = StringUtil.substitute(RoleState.ROLEKEY, avatar._roleData.dress, avatar._roleData.sex, avatar._newDir, avatar._roleData.state);
        avatar._bodyMc.movieClipData = mcFactor.generateMovieClipData(mcName);
        avatar._bodyMc.play(-1);
        avatar._bodyMc.addEventListener(egret.Event.LOOP_COMPLETE, function () {
            // egret.log("LOOP_COMPLETE");
            // egret.log('++++帧频：' + avatar._bodyMc.frameRate);
        }, this);
        if (this.bodyHeight < this._bodyMc.height) {
            this.bodyHeight = this._bodyMc.height;
            this.dispatchEvent(new egret.Event(SceneEventName.UPDATA_ROLE_SIZE, false));
        }
        egret.log('创建对象成功' + mcName);
    };
    p.getFiveDir = function ($dir) {
        var newDir = $dir;
        var scalex = 1;
        switch ($dir) {
            case SceneType.LEFT_BOTTOME:
                scalex = -1;
                newDir = SceneType.RIGHT_BOTTOME;
                break;
            case SceneType.LEFT:
                scalex = -1;
                newDir = SceneType.RIGHT;
                break;
            case SceneType.LEFT_TOP:
                scalex = -1;
                newDir = SceneType.RIGHT_TOP;
                break;
        }
        this._bodyMc.scaleX = scalex;
        return newDir;
    };
    p.stop = function () {
        this._bodyMc.stop();
    };
    p.gotoAndStop = function (frame) {
        this._bodyMc.gotoAndStop(frame);
    };
    p.gotoAndPlay = function (frame, playTimes) {
        if (playTimes === void 0) { playTimes = 0; }
        this._bodyMc.gotoAndPlay(frame, playTimes);
    };
    return Avatar;
}(egret.DisplayObjectContainer));
egret.registerClass(Avatar,'Avatar');
//# sourceMappingURL=Avatar.js.map