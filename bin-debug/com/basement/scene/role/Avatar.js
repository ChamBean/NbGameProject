var Avatar = (function (_super) {
    __extends(Avatar, _super);
    function Avatar() {
        _super.call(this);
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
    };
    p.upDataAct = function ($dir, state) {
        this._newDir = this.getFiveDir($dir);
        this._roleData.state = state;
        this._urlKey = StringUtil.substitute(RoleState.roleUrl, this._roleData.sex, this._roleData.dress, this._roleData.sex, this._newDir, state);
        // LoadManager.ins.addGroupLoad(key,this.onLoadComplete,this);
        LoadManager.ins.addTextLoad(this._urlKey + '.json', this.onLoadTxtComplete, this);
    };
    p.onLoadTxtComplete = function (loadinfo) {
        var avatar = loadinfo.info;
        avatar._resData = JSON.parse(loadinfo.data);
        // var key:string = StringUtil.substitute(RoleState.roleUrl,avatar._roleData.dress,avatar._roleData.sex,avatar._newDir,avatar._roleData.state);
        LoadManager.ins.addImgLoad(avatar._urlKey + '.png', avatar.onLoadImgComplete, avatar);
    };
    p.onLoadImgComplete = function (loadinfo) {
        var avatar = loadinfo.info;
        //获取加载到的纹理对象
        var bitmap = loadinfo.content;
        //创建纹理对象
        if (avatar._texture == null)
            avatar._texture = new egret.Texture();
        avatar._texture.bitmapData = bitmap.bitmapData;
        avatar.createMovieClip(loadinfo);
    };
    p.createMovieClip = function (loadinfo) {
        var avatar = loadinfo.info;
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
    };
    p.onLoadComplete = function (loadinfo) {
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
    p.dispos = function () {
        this._bodyMc.stop();
    };
    return Avatar;
}(egret.DisplayObjectContainer));
egret.registerClass(Avatar,'Avatar');
//# sourceMappingURL=Avatar.js.map