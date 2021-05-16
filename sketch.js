var bird, background1Img, background1,birdImg,helicopterImg,helicopter,monsterImg,monster,pillarImg,pillar;
var helicopterGroup;
var pillarGroup;
var monsterGroup,batAnimation,bat;



var PLAY=1;
var END=0;
var gameState=PLAY;

var score=0;

var life=3;

function preload(){
  background1Img=loadImage("images/background.jpeg");
  birdImg=loadImage("images/bird1.jpeg");
 
  helicopterImg=loadImage("images/helicopter.png");
  monsterImg=loadImage("images/monster.png");

batAnimation = loadAnimation("bat/bat1.png","bat/bat2.png","bat/bat3.png",
                        "bat/bat4.png","bat/bat5.png","bat/bat6.png",
                        "bat/bat7.png","bat/bat8.png","bat/bat9.png",
                       "bat/bat10.png","bat/bat11.png","bat/bat12.png");

}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background1=createSprite(windowWidth/2,windowHeight/2 , windowWidth, windowHeight);
  background1.addImage(background1Img);
  background1.scale=5;

  bird=createSprite(windowWidth/3,windowHeight/3,windowWidth/2,windowHeight/2);
  bird.addImage(birdImg);
  bird.scale=0.5;



  helicopterGroup=new Group();
  pillarGroup=new Group();
  monsterGroup=new Group();




  
}

function draw() {
  background("white"); 
 
  

  bird.velocityY=0; 
  if(gameState===PLAY){
    var r = Math.round(random(1,2));
    if(r===1){
      obstacle()
     }
     else{
       pillars();
     }
     monsters();
     if(keyDown(UP_ARROW)){
      bird.velocityY=-4;
    }
    
    if(keyDown(DOWN_ARROW)){
      bird.velocityY=4;
    }
    if(bird.isTouching(monsterGroup) || bird.isTouching(helicopterGroup) || bird.isTouching(pillarGroup)){
      gameState=END;
      life=life-1;
      console.log(life);
    }


  
    score=score+Math.round(frameCount/900);
   // console.log("iscoming"); 
  }
  else{
      helicopterGroup.setVelocityXEach(0);
      monsterGroup.setVelocityXEach(0);
      bird.setVelocity(0,0);
      pillarGroup.setVelocityXEach(0);
      pillarGroup.setLifetimeEach(-1);
      helicopterGroup.setLifetimeEach(-1);
      monsterGroup.setLifetimeEach(-1);
      sleep(5000);

if(life!=0){
  reset();
}
  }

 



//console.log(gameState);

//console.log("Hello");
//sleep(2000).then(() => { console.log("World!"); });






  drawSprites();
  textSize(30);
  fill("black");
  text("Score: "+score,100,100);

  if(life===0){
    textSize(40);
    fill("black");
    text('Game Over ',windowWidth/2,windowHeight/2);
  }
  
  textSize(25);
  fill('black');
  text("You have only "+ life +" lives remaining",300,100);

  


  
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function obstacle(){
  if(frameCount % 200===0){
  helicopter=createSprite(-10,windowHeight-600);
  

 
    helicopter.addImage(helicopterImg);
 
  
  helicopter.velocityX=4;
  helicopter.scale=0.5;
  helicopter.y=random(50,400);
  helicopter.lifetime=350;
  helicopterGroup.add(helicopter);
 //console.log(windowWidth/4);
 // s=d/t  
}
}

function pillars(){
  if(frameCount % 300===0){
 pillar=createSprite(windowWidth,windowHeight-200,100,800);
 pillar.shapeColor="brown"
  //var rand = Math.round(random(1,2));
  pillar.velocityX=-4;
  pillar.lifetime=350;
  pillarGroup.add(pillar);


  }
}

function monsters(){
  if(frameCount % 550 === 0){
    monster=createSprite(windowWidth,windowHeight-500);
    monster.addAnimation("moving_bat",batAnimation);
    monster.scale=1;
    monster.velocityX=-4;
    monster.y=random(50,350);
    monster.lifetime=350;
    monsterGroup.add(monster);

  }
}



function reset(){
  gameState=PLAY;
  helicopterGroup.destroyEach();
  monsterGroup.destroyEach();
  pillarGroup.destroyEach();

}