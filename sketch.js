var backgroundimage,backgrounds, monkey, monkey_animation, ground,ground_animation, Foodgrp,  bananaimage,  obstaclegrp, obstacle_img, score=0,die,gamestate="play";



function preload(){
  backgroundimage=loadImage("jungle.jpg");
 monkey_animation= loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png") 
  bananaimage = loadImage("Banana.png");
  obstacle_img = loadImage("stone.png"); 
  ground_animation= loadImage("ground.jpg");
  
}

function setup() {
  createCanvas(800,400);
  
  backgrounds =createSprite(0,0,600,400);
  backgrounds.addImage(backgroundimage);
  backgrounds.scale=1.5;
  backgrounds.x=backgrounds.width/2;
  backgrounds.velocityX=-4;
  
 monkey = createSprite(100,340,20,50);
 monkey.addAnimation("Running",monkey_animation);
 monkey.scale = 0.12 ;
  monkey.debug=true;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  Foodgrp = new Group();
  obstaclegrp = new Group();
  
  score = 0;
  
  die=0;
}

function draw() {
  
  background(255);
  
  if(gamestate==="play"){
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgrounds.x<100){
    backgrounds.x=backgrounds.width/2;
  }
  
    if(Foodgrp.isTouching(monkey)){
      Foodgrp.destroyEach();
     score = score + 2;
    }
    switch(score){
        case 5: monkey.scale=0.17;
                break;
        case 10: monkey.scale=0.2;
                break;
        case 20: monkey.scale=0.22;
                break;
        case 40: monkey.scale=0.24;
                break;
        default: break;
    }
  
    if(keyWentDown("space") ) {
      monkey.velocityY = -16;
    }
    monkey.velocityY = monkey.velocityY + 0.8 ;
  
    monkey.collide(ground);
    spawnbanana();
    spawnobstacle();
 
    if(monkey.isTouching(obstaclegrp)){ 
     monkey.scale=0.08;
    obstaclegrp.destroyEach();
    die=die+1;
    score=score-1;
    backgrounds.velocityX=0; 
    text("GAMEOVER",200,400);
    }
  
  if(die===2){
   
    gamestate="end";
  }
  }
  
  if(gamestate==="end"){
   
    background.velocityX=0;
    obstaclegrp.destroyEach();
    Foodgrp.destroyEach();
    ground.velocityX=0;
    monkey.collide(ground);
    
  }
  
  drawSprites();
  
  textStyle(BOLD);
  textFont("Algerian");
  fill("black");
  text("Score: "+ score, 500,50,textSize(30));
}

function spawnbanana() {
  if (frameCount % 90 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaimage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;

    Foodgrp.add(banana);
  }
}

function spawnobstacle() {
  if(frameCount % 300 === 0) {
    var stone = createSprite(800,350,10,40);
   stone.velocityX = -6;
   stone.addImage(obstacle_img);
 
   stone.scale = 0.2;
   stone.lifetime = 300;
    stone.debug=true;

    obstaclegrp.add(stone);
  }
}