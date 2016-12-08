/**
 * @des 地图数据加载成功转换
 * @author Bean
 */	
class MapDataConvert {
	public constructor() {
	}
	public mapdata:MapVo;

	/**
		 * 转换成MAPVO 
		 * @param bytes
		 * @return 
		 * 
		 */		
		public numbertranfromToMapVO(bytes:ArrayBuffer):MapVo
		{
			return this.convertMapVO(bytes);
		}
		
		/**
		 * 将二进制地图数据转换为MapVO格式
		 * @param bytes	地图二进制 
		 * @return MapVO
		 * 
		 */
		private convertMapVO(arrBuff:ArrayBuffer):MapVo
		{
			var bytes:egret.ByteArray = new egret.ByteArray(arrBuff);
			if(this.mapdata == null)
			{
				this.mapdata = new MapVo();
			}else
			{
				this.mapdata.dispose();
			}
			var mapvo:MapVo = this.mapdata;
			bytes.position = 4 ;
			mapvo.version = bytes.readFloat() ;
			var len:number = bytes.readInt(); //特效的数组长度
			
			bytes.position = 42 ;						
			
			mapvo.col = this.readShort(bytes) ;
			mapvo.row = this.readShort(bytes) ;
			
			bytes.position += 2 ;
			
			mapvo.nodeArray = [];
			mapvo.doors = [];
			var node:MapNode;
			
			for(var i:number = 0 ; i < mapvo.col ; i++ ){
				
				
				for(var j:number = 0 ; j < mapvo.row ; j++ )
				{
					if(mapvo.nodeArray[j] == null)
						mapvo.nodeArray[j] = [] ;
					
					var buffer:number = bytes.readByte() ;
					var travel:boolean = (buffer & 1) > 0 ? true:false;	//可行走
					var isMask:boolean =  (buffer & ( 1 << 4 )) > 0 ? true:false;	//是否为遮罩
					
					var swim:boolean = (buffer & (1 << 1)) > 0 ? true:false;	//是否传送点	
					//以下4变量未开发对应的功能
//					var telepoter:boolean = boolean(buffer & (1 << 2)) ;	//是否传送点	
//					var stall:boolean = boolean(buffer & (1 << 5)) ;		//摆摊区
//					var pkzone:boolean = boolean(buffer & (1 << 6)) ;		//擂台区
					var safeArea:boolean = (buffer & (1 << 3)) > 0 ? true:false;		//安全区
					
					var mark:number = 0 ;
					if(travel)
					{
						mark = 1 ;		//可行走	
						if(isMask)
							mark = 2 ;	//遮罩
					}
					else
					{	
						mark = 0 ;		//不可走
					}
					//记录传送点
//					if(telepoter)
//					{
//						var p:Point = new Point();
//						p.y = j;
//						p.x = i;
//						mapvo.doors.push(p);
//					}
					node = MapNode.getNode();
					node.x = i;
					node.y = j;
					node.isMask = isMask;
					node.isSwim = swim;
					node.walkAble = travel;
					node.isSafe = safeArea;
					mapvo.nodeArray[j][i] = node;
					bytes.position += 1 ;
					
				}
			}
			
			mapvo.mapWidth = bytes.readShort() ;
			mapvo.mapHeight = bytes.readShort() ;
			mapvo.nodeWidth = bytes.readShort() ;
			mapvo.nodeHeight = bytes.readShort() ;
			mapvo.tileWidth = bytes.readShort() ;
			mapvo.tileHeight = bytes.readShort() ;
			
			var tileCol:number = Math.ceil( mapvo.mapWidth / MapConfig.MAP_CLIP_IMAGE_WIDTH) ;
			var tileRow:number = Math.ceil( mapvo.mapHeight / MapConfig.MAP_CLIP_IMAGE_HEIGHT) ;
			
			mapvo.tileArray = [] ;
			
			for(i = 0 ; i < tileRow ; i++)
			{
				
				if(mapvo.tileArray[i] == null)
					mapvo.tileArray[i] = [] ;
				
				for(j = 0 ; j < tileCol ; j++)
				{
					mapvo.tileArray[i][j] = j + '_' + i + ".jpg";
				}
			}
			
			//读取地图特效
			var mapEffectList:Array<MapEffectVo> = [];
			if(len > 0)
			{
				for(i = 0;i < len;i++)
				{
					var spVo:MapEffectVo = new MapEffectVo();
					spVo.tempID = i;
					spVo.sid = bytes.readInt();
					spVo.sx = bytes.readShort();
					spVo.sy = bytes.readShort();
					spVo.scaleX = bytes.readDouble();
					spVo.scaleY = bytes.readDouble();
					spVo.rotation = bytes.readInt();
					mapEffectList.push(spVo);
				}
			}
			mapvo.mapEffectList = mapEffectList;
			
			
			mapvo.mapId = parseInt(bytes.readUTF());
			mapvo.previewImageUrl = bytes.readUTF() ;
			bytes.clear();
			return mapvo ;
		}
		
		/**
		 * 配合 convertMapVO 而写的功能。
		 * @param source
		 * @return 
		 * 
		 */
		private readShort(source : egret.ByteArray) : number
		{
			var buffer:egret.ByteArray = new egret.ByteArray ;
			var v1 : number = source.readByte();
			var v2 : number = source.readByte();
			buffer.writeByte(v2);
			buffer.writeByte(v1);
			buffer.position = 0;
			return buffer.readShort();
		}
}