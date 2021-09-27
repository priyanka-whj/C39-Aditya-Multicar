class Game 
{
  constructor() 
  {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leaderboardTitle = createElement("h2");
    this.leader1 = createElement("h2"); //player1
    this.leader2 = createElement("h2"); //player2
  }

  getState() //This function reads the gameState variable's value from the database
  {
    var gamestateRef = db.ref("gameState");
    gamestateRef.on("value", function(data){gameState = data.val();});
  }

  updateState(state) //This function writes playerCount variable's value into the database
  {
    db.ref("/").update({gameState: state});
  }

  start() 
  {
    form = new Form();
    form.display();
    
    player = new Player();

    playerCount = player.getCount();
    
    car1 = createSprite(width/2 - 50, height - 100);
    car1.addImage(car1Img);
    car1.scale = 0.07;

    car2 = createSprite(width/2 + 50, height - 100);
    car2.addImage(car2Img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  handleElements()
  {
    form.hideForm();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect"); 

    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width/2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width/2 + 230, 100);

    this.leaderboardTitle.html("Leaderboard");
    this.leaderboardTitle.class("resetText");
    this.leaderboardTitle.position(width/3 - 50, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width/3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width/3 - 50, 130);
  }

  play()
  {
    this.handleElements();
    this.handleResetButton();
    Player.getPlayersInfo();

    if(allPlayers !== undefined)
    {
      image(trackImg, 0, -height*5, width, height*6);
      this.showLeaderboard();

      var index = 0;
      for(var plr in allPlayers) //for-in loop extracts the value from the javascript object
      {
        index = index + 1;
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;
        cars[index - 1].position.x = x; //To give x-position to the car when game is in play state
        cars[index - 1].position.y = y; //To give y-position to the car when game is in play state

        if(index === player.index)
        {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          camera.position.x = cars[index - 1].position.x;
          camera.position.y = cars[index - 1].position.y;
        }
      }
      this.handlePlayerControls();
      drawSprites();
    }
  }

  handlePlayerControls()
  {
    if(keyIsDown(UP_ARROW))
    {
      player.positionY = player.positionY + 10;
      player.updatePosition();
    }

    if(keyIsDown(LEFT_ARROW) && player.positionX > width/3 - 50)
    {
      player.positionX = player.positionX - 5;
      player.updatePosition();
    }

    if(keyIsDown(RIGHT_ARROW) && player.positionX < width/2 + 300)
    {
      player.positionX = player.positionX + 5;
      player.updatePosition();
    }
  }

  showLeaderboard()
  {
    var leader1, leader2;
    var players = Object.values(allPlayers); //This method returns an array of values of an object(allPlayers) in the same order as provided by a for-in loop
    
    if((players[0].rank === 0 && players[1].rank === 0) || players[0].rank === 1)
    {
      leader1 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score; //&emsp; tag is used to give 4 spaces
      leader2 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score;
    }

    if(players[1].rank === 1)
    {
      leader1 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score; 
      leader2 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

  handleResetButton()
  {
    this.resetButton.mousePressed(() => {
      db.ref("/").set({playerCount: 0, gameState: 0, players: {}});
      window.location.reload(); //To reload the window
    });
  }
};
