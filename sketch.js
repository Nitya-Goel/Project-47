var PLAY = 1;
var END = 0;
var gameState = PLAY;

var pencil, pencilImg;
var ground, invisibleGround, groundImage;


var erasersGroup, erase, eraserImg;

var score=0;

var gameOver, restart;


function preload(){
  pencilImg =   loadAnimation("pencil.png");
  
  groundImage = loadImage("ground2.png");
  
 
  
  eraserImg = loadImage("eraser.png");
    
  bgImg= loadImage("bg.jpg");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(1600, 700);
  
  pencil = createSprite(50,100,20,50);
  
  pencil.addAnimation("running", pencilImg);
 
  pencil.scale = 0.2;
  
  ground = createSprite(200,530,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(800,350);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(800,390);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,530,400,10);
  invisibleGround.visible = false;
  
 
  erasersGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(bgImg);
  fill("red")
  textSize(30);
  text("Score: "+ score, 1000,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
    if(keyDown("space") && pencil.y >= 300) {
      pencil.velocityY = -12;
    }
  
    pencil.velocityY = pencil.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    pencil.collide(invisibleGround);
   
    spawnErasers();
  
    if(erasersGroup.isTouching(pencil)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    pencil.velocityY = 0;
    erasersGroup.setVelocityXEach(0);
   
    
   
    
    //set lifetime of the game objects so that they are never destroyed
    erasersGroup.setLifetimeEach(-1);
    
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}



function spawnErasers() {
  if(frameCount % 100 === 0) {
    var eraser = createSprite(1200,480,10,40);
    
    eraser.velocityX = -(6 + 3*score/100);
    eraser.addImage(eraserImg)   
          
    eraser.scale = 0.4;
    eraser.lifetime = 300;
    
    erasersGroup.add(eraser);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  erasersGroup.destroyEach();
  
  score = 0;
  
}