class StringUtil {
	public constructor() {
	}

	/**
		 * 数据转boolean类型
		 * @param obj
		 * @return 
		 */		
		public static toboolean(obj:any):boolean
		{
			if(obj == null)
			{
				return false;
			}
			if(obj == "false")
			{
				return false;
			}
			if(obj == 0)
			{
				return false;
			}
			return true;
		}
		
		/**
		 * 把数字转成  1000->1,000
		 * @param $value
		 * @return 
		 * 
		 */
		public static formatNum($value:number):string
		{
			var strNum:string = $value.toString();
			
			if(strNum.length > 3)
			{
				var arr:Array<string> = new Array();  
				var start:number;  
				var end:number = strNum.length;  
				while (end > 0) {  
					start = Math.max(end - 3, 0);  
					arr.unshift(strNum.slice(start, end));  
					end = start;  
				}
				strNum = arr.join(",");  
			}
			
			return strNum;
		}
		
		/**
		 * 获得中文周几
		 * @param $num
		 * 
		 */
		public static getWeekDay($num:number):string
		{
			var arr:Array<string> = ["日","一","二","三","四","五","六"];
			return arr[$num];
		}
		
		/**
		 * 获得中文数字（0~10） 
		 * @param $num
		 * 
		 */
		public static getChieseNum($num:number):string
		{
			var arr:Array<string> = ["零","一","二","三","四","五","六","七","八","九","十"];
			return arr[$num];
		}
		
		/**
		 * 将一个整数的时间值格式化为00:00:00格式的时间值
		 * @param time 秒数
		 * @return 
		 * 
		 */		
		public static formatToTime(time:number):string
		{
			var second:number = time% 60;
			var minute:number= ((time - second) / 60 ) % 60;
			var hour:number = (time -60*minute-second) / 3600;
			var strSecond:string = second < 10 ? "0" + second.toString():second.toString();
			var strMinute:string = minute < 10 ? "0" + minute.toString():minute.toString();
			var strHour:string = hour < 10 ? "0" + hour.toString():hour.toString();
			return strHour+":"+strMinute+":"+strSecond;
		}
		
		/**
		 * 将一个整数的时间值格式化为 00小时00分00秒 格式的时间值
		 * @param time 秒数
		 * @return 
		 * 
		 */		
		public static formatToTime_V2(time:number):string
		{
			var second:number = time% 60;
			var minute:number= ((time - second) / 60 ) % 60;
			var hour:number = (time -60*minute-second) / 3600;
			var strMinute:string = minute == 0 ? "": minute.toString() + "分";
			var strHour:string = hour == 0 ? "": hour.toString() + "小时";
			return strHour + strMinute + second + "秒";
		}
		
		/**
		 * 将一个整数的时间值格式化为 00小时00分 格式的时间值
		 * @param time 秒数
		 * @return 
		 */		
		public static formatToTime_V3(time:number):string
		{
			var second:number = time% 60;
			var minute:number= ((time - second) / 60 ) % 60;
			var hour:number = (time -60*minute-second) / 3600;
			var strMinute:string = minute < 10 ? ("0"+minute):minute.toString();
			var strHour:string = hour < 10 ? ("0"+hour):hour.toString();
			return strHour + "时"+ strMinute+"分";
		}
		
		/**
		 * 将一个整数的时间值格式化为 00分00秒 格式的时间值
		 * @param time 秒数
		 * @return 
		 */		
		public static formatToTime_V4(time:number):string
		{
			var second:number = time% 60;
			var minute:number= ((time - second) / 60 ) % 60;
			var strMinute:string = minute < 10 ? "0"+minute:minute.toString();
			var strSecond:string = second < 10?"0"+second:second.toString();
			return strMinute + "分" + strSecond + "秒";
		}

		/**
		* 将毫秒数转化为01:18:56格式
		* @param        time 毫秒数
		* @return  返回格式：01:08:56
		* @example
		* <listing>
		*                 convertTime(4136); // 01:08:56
		* </listing>
		*/
		public static convertTime(time:number, separator:string = ":"):string 
		{
		        var hour:number = Math.ceil(time / 3600);
		        var min:number = Math.ceil(time % 3600 / 60);
		        var sec:number = Math.ceil(time % 60);
		                        
		        return (hour < 10 ? "0" + hour : "" + hour)
		        + separator + (min < 10 ? "0" + min : "" + min)
		        + separator + (sec < 10 ? "0" + sec : "" + sec);
		}

		/**
		 * 解析时间成当前时间(天时分秒)
		 * @param time
		 * @return 
		 * 
		 */	
		public static resloveFormatLastLoginTime2(time:number):string
		{
			var second:number = time%60;
			var minute:number= ((time - second) / 60 ) % 60;
			var hour:number = (time%86400 -60*minute-second) / 3600;
			var day:number = Math.floor(time / 86400);
			var strSecond:string = second < 10 ? "0" + second.toString():second.toString();
			var strMinute:string = minute < 10 ? "0" + minute.toString():minute.toString();
			var strHour:string = hour < 10 ? "0" + hour.toString():hour.toString();
			var strDay:string = "";
			if(day > 0)
			{
				strDay = day + "天";
			}
			return strDay + strHour+ "时"+strMinute+"分"+strSecond + "秒";
		}
		
		
		/**
		 * 替换所有的字符串,通过split and join
		 * Repalce all string by split and join;
		 */
		public static replaceAllBySplit(strSource:string, strReplaceFrom:string, strRepalceTo:string):string {
			return strSource == null ? null : strSource.split(strReplaceFrom).join(strRepalceTo);
		}
		
		/**
		 * 替换所有的字符串,通过正则
		 * Replace all string by RegEx;
		 */
		public static replaceAllByRegex(strSource:string, strReplaceFrom:string, strRepalceTo:string):string {
			return strSource == null ? null : strSource.replace(new RegExp(strReplaceFrom, 'g'), strRepalceTo);
		}
		
		/**
		 * 区间取随机数 
		 * @param min
		 * @param max
		 * @return 
		 */		
		public static randRange(min:number, max:number):number
		{
			var randomNum:number = Math.floor(Math.random() * (max - min + 1)) + min;
			return randomNum;
		}
		
		/**
		 *  动态替换字符
		 *  Substitutes "{n}" tokens within the specified string
		 *  with the respective arguments passed in.
		 *
		 *  @param str The string to make substitutions in.
		 *  This string can contain special tokens of the form
		 *  <code>{n}</code>, where <code>n</code> is a zero based index,
		 *  that will be replaced with the additional parameters
		 
		 *  found at that index if specified.
		 *
		 *  @param rest Additional parameters that can be substituted
		 *  in the <code>str</code> parameter at each <code>{n}</code>
		 *  location, where <code>n</code> is an integer (zero based)
		 *  index value into the array of values specified.
		 *  If the first parameter is an array this array will be used as
		 *  a parameter list.
		 *  This allows reuse of this routine in other methods that want to
		 *  use the ... rest signature.
		 *  For example <pre>
		 *     public myTracer(str:string, ... rest):void
		 *     { 
		 *         label.text += StringUtil.substitute(str, rest) + "\n";
		 *     } </pre>
		 *
		 *  @return New string with all of the <code>{n}</code> tokens
		 *  replaced with the respective arguments specified.
		 *
		 *  @example
		 *
		 *  var str:string = "here is some info '{0}' and {1}";
		 *  trace(StringUtil.substitute(str, 15.4, true));
		 * 
		 *  // this will output the following string:
		 *  // "here is some info '15.4' and true"
		 */
		public static substitute(str:string, ... rest):string
		{
			// Replace all of the parameters in the msg string.
			var len:number = rest.length;
			var args:Array<any>;
			if (len == 1 && egret.is(rest[0],'Array'))
			{
				args = rest[0] as Array<any>;
				len = args.length;
			}
			else
			{
				args = rest;
			}
			
			str = str.replace(/\\t/g, "	");
			for (var i:number = 0; i < len; i++)
			{
				str = str.replace(new RegExp("\\{"+i+"\\}", "g"), args[i]);
			}
			return str;
		}
		
		/**
		 * 获取字串长度
		 * @param str	字符串
		 * @param ChineseLen	单个中文的长度
		 * @return 
		 * 
		 */		
		public static getStringLen(str:string, ChineseLen:number = 2):number
		{
			var len:number = 0;
			if (str)
			{
				var tmp:string = '';
				for (var i:number = 0; i < ChineseLen; i++)
				{
					tmp += 'x';
				}
				len = str.replace(/[^\x00-\xff]/g, tmp).length;
			}
			return len;
		}
}