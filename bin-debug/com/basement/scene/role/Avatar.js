var Avatar = (function (_super) {
    __extends(Avatar, _super);
    function Avatar() {
        _super.call(this);
        this._bodyCbmd = null;
        this._weaponCbmd = null;
        this._newDir = 0;
        this.bodyHeight = 0;
        this._weaponUrl = '';
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
        this._newDir = this.getFiveDir(dir, this._bodyMc);
        var key = StringUtil.substitute(Avatar.ROLEKEY, this._roleData.dress, this._roleData.sex, this._newDir, state);
        // var key:string = StringUtil.substitute(Avatar.roleUrl,this._roleData.sex,this._roleData.dress,this._roleData.sex,this._newDir,state);
        if (this._bodyMcName == key && this._bodyMc.isPlaying)
            return;
        this._bodyMcName = key;
        this._bodyResData = null;
        this._bodytexture = null;
        if (this._bodyCbmd) {
            this._bodyCbmd.count(false);
            this._bodyCbmd = null;
        }
        key = StringUtil.substitute(Avatar.roleUrl, this._roleData.sex, key);
        App.ins.configManager.getConfig(key + '.json', this.onLoadTxtComplete, this, LoadPriorityEnum.AVATAR_PRIORITY);
        App.ins.resManager.getImageRes(key + '.png', this.onLoadImgComplete, this, LoadPriorityEnum.AVATAR_PRIORITY);
        this.checkWeapon();
    };
    p.onLoadTxtComplete = function (obj) {
        var avatar = obj.data;
        avatar._bodyResData = JSON.parse(obj.cfg);
        avatar.createBodyMc();
        // var key:string = StringUtil.substitute(RoleState.roleUrl,avatar._roleData.dress,avatar._roleData.sex,avatar._newDir,avatar._roleData.state);
    };
    p.onLoadImgComplete = function (obj) {
        var avatar = obj.data;
        avatar._bodyCbmd = obj.bmd;
        obj.bmd.count(true);
        avatar._bodytexture = obj.bmd.texture;
        avatar.createBodyMc();
    };
    p.createBodyMc = function () {
        var avatar = this;
        if (avatar._bodyResData == null || avatar._bodytexture == null || avatar._bodytexture.bitmapData == null)
            return;
        var mcFactor = new egret.MovieClipDataFactory(this._bodyResData, this._bodytexture);
        // if(this.scaleX == -1)
        // this.anchorOffsetX
        avatar._bodyMc.movieClipData = mcFactor.generateMovieClipData(this._bodyMcName);
        avatar._bodyMc.play(-1);
        // avatar._bodyMc.addEventListener(egret.Event.LOOP_COMPLETE, function (){
        // egret.log("LOOP_COMPLETE");
        // egret.log('++++帧频：' + avatar._bodyMc.frameRate);
        // }, this);
        if (this.bodyHeight < this._bodyMc.height) {
            this.bodyHeight = this._bodyMc.height;
            this.dispatchEvent(new egret.Event(SceneEventName.UPDATA_ROLE_SIZE, false));
        }
    };
    /**检查是否需要加载武器mc */
    p.checkWeapon = function () {
        if (this._roleData.type == RoleType.TYPE_PLAYER) {
            if (this._weaponMc == null) {
                this._weaponMc = new egret.MovieClip();
                this.addChild(this._weaponMc);
            }
            var dir = this._roleData.dir;
            var state = this._roleData.state;
            var key = StringUtil.substitute(Avatar.WEAPONKEY, this._newDir, state);
            this._newDir = this.getFiveDir(dir, this._weaponMc);
            if (this._weaponUrl == key && this._weaponMc.isPlaying)
                return;
            this._weaponUrl = key;
            this._weaponResData = null;
            this._weaponTexture = null;
            if (this._weaponCbmd)
                this._weaponCbmd.count(false);
            key = StringUtil.substitute(Avatar.WEAPONURL, key);
            App.ins.configManager.getConfig(key + '.json', this.onLoadWeaponComplete, this, LoadPriorityEnum.AVATAR_PRIORITY);
            App.ins.resManager.getImageRes(key + '.png', this.onLoadWeaponComplete, this, LoadPriorityEnum.AVATAR_PRIORITY);
        }
    };
    p.onLoadWeaponComplete = function (obj) {
        var avatar = obj.data;
        var url = obj.url;
        if (url.split('.')[1] == 'json') {
            avatar._weaponResData = JSON.parse(obj.cfg);
            avatar.createWeaponMc();
        }
        else if (url.split('.')[1] == 'png') {
            avatar._weaponCbmd = obj.bmd;
            obj.bmd.count(true);
            avatar._weaponTexture = obj.bmd.texture;
            avatar.createWeaponMc();
        }
    };
    p.createWeaponMc = function () {
        var avatar = this;
        if (avatar._weaponResData == null || avatar._weaponTexture == null || avatar._weaponTexture.bitmapData == null)
            return;
        var mcFactor = new egret.MovieClipDataFactory(this._weaponResData, this._weaponTexture);
        avatar._weaponMc.movieClipData = mcFactor.generateMovieClipData(this._weaponMcName);
        avatar._weaponMc.play(-1);
    };
    p.getFiveDir = function ($dir, mc) {
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
        mc.scaleX = scalex;
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
    p.clear = function () {
        this.stop();
        this._bodyResData = null;
        this._bodyCbmd.count(false);
        this._bodyCbmd = null;
        this._roleData = null;
        this.removeChild(this._bodyMc);
        this._bodyMc = null;
    };
    /**url  性别 key*/
    Avatar.roleUrl = 'resource/art/movie/body/{0}/{1}';
    /**url 服装类型 性别 朝向 状态*/
    Avatar.ROLEKEY = 'body00{0}_{1}_{2}{3}';
    /**url 朝向 状态*/
    Avatar.WEAPONKEY = 'weapon000_1_{0}{1}';
    /**url  */
    Avatar.WEAPONURL = 'resource/art/movie/weapon/{0}';
    return Avatar;
}(egret.DisplayObjectContainer));
egret.registerClass(Avatar,'Avatar');
//# sourceMappingURL=Avatar.js.map