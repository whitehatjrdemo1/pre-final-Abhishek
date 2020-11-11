class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.reset = createButton('Reset');
  }
  form_hide() {
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display() {
    this.title.html("Multiplayer shooter");
    this.title.position(displayWidth / 2 - 50, 0);

    this.input.position(displayWidth / 2 - 40, displayHeight / 2 - 80);
    this.button.position(displayWidth / 2 + 30, displayHeight / 2);
    this.reset.position(displayWidth - 100, 20);

    this.button.mousePressed(() => {
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount += 1;
      player.index = playerCount;
      player.positionX = playerCount / 10 * displayWidth;
      player.positionY = displayHeight / 2;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth / 2 - 70, displayHeight / 4);
    });

    this.reset.mousePressed(() => {
      player.updateCount(0);
      game.update(0);
      var refTeam1 = firebase.database().ref('teams/team1/');
      refTeam1.remove()
        .then(function () {
          console.log("Remove succeeded.")
        })
        .catch(function (error) {
          console.log("Remove failed: " + error.message)
        });

      var refTeam2 = firebase.database().ref('teams/team2/');
      refTeam2.remove()
        .then(function () {
          console.log("Remove succeeded.")
        })
        .catch(function (error) {
          console.log("Remove failed: " + error.message)
        });
    });

  }
}
