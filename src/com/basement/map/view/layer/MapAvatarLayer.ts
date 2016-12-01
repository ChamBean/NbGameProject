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
		var layer:MapAvatarLayer = this;
        this._roleArr = new Array();
		addRole();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,addRole,this);
		for(var i:number = 0;i < 1;i++)
		{
			addRole(null);
		}
		function addRole(event:egret.TouchEvent=null):void
        {
            var data:BaseRoleData = new BaseRoleData();
            data.dir = Math.floor(Math.random() * 7);
            data.sex = Math.floor(Math.random()*1.9);
            data.dress = Math.floor(Math.random()*2.9);
			var index:number = Math.floor(Math.random()*3.9);
			var obj:any = RoleState.STATES;
			var state:string = obj[index];
            data.state = state;
            var role:BaseRole = new BaseRole();
            layer.addChild(role);
            role.x = 30 + Math.random() * 450;
            role.y = 100 + Math.random() * 750;
            role.setRoleData(data);
            layer._roleArr.push(role);
			// egret.log('舞台宽度'+ layer.stage.stageWidth,'     舞台高度'+ layer.stage.stageHeight);
        }
        
        var dir:number = 0;
        egret.setInterval(function(){
            for(var i:number = 0;i < layer._roleArr.length;i++){
                var role:BaseRole = layer._roleArr[i];
                dir = role.roleData.dir;
                 dir++;
                if(dir > SceneType.LEFT_TOP)
                    dir = 0;
                role.roleData.dir = dir;
                role.setRoleData(role.roleData);
            }
        },layer,2000);
	}
}