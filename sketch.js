    var bg,bgImg;
    var sam,samRunning,samImg;
    var obst1Img;
    var obst2Img;
    var obst3Img;
    var obstacle;
    var distance = 0;
    var PLAY = 1;
    var END = 0;
    var gameState = PLAY;

    function preload(){

    bgImg = loadImage("images/bg.jpg")

    samRunning = loadImage("images/runner.gif")

    samImg = loadImage("images/standing.gif")

    obst1Img = loadImage("images/trash can.jpg")

    obst2Img = loadImage("images/car.png")

    obst3Img = loadImage("images/obst3.gif")
    }

    function setup() {
    createCanvas(800,400)

    bg = createSprite(400,260);
    bg.addImage(bgImg);
    bg.velocityX = -5

    sam = createSprite(200,550);
    sam.addImage("standing",samImg);

 
    obstG = new Group();

   }

    function draw() {
    background(180)

    textSize(20);
    fill(255);
    text("Distance: "+ distance,900,30);

   if(gameState === PLAY){
    if(bg.x < 0 ){
      bg.x = width/2;
      }

      distance = distance + Math.round(getFrameRate()/50);
      bg.velocityX = -(6 + 2*distance/150)

    if(keyDown("UP_ARROW")){
    sam.addImage("running",samRunning)
    }
  
    selectObstacles()

    if (obstG.isTouching(sam)) {
     gameState = END; 
    }
    
    if(keyDown("space")) {
      sam.velocityY = -10;
  }

  sam.velocityY = sam.velocityY + 0.8;
  }

    if (gameState === END) {

   bg.velocityX = 0
   sam.velocityX = 0
   sam.addImage("standing",samImg)
  
   
   obstG.setVelocityXEach(0);
   obstG.setLifetimeEach(-1);
 
 

   if(keyDown("r")){
   reset()
   }

   text("Press (R) To Restart The Game",20,50)
   }

   

    }


   function selectObstacles(){
    if(frameCount % 80 === 0){  
    var obstacle = createSprite(0,200,10,40);
    obstacle.velocityX = 6
    
    var randnum = Math.round(random(1,3));
    switch(randnum){
    case 1: obstacle.addImage(obst1Img);
    break;
    case 2: obstacle.addImage(obst2Img);
    break;
    case 3: obstacle.addImage(obst3Img);
    break;
    default: break;
    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;

    obstG.add(obstacle)
    }
    }

    function reset() {
      gameState = PLAY;
  
      obstG.destroyEach();
      
    }