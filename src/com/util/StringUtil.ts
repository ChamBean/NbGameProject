class StringUtil {
	public constructor() {
	}

	/**
		 * 数据转Boolean类型
		 * @param obj
		 * @return 
		 */		
		public static toBoolean(obj:any):Boolean
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
		 * 计算天数
		 * @param $startTime $endTime
		 * @return 
		 * 
		 */
		public static getDay($startTime:number,$endTime:number):number
		{
			// Date.parse()
			// var date:DateConstructor = new DateConstructor();
			// date.time = $startTime*1000;
			// var date2:Date = new Date(date.fullYear,date.month,date.date);
			// var openTime:number = date2.time/1000;
			// var days:number = Math.ceil(($endTime - openTime)/86400);
			return 0;
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
		 * 获取字符串长度 （中英文混合）
		 * @param thisString
		 * @return 
		 * 
		 */
		public static GetStringLength(thisString : string,charSet:string = "gb2312") : number
		{  
			var thisStringBytsLength :egret.ByteArray = new egret.ByteArray();  
			// thisStringBytsLength.writeMultiByte(thisString,charSet);  thisStringBytsLength.writeUTFBytes
			return thisStringBytsLength.length;  
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
		 * 解析时间成当前时间
		 * @param time
		 * @return 
		 * 
		 */	
		public static resloveFormatLastLoginTime(time:number):string
		{
			//发过来的时间是距离1970年1月1日的秒数，因此用DATE的格式化需要乘上1000
			var t:string = "";
			// var d:Date = new Date(time * 1000);
			// t = d.fullYear + "年" + (d.month + 1) + "月" + d.date + "日" + d.hours + "时" + d.minutes + "分" + d.seconds +"秒";
			return t;
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
		 * 解析时间(年月日)
		 * @param time
		 * @return 
		 * 
		 */	
		public static formatTimeToDay(time:number):string
		{
			//发过来的时间是距离1970年1月1日的秒数，因此用DATE的格式化需要乘上1000
			var t:string = "";
			// var d:Date = new Date(time * 1000);
			// t = d.fullYear + "年" + (d.month + 1) + "月" + d.date + "日";
			return t;
		}
		
		/**
		 * 解析时间(年月日时分)
		 * @param time
		 * @return 
		 * 
		 */	
		public static formatTimeToMin(time:number):string
		{
			//发过来的时间是距离1970年1月1日的秒数，因此用DATE的格式化需要乘上1000
			var t:string = "";
			var d:Date = new Date(time * 1000);
			// t = d.fullYear + "年" + (d.month + 1) + "月" + d.date + "日" + d.hours + "时" + d.minutes + "分";
			return t;
		}
		
		
		/**
		 * 解析时间(年月日时分)
		 * 1970年1月1日10:20
		 * @param time
		 * @return 
		 * 
		 */	
		public static formatTimeToMin2(time:number):string
		{
			//发过来的时间是距离1970年1月1日的秒数，因此用DATE的格式化需要乘上1000
			var t:string = "";
			var d:Date = new Date(time * 1000);
			// t = d.fullYear + "年" + (d.month + 1) + "月" + d.date + "日" + (d.hours < 10 ? "0" 
			// 	+ d.hours : "" + d.hours) + ":" + (d.minutes < 10 ? "0" + d.minutes : "" + d.minutes);
			return t;
		}
		
		
		/**
		 * 解析时间(时分秒)
		 * 1970年1月1日10:20
		 * @param time
		 * @return 
		 */	
		public static formatTimeToMin3(time:number):string
		{
			//发过来的时间是距离1970年1月1日的秒数，因此用DATE的格式化需要乘上1000
			var t:string = "";
			var d:Date = new Date(time * 1000);
			// t = (d.hours < 10 ? "0" + d.hours : "" + d.hours) + ":" + (d.minutes < 10 ? "0" + d.minutes : "" + d.minutes)
			// 	+ ":" + (d.seconds < 10 ? "0" + d.seconds : "" + d.seconds);
			return t;
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
		 * 从原字符串中,截取一个指定字节长度的字符串 
		 * @param name
		 * @param leng
		 * @return 
		 * 
		 */		
		public static checkNameLength(name:string, leng:number = 16,charSet:string = "gb2312"):string
		{
			var ret:string = "";
			// var bytes:ByteArray = new ByteArray();
			// bytes.writeMultiByte(name, charSet);
			// if(bytes.length > leng)
			// {
			// 	bytes.position = 0;
			// 	ret = bytes.readMultiByte(leng,charSet);
			// }
			// else
			// {
			// 	ret = name;
			// }
			return ret;
		}
		
		/**
		 * 00：00
		 * @param value 秒
		 * 
		 */		
		public static formatTimeToMinSec(value:number):string
		{
			var min:number = value/60;
			var sec:number = value%60;
			var t:string = (min>=10?min:"0"+min) + ":"+(sec>=10?sec:"0"+sec);
			return t;
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