
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"bin-debug/App.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/com/basement/manager/CBitmapData.js",
	"bin-debug/com/basement/manager/LayerManager.js",
	"bin-debug/com/basement/manager/LoadConfigManager.js",
	"bin-debug/com/basement/manager/ResourceManager.js",
	"bin-debug/com/basement/map/MapConfig.js",
	"bin-debug/com/basement/map/model/MapDataConvert.js",
	"bin-debug/com/basement/map/model/MapLoadProxy.js",
	"bin-debug/com/basement/map/model/vo/MapEffectVo.js",
	"bin-debug/com/basement/map/model/vo/MapVo.js",
	"bin-debug/com/basement/map/SceneEventName.js",
	"bin-debug/com/basement/map/view/layer/BaseMapLayer.js",
	"bin-debug/com/basement/map/view/layer/MapAvatarLayer.js",
	"bin-debug/com/basement/map/view/layer/MapBackGroundLayer.js",
	"bin-debug/com/basement/map/view/layer/MapEffectLayer.js",
	"bin-debug/com/basement/map/view/MapContainer.js",
	"bin-debug/com/basement/net/load/LoaderThread.js",
	"bin-debug/com/basement/net/load/LoadInfo.js",
	"bin-debug/com/basement/net/load/LoadManager.js",
	"bin-debug/com/basement/net/load/LoadPriorityEnum.js",
	"bin-debug/com/basement/scene/role/Avatar.js",
	"bin-debug/com/basement/scene/role/BaseRole.js",
	"bin-debug/com/basement/scene/role/data/BaseRoleData.js",
	"bin-debug/com/basement/scene/role/RoleState.js",
	"bin-debug/com/basement/scene/SceneType.js",
	"bin-debug/com/basement/timer/LoopManager.js",
	"bin-debug/com/game/module/BaseModule.js",
	"bin-debug/com/game/module/ControllerManager.js",
	"bin-debug/com/game/module/map/element/Player.js",
	"bin-debug/com/game/module/map/MapModule.js",
	"bin-debug/com/game/module/map/view/MapViewMediator.js",
	"bin-debug/com/util/StringUtil.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/ThemeAdapter.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 480,
		contentHeight: 800,
		showPaintRect: false,
		showFPS: true,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};