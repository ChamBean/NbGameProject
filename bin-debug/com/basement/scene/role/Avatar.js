/**
 * 场景角色形象实现
 * @author Bean
 * @since 2016.12.04
 */
var Avatar = (function (_super) {
    __extends(Avatar, _super);
    function Avatar() {
        _super.call(this);
        this._newDir = 0;
        this.bodyHeight = 0;
        var mc = new CustomMoviClip;
        this._bodyMc = mc;
        this._bodyMc.addEventListener(EventName.MOVIE_CREATE_SUCCESS, this.createBodyComplete, this);
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
        var mcName = StringUtil.substitute(Avatar.ROLEKEY, this._roleData.dress, this._roleData.sex, this._newDir, state);
        // var key:string = StringUtil.substitute(Avatar.roleUrl,this._roleData.sex,this._roleData.dress,this._roleData.sex,this._newDir,state);
        var key = StringUtil.substitute(Avatar.roleUrl, this._roleData.sex, mcName);
        this._bodyMc.startLoad(key, mcName, LoadPriorityEnum.AVATAR_PRIORITY);
        this.checkWeapon();
    };
    p.onBodyEnterFrame = function () {
        if (this._weaponMc && this._weaponMc.movieClipData != null)
            this._weaponMc.gotoAndStop(this._bodyMc.currentFrame);
    };
    p.createBodyComplete = function (e) {
        var avatar = this;
        if (avatar.bodyHeight < avatar._bodyMc.height) {
            avatar.bodyHeight = avatar._bodyMc.height;
            avatar.dispatchEvent(new egret.Event(SceneEventName.UPDATA_ROLE_SIZE, false));
        }
        // if(this._weaponMc){
        // }
    };
    /**检查是否需要加载武器mc */
    p.checkWeapon = function () {
        if (this._roleData.type == RoleType.TYPE_PLAYER) {
            if (this._weaponMc == null) {
                this._weaponMc = new CustomMoviClip();
                this._weaponMc.addEventListener(EventName.MOVIE_CREATE_SUCCESS, this.createWeaponComplete, this);
                this.addChild(this._weaponMc);
            }
            var dir = this._roleData.dir;
            var state = this._roleData.state;
            var mcName = StringUtil.substitute(Avatar.WEAPONKEY, this._newDir, state);
            this._newDir = this.getFiveDir(dir, this._weaponMc);
            var key = StringUtil.substitute(Avatar.WEAPONURL, mcName);
            this._weaponMc.startLoad(key, mcName, LoadPriorityEnum.AVATAR_PRIORITY);
            if (!this._bodyMc.hasEventListener(egret.Event.ENTER_FRAME))
                this._bodyMc.addEventListener(egret.Event.ENTER_FRAME, this.onBodyEnterFrame, this);
        }
        else if (this._bodyMc.hasEventListener(egret.Event.ENTER_FRAME)) {
            this._bodyMc.removeEventListener(egret.Event.ENTER_FRAME, this.onBodyEnterFrame, this);
        }
    };
    p.createWeaponComplete = function () {
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
        if (this._weaponMc)
            this._weaponMc.gotoAndStop(this._bodyMc.currentFrame);
    };
    p.gotoAndStop = function (frame) {
        this._bodyMc.gotoAndStop(frame);
        if (this._weaponMc)
            this._weaponMc.gotoAndStop(this._bodyMc.currentFrame);
    };
    p.gotoAndPlay = function (frame, playTimes) {
        if (playTimes === void 0) { playTimes = 0; }
        this._bodyMc.gotoAndPlay(frame, playTimes);
        if (this._weaponMc)
            this._weaponMc.gotoAndPlay(frame, playTimes);
    };
    p.clear = function () {
        this._roleData = null;
        this._bodyMc.removeEventListener(EventName.MOVIE_CREATE_SUCCESS, this.createBodyComplete, this);
        this._bodyMc.dispos();
        this._bodyMc = null;
        if (this._weaponMc) {
            this._weaponMc.removeEventListener(EventName.MOVIE_CREATE_SUCCESS, this.createWeaponComplete, this);
            this._weaponMc.dispos();
            this._weaponMc = null;
        }
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