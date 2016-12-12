var HtmlUtil = (function () {
    function HtmlUtil() {
    }
    var d = __define,c=HtmlUtil,p=c.prototype;
    HtmlUtil.getHtmlStr = function (str) {
        var textflowArr = HtmlUtil.htmlParser.parser(str);
        return textflowArr;
    };
    p.test = function () {
        // Date.UTC()
        // var reg:RegExp = new RegExp();RegExp.$5
    };
    HtmlUtil.htmlParser = new egret.HtmlTextParser();
    return HtmlUtil;
}());
egret.registerClass(HtmlUtil,'HtmlUtil');
//# sourceMappingURL=HtmlUtil.js.map