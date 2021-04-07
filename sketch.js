//add coins and nitro mode, background music from collection or code org
//put a 3 second delay before cam zooms in 

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg;
var score=0;
var jumpSound, collidedSound;

var gameOver, restart;
var coin,csound;
var backg2;
let her;
var moon;
var music1elec,music2,victorious,lol;


function preload(){
  jumpSound = loadSound("assets/sounds/jump.wav")
  collidedSound = loadSound("assets/sounds/collided.wav")
  
  backgroundImg = loadImage("assets/backgroundImg.png")
  sunAnimation = loadImage("assets/sun.png");
  
  trex_running = loadAnimation("assets/trex_2.png","assets/trex_1.png","assets/trex_3.png");
  trex_collided = loadAnimation("assets/trex_collided.png");
  
  groundImage = loadImage("assets/ground.png");
  
  cloudImage = loadImage("assets/cloud.png");
  
  obstacle1 = loadImage("assets/obstacle1.png");
  obstacle2 = loadImage("assets/obstacle2.png");
  obstacle3 = loadImage("assets/obstacle3.png");
  obstacle4 = loadImage("assets/obstacle4.png");
  
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");

  csound = loadSound("assets/sounds/undred.mp3");
  backg2 = loadImage("assets/yuep.png");
  coin = loadImage("assets/yadatscoltr.jpg");

 
  lol = loadSound("assets/sounds/darmne.mp3");
  

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  sun = createSprite(width-160,160,10,10);
  sun.addAnimation("sun", sunAnimation);
  
  sun.scale = 0.7

  moon =  createSprite(width-155,160,10,10);
  moon.addImage("moon", coin);
  moon.visible = false;
  
  moon.scale = 0.7;
  
  trex = createSprite(100,height-70,20,50);
  
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.setCollider('circle',0,0,350)
  trex.scale = 0.3
   //trex.debug=true
  
  invisibleGround = createSprite(width/2,height-5,width,125);  
  invisibleGround.shapeColor = "#f4cbaa";
  
  ground = createSprite(width/2,height,width/2,2);
  ground.addImage("ground",groundImage);
  
  ground.x = width/2
 
  //ground.scale = 1.5;
  
  gameOver = createSprite((width/2)+30,height/2-25);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite((width/2)+30,(height/2)+25);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
 
  // invisibleGround.visible =false

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;


}

function draw() {
  //trex.debug = true;
  //change camera.y so that obstacles dont get out of view, change lifetime of clouds
  her = hour();
  if(her >= 6 && her <=14) {
    background(backgroundImg);
    sun.visible = true;
  }


  else {
    background(0);
    sun.visible = false;
    moon.visible = true;

  }
  //background(backgroundImg);
  textSize(20);
  fill("white")
  text("Score: "+ score,30,50);    

  //getBackImge();

  camera.position.x = width/2;
  
  //camera.position.y = trex.y-200;
  
  textSize(20);
  fill("red");
  text("x : "+mouseX,900,45);
  text("y : "+mouseY,1000,45);
  /*console.log(trex.y);
  console.log(height-120);*/
  
  if (gameState===PLAY){
    
    

    if(score>0 && score % 100 === 0) {
      csound.play();
    }
    camera.zoom = 1;
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    camera.position.x += -(6 + 3*score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && trex.y >= 700) {
      jumpSound.play()
      trex.velocityY = -20;
       touches = [];
    }
    
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 1000){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        collidedSound.play()
        gameState = END;
    }
  }
  else if (gameState === END) {
    
    /*camera.position.x = camera.position.x +5;
    camera.position.x = camera.position.x-3;*/
    lol.play();

    if(lol.isPlaying()) {
      lol.stop();
    }

    //do if lol isplaying and camera.zoom >= 2 {lol.stop()}
    
    if(camera.zoom <= 3) {
      camera.zoom = camera.zoom+0.01;
      
      
      //camera.position.x = camera.position.x - 0.8;
    }

    if(camera.zoom >= 3) {
      //victorious.play();

      textSize(25);
      textFont("Jetbrains Mono Regular");


      if(score === 100) {
        text("WOW !! You scored "+score+"!!",(width/2)-140, (height/2)+120);
      }

      else if(score > 0 && score < 100) {
        text("NICE ! You scored "+score+"!",(width/2)-110, (height/2)+120);
      }

      else if(score > 100 && score <= 500) {
        text("SUPERB !!! You scored "+score+"!!!",(width/2)-140, (height/2)+120);
      }

      else  if(score > 0 && score > 500) {
        text("OH MY GOD !!!! You scored "+score+"!!!!",(width/2)-50, (height/2)+120);
      }
    
     
    }

    
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if((touches.length>0) || (keyDown("SPACE")) || (mousePressedOver(restart))) {      
      reset();
      touches = []
    }
  }
  
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  //was %60
  if (frameCount % 85 === 0) {
    var cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(100,220));
    cloud.addImage(cloudImage);
    cloud.scale = 0.6;
    //cloud.velocityX = -6;
    
     //assign lifetime to the variable
    cloud.lifetime = 625;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  //was %60
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(600,height-125,20,30);
    obstacle.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
   obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.7;
    obstacle.lifetime = 300;
    obstacle.depth = trex.depth;
    trex.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}

/* async function getBackImge() {
  let her = hour();
  if(her >= 6 && her <=19) {
    backgroundImg = loadImage("assets/backgroundImg.png");

  }


  else {
    backgroundImg  = loadImage("assets/yuep.png");
  }
} */
