/**
 * 特效实现类
 * @author Bean
 * @since 2016.12.04
 */
var CustomMoviClip = (function (_super) {
    __extends(CustomMoviClip, _super);
    function CustomMoviClip() {
        _super.call(this);
    }
    var d = __define,c=CustomMoviClip,p=c.prototype;
    p.setRes = function (data, texture, mcName) {
        this._resData = data;
        this._mcTexture = texture;
        this._mcName = mcName;
        if (this._mcBitmap) {
            this._mcBitmap.count(false);
            this._mcBitmap = null;
        }
        this.createMc();
    };
    p.startLoad = function (url, mcName, priority) {
        if (priority === void 0) { priority = 0; }
        if (this._url == url && this.isPlaying)
            return;
        if (this._mcBitmap) {
            this._mcBitmap.count(false);
            this._mcBitmap = null;
        }
        this._url = url;
        App.ins.configManager.getConfig(url + '.json', this.onLoadTxtComplete, this, priority);
        App.ins.resManager.getImageRes(url + '.png', this.onLoadImgComplete, this, priority);
    };
    p.onLoadTxtComplete = function (obj) {
        var avatar = obj.data;
        avatar._resData = JSON.parse(obj.cfg);
        avatar.createMc();
    };
    p.onLoadImgComplete = function (obj) {
        var avatar = obj.data;
        avatar._mcBitmap = obj.bmd;
        obj.bmd.count(true);
        avatar._mcTexture = obj.bmd.texture;
        avatar.createMc();
    };
    p.createMc = function () {
        var mc = this;
        if (mc._resData == null || mc._mcTexture == null || mc._mcTexture.bitmapData == null)
            return;
        var mcFactor = new egret.MovieClipDataFactory(this._resData, this._mcTexture);
        mc.movieClipData = mcFactor.generateMovieClipData(mc._mcName);
        mc.play(-1);
        this.dispatchEvent(new egret.Event(EventName.MOVIE_CREATE_SUCCESS));
        // this.addEventListener(egret.MovieClipEvent.RENDER)
    };
    p.dispos = function () {
        this.stop();
        this._resData = null;
        if (this._mcBitmap != null) {
            this._mcBitmap.count(false);
            this._mcBitmap = null;
        }
        this._mcTexture = null;
        if (this.parent)
            this.parent.removeChild(this);
    };
    return CustomMoviClip;
}(egret.MovieClip));
egret.registerClass(CustomMoviClip,'CustomMoviClip');
//# sourceMappingURL=CustomMoviClip.js.map