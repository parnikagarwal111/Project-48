var bgImage,bg;
var ground,groundImage;
var boy,boyImage;
var obstacles,obstacleGroup;
var PLAY=1,END=0,WIN=2;
var gameState=PLAY;
var greenHat,brownHat,yellowHat,blueHat,redHat,orangeHat,purpleHat,whiteHat;
var greenHatImg,brownHatImg,yellowHatImg,blueHatImg,redHatImg,orangeHatImg,purpleHatImg,whiteHatImg;
var ob1,ob2,ob3,ob4,ob5,ob6;
var score=0;
var jumpSound,dieSound;
var win;
var life=3,heart;

function preload(){
  boyImage=loadAnimation("doraemon1.png","doraemon2.png","doraemon3.png","doraemon4.png");
  win=loadAnimation("win.png");
  groundImage=loadImage("ground1.png");
  bgImage=loadImage("ground3.png");
  greenHatImg=loadImage("greenHat.png");
  brownHatImg=loadImage("brownHat.png");
  yellowHatImg=loadImage("yellowHat.png");
  blueHatImg=loadImage("blueHat.png");
  redHatImg=loadImage("redHat.png");
  orangeHatImg=loadImage("orangeHat.png");
  purpleHatImg=loadImage("purpleHat.png");
  whiteHatImg=loadImage("whiteHat.png");

  ob1=loadImage("obstacle 1.png");
  ob2=loadImage("obstacle 2.png");
  ob3=loadImage("obstacle 3.png");
  ob4=loadImage("obstacle 4.png");
  ob5=loadImage("obstacle 5.png");
  ob6=loadImage("obstacle 6.png");

  heart=loadImage("heart.png");

  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");

}

function setup() {
  createCanvas(1350,650);
  
  //bg
  bg=createSprite(675,-180,1600,650);
  bg.addImage(bgImage);
  bg.velocityX=-4;
  bg.scale=5.5;

  //ground
  ground=createSprite(700,850,1400,40);
  ground.addImage("ground",groundImage);
  ground.scale=5.5;
  ground.velocityX=-10;
  ground.visible=true;

  //boy
  boy=createSprite(280,550,30,100);
  boy.addAnimation("boy",boyImage);
  boy.addAnimation("win",win);
  boy.scale=0.4;
  
  obstacleGroup=new Group();
  gGroup=new Group();
  bGroup=new Group();
  yGroup=new Group();
  blueGroup= new Group();
  rGroup=new Group();
  oGroup= new Group();
  pGroup=new Group();
  wGroup=new Group();

  }

function draw() {
  background(0);
  console.log(boy.y);

  if(gameState===PLAY){
  if(bg.x<0){
    bg.x=bg.width/2;
  }

  if(ground.x<0){
    ground.x=ground.width/2;
  }

  //increasing score and destroying hats
  //green
  if(boy.isTouching(gGroup)){
    score=1;
    greenHat.velocityX=0;
    greenHat.x=boy.x;
    greenHat.y=boy.y-100;
  }
  //brown
  if(boy.isTouching(bGroup)){
    score=2;
    gGroup.destroyEach();
    brownHat.velocityX=0;
    brownHat.x=boy.x;
    brownHat.y=boy.y-100;
  }
  //yellow
  if(boy.isTouching(yGroup)){
    score=3;
    bGroup.destroyEach();
    yellowHat.velocityX=0;
    yellowHat.x=boy.x;
    yellowHat.y=boy.y-100;
  }
  //blue
  if(boy.isTouching(blueGroup)){
    score=4;
    yGroup.destroyEach();
    blueHat.velocityX=0;
    blueHat.x=boy.x;
    blueHat.y=boy.y-100;
  }
  //red
  if(boy.isTouching(rGroup)){
    score=5;
    blueGroup.destroyEach();
    redHat.velocityX=0;
    redHat.x=boy.x;
    redHat.y=boy.y-100;
  }
  //orange
  if(boy.isTouching(oGroup)){
    score=6;
    rGroup.destroyEach();
    orangeHat.velocityX=0;
    orangeHat.x=boy.x;
    orangeHat.y=boy.y-100;
  }
  //purple
  if(boy.isTouching(pGroup)){
    score=7;
    oGroup.destroyEach();
    purpleHat.velocityX=0;
    purpleHat.x=boy.x;
    purpleHat.y=boy.y-100;
  }
  //white
  if(boy.isTouching(wGroup)){
    score=7;
    gameState=WIN;
  }

  //space key 
  if(keyDown("space") && boy.y>=494){
    jumpSound.play();
    boy.velocityY=-15;
  }
  boy.velocityY=boy.velocityY+0.5;
  boy.collide(ground);

  
  if(life===0){
    gameState=END;
  }

  
  //function
  spawnObstacles();
  spawnHats();
  drawSprites();

  if(boy.isTouching(obstacleGroup)){
    dieSound.play();
    obstacleGroup.destroyEach();
   /* textSize(70);
    fill("red");
    stroke("white");
    text("BEWARE",300,200);*/
    life=life-1;
  }


   //displaying life
   if(life===3){
    textSize(30);
    fill("black");
    text("Chances",70,50);
    image(heart,200,20,40,40);
    image(heart,250,20,40,40);
    image(heart,300,20,40,40);

  }

  if(life===2){
    textSize(30);
    fill("black");
    text("Chances",70,50);
    image(heart,200,20,40,40);
    image(heart,250,20,40,40);
    
  }
  if(life===1){
    textSize(30);
    fill("black");
    text("Chances",70,50);
    image(heart,200,20,40,40);

  }

  //score display
  textSize(30);
  fill("black");
  text("Hats collected   "+score+"/8",1000,50);
}

  if(gameState===END){
    textSize(150);
    fill("red");
    stroke("white");
    text("GAME OVER",200,350);
    textSize(50);
    text("Better Luck Next Time",400,450);
  }

  if (gameState===WIN){
    pGroup.destroyEach();
    obstacleGroup.destroyEach();
    boy.scale=0.15;
    boy.changeAnimation("win",win);
    bg.velocityX=0;
    ground.velocityX=0;
    boy.x=675;
    boy.y=325;
    whiteHat.x=boy.x-15;
    whiteHat.y=boy.y-125;
    drawSprites();
    textSize(60);
    fill("white");
    stroke("white");
    text("YOU REACHED THE SILICON VALLEY",200,150);
  }
}

function spawnObstacles(){
  if(frameCount%257===0){
    obstacles=createSprite(1350,560,30,100);
    obstacles.velocityX=-10;
    obstacles.lifetime=340;

    var rand=Math.round(random(1,6));
    switch(rand){
      case 1: obstacles.addImage(ob1);
      obstacles.scale=0.2;
      break;
      case 2: obstacles.addImage(ob2);
      obstacles.y=570;
      obstacles.scale=0.1;
      break;
      case 3: obstacles.addImage(ob3);
      obstacles.y=510;
      obstacles.setCollider("rectangle",0,0,10,10);
      obstacles.scale=0.4;
      break;
      case 4: obstacles.addImage(ob4);
      obstacles.scale=0.05;
      break;
      case 5: obstacles.addImage(ob5);
      obstacles.scale=0.1;
      break;
      case 6: obstacles.addImage(ob6);
      obstacles.scale=0.1;
      break;
      default:
      break;
    }
    obstacleGroup.add(obstacles);
  }
}

function spawnHats(){
  //green hat
  if(frameCount===1500){
    greenHat=createSprite(1350,540,50,50);
    greenHat.addImage(greenHatImg);
    greenHat.scale=0.3;
    greenHat.velocityX=-4;
    //greenHat.lifetime=340;
    gGroup.add(greenHat);
  }

  //brown hat
  if(frameCount===3000){
    brownHat=createSprite(1350,540,50,50);
    brownHat.addImage(brownHatImg);
    brownHat.scale=0.3;
    brownHat.velocityX=-4;
    //brownHat.lifetime=340;
    bGroup.add(brownHat);
  }

  //yellow hat
  if(frameCount===4500){
    yellowHat=createSprite(1350,550,50,50);
    yellowHat.addImage(yellowHatImg);
    yellowHat.scale=0.3;
    yellowHat.velocityX=-4;
   // yellowHat.lifetime=340;
    yGroup.add(yellowHat);
  }

  //blue hat
  if(frameCount===6000){
    blueHat=createSprite(1350,540,50,50);
    blueHat.addImage(blueHatImg);
    blueHat.scale=0.2;
    blueHat.velocityX=-4;
    //blueHat.lifetime=340;
    blueGroup.add(blueHat);
  }

  //red hat
  if(frameCount===7500){
    redHat=createSprite(1350,540,50,50);
    redHat.addImage(redHatImg);
    redHat.scale=0.2;
    redHat.velocityX=-4;
    //redHat.lifetime=340;
    rGroup.add(redHat);
  }

  //orange hat
  if(frameCount===9000){
    orangeHat=createSprite(1350,540,50,50);
    orangeHat.addImage(orangeHatImg);
    orangeHat.scale=0.4;
    orangeHat.velocityX=-4;
    //orangeHat.lifetime=340;
    oGroup.add(orangeHat);
  }

  //purple hat 
  if(frameCount===10500){
    purpleHat=createSprite(1350,540,50,50);
    purpleHat.addImage(purpleHatImg);
    purpleHat.scale=0.3;
    purpleHat.velocityX=-4;
   // purpleHat.lifetime=340;
    pGroup.add(purpleHat);
  }

  //white hat
  if(frameCount===12000){
    whiteHat=createSprite(1350,540,50,50);
    whiteHat.addImage(whiteHatImg);
    whiteHat.scale=0.3;
    whiteHat.velocityX=-4;
   // whiteHat.lifetime=340;
    wGroup.add(whiteHat);
  }
}