var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0, distancex = 200;
var database;

var form, player, game;

var plrs, plr1, plr2, plr1Img, plr2Img, plrAtEnd;
var obstacle1, obstacle2, obstacle3, obstacle4, boxImg1, boundary1, boundary2, boundary3, boundary4, boundary5;

function preload(){
  plr1Img = loadImage("character1.png");
  plr2Img = loadImage("character.png");
  boxImg1 = loadImage("wood1.png");

}

function setup(){
  canvas = createCanvas(displayWidth-20, displayHeight-30);
  database = firebase.database();
  
  game = new Game();
  game.getState();
  game.start();

  plr1 = createSprite(100, 200, 173, 109);
  plr1.addImage(plr1Img);
  plr1.debug = true;

    plr2 = createSprite(300, 200, 89, 151);
    plr2.addImage(plr2Img)
    plr2.debug = true;

    plrs = [plr1, plr2];

    obstacle1 = createSprite(-500, 278, 81, 81);
    obstacle1.addImage(boxImg1);
    obstacle2 = createSprite(347, 291, 81, 81);
    obstacle2.addImage(boxImg1);
    obstacle3 = createSprite(347, 1091, 81, 81);
    obstacle3.addImage(boxImg1);
    obstacle4 = createSprite(-500, 1091, 81, 81);
    obstacle4.addImage(boxImg1);

    boundary1 = createSprite(displayWidth/2-1700, displayHeight-150, 20, 1000);
    boundary1.shapeColor = "yellow";
    boundary1.debug = true;
    boundary2 = createSprite(displayWidth/2-200, displayHeight-150, 20, 1000);
    boundary2.shapeColor = "yellow";
    boundary2.debug = true;
    boundary3 = createSprite(boundary2.x-boundary2.width/2-boundary2.x-boundary2.width/2-170, displayHeight-650, boundary2.x-boundary1.x, 20);
    boundary3.shapeColor = "yellow";
    boundary3.debug = true;
    boundary4 = createSprite(boundary2.x-boundary2.width/2-boundary2.x-boundary2.width/2-170, displayHeight+350, boundary2.x-boundary1.x, 20);
    boundary4.shapeColor = "yellow";
    boundary4.debug = true;
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
