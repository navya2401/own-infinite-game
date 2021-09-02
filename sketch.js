var astronaut;
var astronautImage;
var ground, groundImage;
var edge;
var invisibleGround;
var obstacle;
var o1, o2, o3, o4;
var score = 0;
var obstacleGroup;
var PLAY = 1; 
var END = 0;
var gameState = PLAY;
var gameOver;
var restart;
var backgroundImage;
var dieSound, jumpSound, checkpointSound;

function preload(){
// astronaut images
  astronautImage = loadImage("astronaut.png");

// ground image
groundImage = loadImage("ground1.jpg");

//background image
backgroungImg = loadImage("backgroundImg.jpg");

//obstacle images
o1 = loadImage("obstacle1.png");
o2 = loadImage("obstacle2.png");
o3 = loadImage("obstacle3.png");
o4 = loadImage("obstacle4.png");

//game over image
GameOverImg = loadImage("gameOver.png");

//re start game image
restartImg = loadImage("restart.png");

//sounds
dieSound = loadSound("die.mp3");
checkpointSound = loadSound("checkpoint.mp3");
jumpSound = loadSound("jump.mp3");
}

function setup() 
{
  createCanvas(windowWidth,windowHeight);

  //ground sprite
  ground = createSprite(width-400, height, windowWidth, 20);
  ground.shapeColor = "purple"
  //ground.addImage("ground", groundImage);
  //ground.scale = 0.5;

  // background sprite
  backgroundImage = createSprite(300, 10, width, height+20);
  backgroundImage.addImage(backgroungImg);
  backgroundImage.scale = 5;
  backgroundImage.depth = ground.depth;
  ground.depth = ground.depth+1;

  //game over sprite
  gameOver = createSprite(width/2, height/2);
  gameOver.addImage(GameOverImg);

    //astronaut sprite
    astronaut = createSprite(50, 150, 20, 50);
    astronaut.addImage( astronautImage);
    astronaut.scale = 0.3;
     // setting of collider
     astronaut.debug = false;
     astronaut.setCollider("circle" , 0, 0, 190);
  // restart sprite
  restart = createSprite(width/2, height/2+100);
  restart.addImage(restartImg);
  restart.scale = 0.3;

  // invisible ground sprite
  invisibleGround = createSprite(width/2, 200, width, 10);

  // to make invisible ground invisible
  invisibleGround.visible = false;


  edge = createEdgeSprites();

// group
obstacleGroup = new Group();

}

function draw() 
{
background("white");

if(gameState === PLAY){
  score = score+Math.round(getFrameRate()/60)

  if(score%100==0&& score>0){
    checkpointSound.play();
  }

  // function to make astronaut jump
if(touches.length>0 || keyDown("space") && astronaut.y>=height-150){
  astronaut.velocityY = -15;
  jumpSound.play();
  touches = [];
}
//astronaut gravity
astronaut.velocityY = astronaut.velocityY+0.5

// to make ground infinite
ground.velocityX= -(2+3*score/100);
if(ground.x<0){
  ground.x = ground.width
}

//game over and restart visibility
gameOver.visible = false;
restart.visible = false;

obstacles();

if (obstacleGroup.isTouching(astronaut)){
  gameState = END;
  //trex.velocityY = -10;
  jumpSound.play();
  //dieSound.play();
}
}
else if(gameState === END){
  ground.velocityX = 0;
  astronaut.velocityX = 0;
  obstacleGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-5);

  // game over and restart visibility
  gameOver.visible = true;
  restart.visible = true;
}

//to enable restart button
if(touches.length>0 || mousePressedOver(restart)){
  gameState = PLAY;
  obstacleGroup.destroyEach();
  astronaut.addImage( astronautImage);
  score = 0;
  restart.visible = false;
  touches = [];
}

astronaut.collide(invisibleGround);

drawSprites();
//score text
text ("score: "+score, 500, 50);
}


//all the obstacle settings
function obstacles(){
if(frameCount % 100 === 0){
   obstacle = createSprite(width, 150, 10, 40);
obstacle.velocityX = -(4+score/100); 
var rand = Math.round(random(1, 4));
switch(rand){
  case 1 : obstacle.addImage(o1); break;
  case 2 : obstacle.addImage(o2); break;
  case 3 : obstacle.addImage(o3); break;
  case 4 : obstacle.addImage(o4); break;
  default: break;
}
obstacle.lifetime = 350;
obstacle.scale = 0.2;
obstacleGroup.add(obstacle);
}
}