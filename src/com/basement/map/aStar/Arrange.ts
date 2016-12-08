class Arrange {
	public constructor() {
		this.init();
	}
	private _arr:Array<MapNode>;
	private _compareFun:Function;
	private _key:string;
	private _desending:boolean = true;

	private init():void {
			this._arr = [];
			this._compareFun = this.compares;
		}
		public set desending(d:boolean) {
			this._desending = d;
		}
		
		public put(obj:MapNode):void {

			var len:number = this._arr.length;
			if (len < 1) {
				this._arr.push(obj);
				return;
			}
			
			var s:number = 0;
			var e:number = len-1;
			
			while (len > 1) {
				
				var mid:number = Math.floor(s + len / 2);
				var result:number = this._compareFun(obj, this._arr[mid]);
				switch(result) {
					case -1:
					s = mid;
					break;
					case 0:
					this._arr.splice(mid, 0, obj);
					return;
					case 1:
					e = mid;
					break;
				}
				len = e-s;
			}
			
			result = this._compareFun(obj, this._arr[s]);
			if (result == 1 || result==0) {
				this._arr.splice(s, 0, obj);
				return;
			}
			result = this._compareFun(obj, this._arr[e]);
			if (result == 1 || result==0) {
				this._arr.splice(e, 0, obj);
				return;
			}else {
				this._arr.splice(e+1, 0, obj);
			}
			
		}
		
		public set key(k:string) {
			if (k != null && k != "") this._key = k;
		}
		public set compareWitchNum(b:boolean) {
			
			if (b) {
				this._compareFun = this.cwitchNum;
			}
		}
		private cwitchNum(n:number, m:number):number {
			
			var result:number = n - m;
			if (!this._desending) result *= -1;
			if (result < 0) return -1;
			if (result > 0) return 1;
			return 0;
		}
		
		private  compares(obja:MapNode, objB:MapNode):number {
			
			var result:number = obja[this._key] - objB[this._key];
			if (!this._desending) result *= -1;
			if (result < 0) return -1;
			if (result > 0) return 1;
			return 0;
		}
		
		public pop():MapNode {
			
			return this._arr.pop();
		}
		public shift():MapNode {
			return this._arr.shift();
		}
		public get array():Array<MapNode> {
			return this._arr;
		}
		public clear():void {
			this._arr = [];
		}
		public rePlaceArr(arr:Array<MapNode>, des:boolean = true,key:string = ""):Array<MapNode> {
			if (arr == null || arr.length < 2) return arr;
			if (key == null || key == "") this._compareFun = this.cwitchNum;
			this.desending = des;
			this.clear();
			for(var i in arr) {
				this.put(arr[i]);
			}
			arr = this.array;
			return arr;
		}
}