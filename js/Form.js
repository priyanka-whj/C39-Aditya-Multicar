class Form 
{
  constructor() 
  {
    this.titleImg = createImg("assets/title.png", "multicar");
    this.input = createInput("").attribute("placeholder", "Enter your name");
    this.playButton = createButton("Play");
    this.greeting = createElement("h2");
  }

  hideForm() 
  {
    this.input.hide(); //hide() removes(hide) the html element from the canvas
    this.greeting.hide();
    this.playButton.hide();
  }

  setElementsPosition()
  {
    this.titleImg.position(120, 160);
    this.input.position(width/2 - 110, height/2 - 50);
    this.playButton.position(width/2 - 100, height/2);
    this.greeting.position(width/2 - 300, height/2 - 100);
  }

  setElementsStyle()
  {
    this.titleImg.class("gameTitle");
    this.input.class("customInput");
    this.playButton.class("customButton");
    this.greeting.class("greeting");
  }

  display()
  {
    this.setElementsPosition();
    this.setElementsStyle();
    this.handleMousePressed();
  }

  handleMousePressed()
  {
    this.playButton.mousePressed(() => //arrow function
    {
      this.input.hide();
      this.playButton.hide();

      var msg = `                   
      Hello ${this.input.value()}
      </br>wait for another player to join...`;
      this.greeting.html(msg);

      playerCount = playerCount + 1;
      player.name = this.input.value();
      player.index = playerCount;

      player.addPlayerInfo();
      player.updateCount(playerCount);
      player.getDistance();
    });
  }
}
