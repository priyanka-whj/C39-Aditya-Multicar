class Player
{
  constructor() 
  {
    this.name = null; //To save the name of the player
    this.index = null; //To give unique ID to each player
    this.positionX = 0; //To store x-position of the player
    this.positionY = 0; //To store y-position of the player
    this.rank = 0; //To store rank of the player
    this.score = 0; //To store score of the player
  }

  getCount() //This function reads playerCount variable's value from the database
  {
    var playerCountRef = db.ref("playerCount");
    playerCountRef.on("value", function(data){playerCount = data.val();});
  }

  updateCount(count) //This function writes playerCount variable's value into the database
  {
    db.ref("/").update({playerCount: count});
  }

  addPlayerInfo()
  {
    var playerIndex = "players/player" + this.index; //This creates players/player hierarchy in the database
    if(this.index === 1)
    {
      this.positionX = width/2 - 100; //To give x-position to player1 on left-side from the center
    }
    else
    {
      this.positionX = width/2 + 100;//To give x-position to player2 on right-side from the center
    }
    db.ref(playerIndex).set({name: this.name, positionX: this.positionX, positionY: this.positionY, rank: this.rank, score: this.score}); //set() method will create & save the database reference
  }

  static getPlayersInfo() //This function will get the information of all the players. This function is not attached to any particular player. Hence, it is declared as a static function
  {                                           //Static functions are called by class rather than by objects of the class
    var playerInfoRef = db.ref("players");
    playerInfoRef.on("value", data => {allPlayers = data.val();}); //The players data is stored in JSON
  }

  updatePosition() //this function is writing position of both the players in the database
  {
    var playerIndex = "players/player" + this.index;
    db.ref(playerIndex).update({positionX: this.positionX, positionY: this.positionY, rank: this.rank, score: this.score});
  }

  getDistance() //This function will read the position data of both the players from the database
  {
    var playerDistanceRef = db.ref("players/player" + this.index);
    playerDistanceRef.on("value", data => 
    {
      var data = data.val();
      this.positionX = data.positionX;
      this.positionY = data.positionY;
    });
  }
};
