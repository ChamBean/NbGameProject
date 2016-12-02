/**
 * @des 场景形象层 
 * @author Bean
 */	
class MapAvatarLayer extends BaseMapLayer {
	public constructor() {
		super();
	}
	private _roleArr:Array<BaseRole>;
	public init():void{
        var sp:egret.Shape = new egret.Shape();
		sp.graphics.beginFill(0xf0ff00);
		sp.graphics.drawRect(0,0,480,800);
		sp.graphics.endFill;
		this.addChild(sp);
		var layer:MapAvatarLayer = this;
        this._roleArr = new Array();
		// addRole();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.move,this);
		for(var i:number = 0;i < 18;i++)
		{
			addRole();
		}
		function addRole():void
        {
            // this.load();
            var data:BaseRoleData = new BaseRoleData();
            data.dir = 4//Math.floor(Math.random() * 7);
            data.sex = Math.floor(Math.random()*1.9);
            data.dress = Math.floor(Math.random()*2.9);
			var index:number = Math.floor(Math.random()*3.9);
			var obj:any = RoleState.STATES;
			var state:string = obj[index];
            data.state = RoleState.ROLE_STAND;
            var role:Player = new Player();
            layer.addChild(role);
            role.x = 30 + Math.random() * 450;
            role.y = 100 + Math.random() * 750;
            role.setRoleData(data);
            layer._roleArr.push(role);
        }
	}

    private move(event:egret.TouchEvent):void{
         this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.move,this);
        var role:BaseRole = null;
        for(var i:number = 0;i < this._roleArr.length;i++)
        {
            role = this._roleArr[i];
            role.randomMove();
        }
        // if(event.target == role)
        //     role = event.target;
        // var p:egret.Point = new egret.Point(event.localX,event.localY);
        // var arr:Array<egret.Point> = [p];
        // role.startMove(arr);
    }


}