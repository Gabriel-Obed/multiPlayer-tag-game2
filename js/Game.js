class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    plr1 = createSprite(100, 200, 173, 109);
    plr1.addImage(plr1Img);

    plr2 = createSprite(300, 200, 89, 151);
    plr2.addImage(plr2Img)

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
    boundary1.shapeColor = "Yellow";
    boundary2 = createSprite(displayWidth/2-200, displayHeight-150, 20, 1000);
    boundary2.shapeColor = "Yellow";
    boundary3 = createSprite(boundary2.x-boundary2.width/2-boundary2.x-boundary2.width/2-170, displayHeight-650, boundary2.x-boundary1.x, 20);
    boundary3.shapeColor = "Yellow";
    boundary4 = createSprite(boundary2.x-boundary2.width/2-boundary2.x-boundary2.width/2-170, displayHeight+350, boundary2.x-boundary1.x, 20);
    boundary4.shapeColor = "Yellow";
  }
 
  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getPlrsAtEnd();
    
    if(allPlayers !== undefined){
      background("green");
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the plrs
      var x = 192, y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the plrs a little away from each other in x direction
        x = allPlayers[plr].distancex;
        //use data form the database to display the plrs in y direction
        y = displayHeight - allPlayers[plr].distance;
        plrs[index-1].x = x;
        plrs[index-1].y = y;

      }
    }

    if(player.index === 2){
      camera.position.x = plr2.x;
      camera.position.y = plr2.y;
    }

    if (player.index === 1){
      camera.position.x = plr1.x;
      camera.position.y = plr1.y;
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distancex -= 10;
      player.update();
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distancex += 10;
      player.update();
    }

    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -= 10;
      player.update();
    }

    
    plr1.bounceOff(obstacle1);
    plr2.bounceOff(obstacle1);
    plr1.collide(obstacle2);
    plr2.collide(obstacle2);
    plr1.collide(obstacle3);
    plr2.collide(obstacle3);
    plr1.collide(obstacle4);
    plr2.collide(obstacle4);
    /*plr1.collide(boundary1)
    plr2.collide(boundary1);
    plr1.collide(boundary2);
    plr2.collide(boundary2);
    plr1.collide(boundary3);
    plr2.collide(boundary3);
    plr1.collide(boundary4);
    plr2.collide(boundary4);*/
    if(plr2.isTouching(boundary1)){
      gameState = 2;
      this.end()
      player.rank = "plr1Won"
      Player.updatePlrsAtEnd(player.rank);
    }
    if (plr1.isTouching(boundary1)) {
      gameState = 2;
      this.end();
      player.rank = "plr2Won";
      Player.updatePlrsAtEnd(player.rank);
    }
    if(plr1.isTouching(boundary2)){
      gameState = 2;
      this.end();
      player.rank = "plr2Won";
      Player.updatePlrsAtEnd(player.rank);
    }
    if(plr2.isTouching(boundary2)){
      gameState = 2;
      this.end();
      player.rank = "plr1Won"; 
      Player.updatePlrsAtEnd();
    }
    if(plr1.isTouching(boundary4)){
      gameState = 2;
      this.end();
      player.rank = "plr2Won";
      Player.updatePlrsAtEnd(player.rank);
    }
    if(plr2.isTouching(boundary4)){
      gameState = 2;
      this.end();
      player.rank = "plr1Won"; 
      Player.updatePlrsAtEnd();
    }

    if(plr1.y < displayHeight-650){
      gameState = 2;
      this.end();
      player.rank = "plr2Won";
      Player.updatePlrsAtEnd(player.rank);
    }
    drawSprites();
  }
  end(){
    player.getPlrsAtEnd()
    textSize(32);
    fill("red")
    text("Game Over", camera.position.x, camera.position.y+20);
    plr1.destroy();
    plr2.destroy();
    boundary1.destroy();
    boundary2.destroy();
    boundary3.destroy();
    boundary4.destroy();
    obstacle1.destroy();
    obstacle2.destroy();
    obstacle3.destroy();
    obstacle4.destroy();
    var playersAtEndRef = database.ref('playersAtEnd');
    playersAtEndRef.on("value",function(data){
      plrAtEnd = data.val();
    })
    if(plrAtEnd === "plr2Won"){
      if(player.index === 2){
        textSize(20);
        fill("black");
        text("You Won", camera.position.x, camera.position.y+200);
      }
      else if(player.index === 1){
        text("You Lost", camera.position.x, camera.position.y+200);
      }
    }
    if(plrAtEnd === "plr1Won"){
      if(player.index === 1){
        text("You Won!", camera.position.x, camera.position.y+200);
      }
      else if(player.index === 2){
        text("You Lost", camera.position.x, camera.position.y+200);
      }
    }
  }
  
}
