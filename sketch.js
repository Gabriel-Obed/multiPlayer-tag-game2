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
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    game.play();
  }
  
}
