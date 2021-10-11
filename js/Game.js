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
    boundary1 = createSprite(displayWidth/2-800, displayHeight+400, 20);
    boundary1.shapeColor = "Yellow";
    boundary2 = createSprite(displayWidth/2-800, displayHeight-900, 20);
    boundary2.shapeColor = "Yellow";
    boundary3 = createSprite(boundary2.x-boundary2.width/2-10, 1300/2-20, 20, boundary1.y-boundary2.y*2);
    boundary3.shapeColor = "Yellow";
    boundary4 = createSprite(boundary2.x+boundary2.width/2+!0, 1300/2-20, 20, boundary1.y-boundary2.y*2);
    boundary4.shapeColor = "Yellow";
   
  }

  leftCollided(p1, p2){
    if (p1.x - p2.x <= p1.width/2 + p2.width/2){
      return true
    }
    else{
      return false
    }
  }
  rightCollided(p1, p2){
    if(p2.x - p1.x <= p1.width/2 + p2.width/2){
      return true
    }
    else{
      return false
    }
  }
  upCollided(p1, p2){
    if(p1.y - p2.y <= p1.height/2 + p2.height/2 ){
      return true
    }
    else{
      return false
    }
  }
  downCollided(p1, p2){
    if(p2.y - p1.y <= p1.height/2 + p2.height/2){
      return true
    }
    else{
      return false
    }
  }
 
  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getPlrsAtEnd();
    
    if(allPlayers !== undefined){
      background("#c68767");
      
      //index of the array
      var index = 0;

      //x and y position of the plrs
      var x, y;

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

    if(keyIsDown(UP_ARROW) && player.index === 1){
      plrs[1].y -= 10;
    }                                                            
                                                                                            
    if(keyIsDown(LEFT_ARROW) && player.index === 1){
      plrs[1].x -= 10;
    }

    if(keyIsDown(RIGHT_ARROW) && player.index === 1 && !rightCollided(plr1, obstacle1)){
      plrs[1].x += 10;
    }

    if(keyIsDown(DOWN_ARROW) && player.index === 1){
      plrs[1].x += 10;
    }
        
    if (player.distance > 3600) {
      gameState = 2;
      player.rank++;
      Player.updatePlrsAtEnd(player.rank);
    }

    drawSprites();
  }
  
}
