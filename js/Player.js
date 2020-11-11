class Player {
  constructor(){
    this.index = playerCount;
    this.distance = 0;
    this.health = 100;
    this.positionX = displayWidth/4*((this.index*2)-1);
    this.positionY = 0;
    this.score = 0;
    this.name = null;
    this.team = playerCount;
    this.bullets = new Group();
    this.body=null;
    this.life = true;
    
  }
 
  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }
  // getHealth(){
  //   var playerHealthRef = database.ref("teams/team" + this.team + "/"  + "player"+ this.team +this.index);
  //   playerHealthRef.on("value",(data)=>{
  //     player.health = data.val();
  //   })
  // }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    if(player.index === 1){
      this.team = 1;
      var playerIndex = "teams/team" + this.team + "/"  + "player"+ this.team +this.index;
      //console.log(playerIndex);
      database.ref(playerIndex).update({
        health:this.health,
        name:this.name,
        positionX:this.positionX,
        positionY:this.positionY,
        score:this.score,
        life:this.life,
        index:this.index,
        team: this.team
    });
    }
    if(player.index === 2){
      this.team = 2;
      var playerIndex = "teams/team" + this.team + "/" + "player"+ this.team +this.index;
      //console.log(playerIndex);
      database.ref(playerIndex).update({
        health:this.health,
        name:this.name,
        positionX:this.positionX,
        positionY:this.positionY,
        score:this.score,
        life:this.life,
        index:this.index,
        team: this.team
      
    });
    }
    
  }
  updateHealth(playerIndex,enemyHealth){
   
      var playerhealth = "teams/team" + playerIndex + "/"  + "player"+ playerIndex +playerIndex;
      //console.log(playerhealth);
      database.ref(playerhealth).update({
        health:enemyHealth
        });
    //console.log("teams/team" + playerIndex + "/"  + "player"+ playerIndex +playerIndex)
      }
   

  makeBullets(){
  var bullet = createSprite(displayHeight/2, displayWidth/2,10,10);
  bullet.x = player.positionX;
  bullet.y = player.positionY;

  bullet.lifeTime = displayWidth;
  //console.log(bullet);
  if(player.team === 1){
    bullet.velocityX = 5;
   
  }else if(player.team === 2){
    bullet.velocityX = -5;
    
  }
  this.bullets.add(bullet);
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('teams');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
}
