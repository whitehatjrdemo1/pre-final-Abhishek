class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();


    }
    car1 = createSprite(displayWidth / 4, 200);
    car1.addAnimation("blueIdle", blue_idle);
    car1.addAnimation("blueRun", blue_run);
    car1.addAnimation("blueCrouch", blue_crouch);
    car1.addAnimation("blueDeath", blue_death);
    car1.addAnimation("blueDeathImage", blue_death_image);
    car1.scale = 2;
    car2 = createSprite(displayWidth * 3 / 4, 200);
    car2.addImage("car2", car2_img);

    cars = [car1, car2];

  }

  play() {
    form.form_hide();

    Player.getPlayerInfo();
    //player.getcarsAtEnd();
    if (allPlayers !== undefined) {
      background(rgb(198, 135, 103));
      image(track, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
      //console.log(allPlayers);


      var index = 0;
      playerIndex = player.index;

      for (var t in allPlayers) {
        for (var plr in allPlayers[t]) {
          index = index + 1;
          //player.getHealth();
          cars[index - 1].x = allPlayers[t][plr].positionX;
          cars[index - 1].y = allPlayers[t][plr].positionY;

          //console.log(player.health);
          //console.log(allPlayers);

          if (player.team === 1) {
            cars[player.index - 1].changeAnimation("blueIdle", blue_idle);
          }
          if (player.team === 2) {
            //cars[player.index-1].changeAnimation("blueIdle", blue_idle);
            console.log("changeAnimationRed");
          }
          if (index != player.index) {
            if (player.bullets.isTouching(cars[index - 1])) {
              player.score += 2;
              enemyHealth -= 2;

              //console.log(index + "," + player.index);
              player.update();
            }
            player.updateHealth(index, enemyHealth);
          }

          if (index === player.index) {
            player.health = allPlayers["team" + index]["player" + index + index].health;
            stroke(10);
            fill("red");
            ellipse(player.positionX, player.positionY, 60, 60);

            camera.position.x = cars[index - 1].x;
            camera.position.y = cars[index - 1].y;
            player.update();

          }
          if (player.health < 0) {
            gameState = 2;
            player.life = false;
            this.update(2);
            player.update();
            //console.log("updated");
          }

        }
      }

    }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.positionY -= 10
      player.update();
      gameState = 3;
     
    }

    if (keyIsDown(DOWN_ARROW) && player.index !== null) {
      player.positionY += 10
      player.update();
      gameState = 3;
     
    }

    if (keyIsDown(LEFT_ARROW) && player.index !== null) {
      if (player.team === 1) {
        player.positionX = constrain(player.positionX -= 10, 0, displayWidth / 2 - 20)
      }

      if (player.team === 2) {
        player.positionX = constrain(player.positionX -= 10, displayWidth / 2 + 20, displayWidth);
      }

      player.update();
      gameState = 3;
      
    }

    if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
      if (player.team === 1) {
        player.positionX = constrain(player.positionX += 10, 0, displayWidth / 2 - 20);
        
      }

      if (player.team === 2) {
        player.positionX = constrain(player.positionX += 10, displayWidth / 2 + 20, displayWidth);
      }

      player.update();
      gameState = 3;

    }

    if (keyIsDown(67) && player.index !== null) {

      gameState = 4;

      console.log("crouch");
    }




    if (mouseIsPressed) {
      //if(mouseButton === LEFT){
      //console.log("mouse");
      player.makeBullets();
      //}
    }




    drawSprites();
  }



  end() {
    console.log("Game Over, " + gameState);
    background(rgb(198, 135, 103));
    image(track, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
    Player.getPlayerInfo();
    //player.getcarsAtEnd();
    if (allPlayers !== undefined) {
      var index = 0;
      playerIndex = player.index;
      console.log(allPlayers);
      for (var t in allPlayers) {
        for (var plr in allPlayers[t]) {
          index = index + 1;
          //player.getHealth();
          cars[index - 1].x = allPlayers[t][plr].positionX;
          cars[index - 1].y = allPlayers[t][plr].positionY;

          cars[player.index - 1].velocityX = 0;
          cars[player.index - 1].velocityY = 0;
          player.bullets.destroyEach();

          stroke(10);
          fill("red");
          //ellipseMode(RADIUS);
          ellipse(player.positionX, player.positionY, 60, 60);

          if (allPlayers[t][plr].life === false) {
            if (allPlayers[t][plr].team === 1) {


              console.log(allPlayers[t][plr].life + "," + allPlayers[t][plr].team);
              cars[index - 1].changeAnimation("blueDeath", blue_death);

              cars[index - 1].changeAnimation("blueDeathImage", blue_death_image);


            }
            if (allPlayers[t][plr].team === 2) {


              // cars[player.index - 1].changeAnimation("blueDeath", blue_death);

              // cars[player.index - 1].changeAnimation("blueDeathImage", blue_death_image);

              console.log("red death")
            }

          }
        }
      }
    }
    drawSprites();
    textAlign(CENTER);
    textSize(30);
    fill("yellow");
    stroke("blue");
    text("GAME OVER", displayWidth / 2, displayHeight / 2);
    player.update();
  }
}
