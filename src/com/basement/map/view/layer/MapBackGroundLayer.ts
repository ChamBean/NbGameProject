/**
 * @des 场景地图层
 * @author Bean
 */	
class MapBackGroundLayer extends BaseMapLayer {
	public constructor() {
		super();
		var sp:egret.Shape = new egret.Shape();
		sp.graphics.beginFill(0xf0ff00);
		sp.graphics.drawRect(0,0,480,800);
		sp.graphics.endFill;
		this.addChild(sp);

	}
}