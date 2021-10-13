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
  }
 
  play(){
    form.hide();

    Player.getPlayerInfo();
    
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

    
    plr1.collide(obstacle1);
    plr2.collide(obstacle1);
    plr1.collide(obstacle2);
    plr2.collide(obstacle2);
    plr1.collide(obstacle3);
    plr2.collide(obstacle3);
    plr1.collide(obstacle4);
    plr2.collide(obstacle4);

    if(plr2.isTouching(boundary1)){
      console.log("boundarycollided");
      gameState = 2;
      this.update(gameState);
      player.rank = "plr1Won"
      Player.updatePlrsAtEnd(player.rank);
    }
    if (plr1.isTouching(boundary1)) {
      console.log("boundarycollided");
      gameState = 2;
      this.update(gameState)
      player.rank = "plr2Won";
      Player.updatePlrsAtEnd(player.rank);
    }
    if(plr1.isTouching(boundary2)){
      console.log("boundarycollided");
      gameState = 2;
      this.update(gameState);
      player.rank = "plr2Won";
      Player.updatePlrsAtEnd(player.rank);
    }
    if(plr2.isTouching(boundary2)){
      console.log("boundarycollided");
      gameState = 2;
      this.update(gameState);
      player.rank = "plr1Won"; 
      Player.updatePlrsAtEnd(player.rank);
    }
    if(plr1.isTouching(boundary3)){
      console.log("collided");
      gameState = 2;
      this.update(gameState);
      player.rank = "plr2Won";
      Player.updatePlrsAtEnd(player.rank);
    }
    if(plr2.isTouching(boundary3)){
      console.log("collided");
      gameState = 2;
      this.update(gameState);
      player.rank = "plr1Won";
      Player.updatePlrsAtEnd(player.rank);
    }
    if(plr1.isTouching(boundary4)){
      console.log("boundarycollided");
      gameState = 2;
      this.update(gameState);
      player.rank = "plr2Won";
      Player.updatePlrsAtEnd(player.rank);
    }
    if(plr2.isTouching(boundary4)){
      console.log("boundarycollided");
      gameState = 2;
      this.update(gameState);
      player.rank = "plr1Won"; 
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

    if(player.rank === "plr2Won"){
      if(player.index === 2){
        textSize(20);
        fill("black");
        text("You Won", camera.position.x, camera.position.y+200);
      }
      else if(player.index === 1){
        text("You Lose", camera.position.x, camera.position.y+200);
      }
    }
    if(player.rank === "plr1Won"){
      if(player.index === 1){
        text("You Won!", camera.position.x, camera.position.y+200);
      }
      else if(player.index === 2){
        text("You Lose", camera.position.x, camera.position.y+200);
      }
    }
  }
  
}
