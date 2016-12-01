var LoadPriorityEnum = (function () {
    function LoadPriorityEnum() {
    }
    var d = __define,c=LoadPriorityEnum,p=c.prototype;
    /**
             *声音文件
             */
    LoadPriorityEnum.SOUND_PROPITY = 15;
    /**
     * 普通图片
     */
    LoadPriorityEnum.IMAGE_PRIORITY = 5;
    /**
     * 地图切片
     */
    LoadPriorityEnum.MAPCLIP_PRIORITY = 1;
    /**
     * 地图配置文件
     */
    LoadPriorityEnum.MAPCONFIG_PRIORITY = 10;
    /**
     * 特效
     */
    LoadPriorityEnum.EFFECT_PRIORITY = 0;
    /**
     * 人物
     */
    LoadPriorityEnum.AVATAR_PRIORITY = 2;
    /**
     * 我自己的人物
     */
    LoadPriorityEnum.MY_AVATAR_PRIORITY = 9;
    return LoadPriorityEnum;
}());
egret.registerClass(LoadPriorityEnum,'LoadPriorityEnum');
//# sourceMappingURL=LoadPriorityEnum.js.map