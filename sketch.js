var PLAY
var END
var gameState
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600, 400);
  monkey = createSprite(50,350,20,50);
  monkey.addAnimation("running", monkey_running);
   

  monkey.scale = 0.15;
  
  ground = createSprite(200,400,400,20);
  ground.x = ground.width /2;
  
   
  invisibleGround =        createSprite(200,400,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  foodGroup = createGroup();

  score = 0;

}


function draw() {
gamestate=PLAY
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState == PLAY){

        
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60)
    
       
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space") ) {
        monkey.velocityY = -12;
            }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the banana
    spawnBanana();
  
   // spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
        monkey.velocityY = -12;
        gameState = END;
            
    }
  }
 
    
     
     
    // ground.velocityX = 0;
     // monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
   // obstaclesGroup.setLifetimeEach(-1);
    //foodGroup.setLifetimeEach(-1);
     
     //obstaclesGroup.setVelocityXEach(0);
    // foodGroup.setVelocityXEach(0);    
   
  
 
  //stop monkey from falling down
  monkey.collide(invisibleGround);
  
drawSprites()

  
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 200 == 0) {
    //y=Math.round(random(10,350));
    var banana = createSprite(600,200,40,10);
    banana.y = Math.round(random(20,300));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    //banana.depth = monkey.depth;
    //monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    foodGroup.add(banana);
  }
}

function spawnObstacles(){

  if (frameCount % 60 == 0)
 {   var obstacle= createSprite(550,350,20,20);
obstacle.x=Math.round(random(50,550));
   obstacle.addImage(obstacleImage);
 obstacle.scale=0.25;
 obstacle.velocityX=-4;
//  obstacle.lifetime=200;
//  obstaclesGroup.add(obstacle);
  
   
}
}