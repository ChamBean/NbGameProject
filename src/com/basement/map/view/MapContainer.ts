/**
 * @des 场景容器
 * @author Bean
 */	
class MapContainer extends egret.DisplayObjectContainer {

	public constructor() {
		super();
		this.touchEnabled = true;
		var sp:egret.Shape = new egret.Shape();
		sp.graphics.beginFill(0xffffff,1);
		sp.graphics.drawRect(0,0,MapConfig.MAP_SCREEN_WIDTH,MapConfig.MAP_SCREEN_HEIGHT);
		sp.graphics.endFill();
		this.addChild(sp);
	}


	public clear():void{

	}

	public updataPosition(offx:number,offy:number):void{
		this.x = offx*-1;
		this.y = offy*-1;
	}

}