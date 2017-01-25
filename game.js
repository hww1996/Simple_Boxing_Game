var camera,scene,renderer,P1FightLeftHand=true,P2FightLeftHand=false,game,p1,p2,p1Life,p2Life,statue,isFinished=false;

function ResetGame(){//游戏初始化
	game={
		P1canJump:true,
		P1canGoLeft:true,
		P1canGoRight:true,
		P2canJump:true,
		P2canGoLeft:true,
		P2canGoRight:true,
		mapLength:30,//地图大小
		walkSpeed:0.2,//走路速度
		jumpHeight:10,//跳的高度
	}
}

function init(){
	scene=new THREE.Scene();
	camera=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,10000);
	renderer=new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth,window.innerHeight);
	document.body.appendChild(renderer.domElement);
	p1=document.getElementById('p1');
	p2=document.getElementById('p2');
	statue=document.getElementById('statue');
	//初始生命为100
	p1Life=100;
	p2Life=100;
}


var fighterP1,fighterP2;//玩家1,2
function createGeometry(){
	fighterP1=new Fighter();
	fighterP1.mesh.position.x=-10;
	fighterP2=new Fighter();
	fighterP2.turnLeft();
	fighterP2.mesh.position.x=10;
	scene.add(fighterP1.mesh);
	scene.add(fighterP2.mesh);
}


function initCamera(){
	camera.position.set(0,0,30);
	camera.lookAt(new THREE.Vector3(0,0,0));
}


function Crash(attackPlayer,checkPlayer){
	var originPosition=attackPlayer.mesh.position.clone();
	var check=[];
	check.push(checkPlayer.mesh);
	var collisionResults;
	for(var i=0;i<attackPlayer.mesh.children.length;i++){
		var checkMesh=attackPlayer.mesh.children[i];
		var checkPoint=new THREE.Vector3(originPosition.x+checkMesh.position.x,originPosition.y+checkMesh.position.y,originPosition.z+checkMesh.position.z);
		for(var j=0;j<checkMesh.geometry.vertices.length;j++){
			var vetex=checkMesh.geometry.vertices[j].clone();
			var ray=new THREE.Raycaster(checkPoint, vetex.clone().normalize());
			collisionResults=ray.intersectObjects(check,true);
			if(collisionResults.length>0&&collisionResults[0].distance<vetex.length()){
				return true;
			}
		}
	}
	return false;
}


function onKeyUpListener(et){
	if(isFinished)
		return;
	switch(et.keyCode){
		//p1控制1
		case 70://用手打
			fighterP1.attackByHand(P1FightLeftHand);
			if(!fighterP2.isDefence&&Crash(fighterP1,fighterP2)){
				p2Life-=2;
			}
			setTimeout("fighterP1.HandGetBack("+P1FightLeftHand+");",100);
			P1FightLeftHand=!P1FightLeftHand;
			break;
		case 71://用脚踢
			fighterP1.attackByFoot();
			if(Crash(fighterP1,fighterP2)){
				p2Life-=4;
			}
			setTimeout("fighterP1.FootGetBack();",100);
			break;
		case 83://动作回复
			fighterP1.ResetByDirection();
			break;
		case 87://跳
			if(game.P1canJump){
				fighterP1.mesh.position.y+=game.jumpHeight;
			}
			break;
		
		//p2控制1	
		case 73://跳
			if(game.P2canJump){
				fighterP2.mesh.position.y+=game.jumpHeight;
			}
			break;
		case 75://动作回复
			fighterP2.ResetByDirection();
			break;
		case 186://用手打
			fighterP2.attackByHand(P2FightLeftHand);
			if(!fighterP1.isDefence&&Crash(fighterP2,fighterP1)){
				p1Life-=2;
			}
			setTimeout("fighterP2.HandGetBack("+P2FightLeftHand+");",100);
			P2FightLeftHand=!P2FightLeftHand;
			break;
		case 222://用脚踢
			fighterP2.attackByFoot();
			if(Crash(fighterP2,fighterP1)){
				p1Life-=4;
			}
			setTimeout("fighterP2.FootGetBack();",100);
			break;
		default:
			break;
	}
}

function onKeyDownListener(et){
	switch(et.keyCode){
		//p1控制2
		case 83://防御
			fighterP1.defence();
			break;
		case 65://向左走
			if(game.P1canGoLeft){
				fighterP1.turnLeft();
				fighterP1.mesh.position.x-=game.walkSpeed;
			}
			break;
		case 68://向右走
			if(game.P1canGoRight){
				fighterP1.turnRight();
				fighterP1.mesh.position.x+=game.walkSpeed;
			}
			break;
			
		//p2控制2
		case 74://向左走
			if(game.P2canGoLeft){
				fighterP2.turnLeft();
				fighterP2.mesh.position.x-=game.walkSpeed;
			}
			break;
		case 76://向右走
			if(game.P2canGoRight){
				fighterP2.turnRight();
				fighterP2.mesh.position.x+=game.walkSpeed;
			}
			break;
		case 75://防御
			fighterP2.defence();
			break;
		default:
			break;
	}
}


function loop(){
	ResetGame();
	if(fighterP1.mesh.position.y>0){
		fighterP1.mesh.position.y-=0.2;
		game.P1canJump=false;
	}
	if(fighterP1.mesh.position.x>game.mapLength){
		game.P1canGoRight=false;
	}
	if(fighterP1.mesh.position.x<-game.mapLength){
		game.P1canGoLeft=false;
	}
	
	if(fighterP2.mesh.position.y>0){
		fighterP2.mesh.position.y-=0.2;
		game.P2canJump=false;
	}
	if(fighterP2.mesh.position.x>game.mapLength){
		game.P2canGoRight=false;
	}
	if(fighterP2.mesh.position.x<-game.mapLength){
		game.P2canGoLeft=false;
	}
	//防止穿过模型
	if(Crash(fighterP1,fighterP2)){
		if(fighterP1.mesh.position.x>fighterP2.mesh.position.x){
			game.P1canGoLeft=false;
			game.P2canGoRight=false;
		}
		else{
			game.P1canGoRight=false;
			game.P2canGoLeft=false;
		}
	}
	//胜利
	if(p2Life<1){
		statue.innerHTML="p1 win.";
		isFinished=true;
	}
	if(p1Life<1){
		statue.innerHTML="p2 win.";
		isFinished=true;
	}
	p1.innerHTML="p1:"+p1Life;
	p2.innerHTML="p2:"+p2Life;
	renderer.render(scene,camera);
	requestAnimationFrame(loop);
}

function main(){
	init();
	createGeometry();
	initCamera();
	document.addEventListener('keyup',onKeyUpListener,false);
	document.addEventListener('keydown',onKeyDownListener,false);
	loop();
}
main();
