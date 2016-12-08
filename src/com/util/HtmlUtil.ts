class HtmlUtil {
	public constructor() {
	}

	private static htmlParser:egret.HtmlTextParser = new egret.HtmlTextParser();

	public static getHtmlStr(str:string):egret.ITextElement[]
	{
		var textflowArr:Array<egret.ITextElement> = HtmlUtil.htmlParser.parser(str);
		return textflowArr;
	}
}