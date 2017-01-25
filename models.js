//人形建模

var Fighter=function(){
	this.direction=1;//防御
	this.isDefence=false;//是否在防御
	
	this.mesh=new THREE.Object3D();
	var head=new THREE.Mesh(new THREE.SphereGeometry(1),new THREE.MeshBasicMaterial({color:0xff0000}));
	head.name="head";
	this.mesh.add(head);
	
	var body=new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.3,4),new THREE.MeshBasicMaterial({color:0x00ff00}));
	body.name="body";
	body.position.set(0,-3,0);
	this.mesh.add(body);
	
	this.leftArm=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,1.5),new THREE.MeshBasicMaterial({color:0x0000ff}));
	this.leftArm.name="leftArm";
	this.leftArm.rotation.z=Math.PI/4;
	this.leftArm.position.set(0.8,-3,0.3);
	this.mesh.add(this.leftArm);
	
	this.leftHand=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,1.5),new THREE.MeshBasicMaterial({color:0x0000ff}));
	this.leftHand.name="leftHand";
	this.leftHand.rotation.z=-Math.PI/4;
	this.leftHand.position.set(2,-3,0.3);
	this.mesh.add(this.leftHand);
	
	this.rightArm=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,1.5),new THREE.MeshBasicMaterial({color:0xff0000}));
	this.rightArm.name="rightArm";
	this.rightArm.rotation.z=Math.PI/4;
	this.rightArm.position.set(0.8,-2,-0.3);
	this.mesh.add(this.rightArm);
	
	this.rightHand=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,1.5),new THREE.MeshBasicMaterial({color:0xff0000}));
	this.rightHand.name="rightHand";
	this.rightHand.rotation.z=-Math.PI/4;
	this.rightHand.position.set(2,-2,-0.3);
	this.mesh.add(this.rightHand);
	
	this.leftLeg=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,5),new THREE.MeshBasicMaterial({color:0x0000ff}));
	this.leftLeg.name="leftLeg";
	this.leftLeg.rotation.z=-Math.PI/12;
	this.leftLeg.position.set(-0.8,-7.5,0);
	//this.leftLeg.rotation.z-=Math.PI/2;
	this.mesh.add(this.leftLeg);
	
	this.rightLeg=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,5),new THREE.MeshBasicMaterial({color:0xff0000}));
	this.rightLeg.name="rightLeg";
	this.rightLeg.rotation.z=Math.PI/12;
	this.rightLeg.position.set(0.8,-7.5,0);
	this.mesh.add(this.rightLeg);
}

//手部动作
Fighter.prototype.attackByHand=function(isLeftHand){
	this.isDefence=false;
	if(isLeftHand){
		HandAttack(this.leftArm,this.leftHand,this.direction);
	}
	else
		HandAttack(this.rightArm,this.rightHand,this.direction);
}

Fighter.prototype.HandGetBack=function(isLeftHand){
	if(isLeftHand){
		HandBack(this.leftArm,this.leftHand,this.direction);
	}
	else
		HandBack(this.rightArm,this.rightHand,this.direction);
}

function HandAttack(arm,hand,direction){
	arm.rotation.z=Math.PI/2;
	arm.position.x=1*direction;
	hand.rotation.z=Math.PI/2;
	hand.position.x=2.5*direction;
}

function HandBack(arm,hand,direction){
	arm.rotation.z=Math.PI/4*direction;
	arm.position.x-=0.2*direction;
	hand.rotation.z=-Math.PI/4*direction;
	hand.position.x-=0.5*direction;
}

//脚部动作
Fighter.prototype.attackByFoot=function(){
	this.isDefence=false;
	if(this.direction>0){
		FootAttack(this.rightLeg,this.direction);
	}
	else
		FootAttack(this.leftLeg,this.direction);
}

Fighter.prototype.FootGetBack=function(){
	if(this.direction>0){
		FootBack(this.rightLeg,this.direction);
	}
	else
		FootBack(this.leftLeg,this.direction);
}

function FootAttack(leg,direction){
	leg.rotation.z=7*Math.PI/12*direction;
	leg.position.y=-4.5;
	leg.position.x=2.5*direction;
}

function FootBack(leg,direction){
	leg.rotation.z=Math.PI/12*direction;
	leg.position.y=-7.5;
	leg.position.x=0.8*direction;
}


//转右
Fighter.prototype.turnRight=function(){
	if(this.direction>0)
		return;
	else{
		this.direction=1;
		Right(this.leftArm,this.leftHand,this.rightArm,this.rightHand,this.leftLeg,this.rightLeg);
	}
		
}

function Right(leftArm,leftHand,rightArm,rightHand,leftLeg,rightLeg){
	leftArm.rotation.z=Math.PI/4;
	leftArm.position.set(0.8,-3,0.3);
	
	leftHand.rotation.z=-Math.PI/4;
	leftHand.position.set(2,-3,0.3);
	
	rightArm.rotation.z=Math.PI/4;
	rightArm.position.set(0.8,-2,-0.3);
	
	rightHand.rotation.z=-Math.PI/4;
	rightHand.position.set(2,-2,-0.3);
	
	leftLeg.rotation.z=-Math.PI/12;
	leftLeg.position.set(-0.8,-7.5,0);
	
	rightLeg.rotation.z=Math.PI/12;
	rightLeg.position.set(0.8,-7.5,0);
}

//转左
Fighter.prototype.turnLeft=function(){
	if(this.direction<0)
		return;
	else{
		this.direction=-1;
		Left(this.leftArm,this.leftHand,this.rightArm,this.rightHand,this.leftLeg,this.rightLeg);
	}	
}

function Left(leftArm,leftHand,rightArm,rightHand,leftLeg,rightLeg){
	
	leftArm.rotation.z=-Math.PI/4;
	leftArm.position.set(-0.8,-3,0.3);
	
	leftHand.position.set(-2,-3,0.3);
	leftHand.rotation.z=Math.PI/4;
	
	rightArm.rotation.z=-Math.PI/4;
	rightArm.position.set(-0.8,-2,-0.3);
	
	rightHand.rotation.z=Math.PI/4;
	rightHand.position.set(-2,-2,-0.3);
	
	
	leftLeg.rotation.z=-Math.PI/12;
	leftLeg.position.set(-0.8,-7,0);
	
	rightLeg.rotation.z=Math.PI/12;
	rightLeg.position.set(0.8,-7,0);
}

//防御
Fighter.prototype.defence=function(){
	this.isDefence=true;
	
	this.leftArm.rotation.z=Math.PI/2;
	this.leftArm.position.x=1*this.direction;
	this.leftHand.position.x=2*this.direction;
	this.leftHand.rotation.z=0;
	this.leftHand.position.y=-2.2;
	
	this.rightArm.rotation.z=Math.PI/2;
	this.rightArm.position.x=1*this.direction;
	this.rightHand.position.x=2*this.direction;
	this.rightHand.rotation.z=0;
	this.rightHand.position.y=-1.2;
}

//回复
Fighter.prototype.ResetByDirection=function(){
	this.isDefence=false;
	if(this.direction>0)
		Right(this.leftArm,this.leftHand,this.rightArm,this.rightHand,this.leftLeg,this.rightLeg);
	else
		Left(this.leftArm,this.leftHand,this.rightArm,this.rightHand,this.leftLeg,this.rightLeg);
	return false;
}
