var backgroundImage;
var db;
var form, player, game;
var playerCount;
var gameState;
var car1, car2;
var cars;
var car1Img, car2Img;
var trackImg;
var allPlayers;

function preload() 
{
  backgroundImage = loadImage("assets/background.png");

  car1Img = loadImage("assets/car1.png");
  car2Img = loadImage("assets/car2.png");

  trackImg = loadImage("assets/track.jpg");
}

function setup() 
{
  createCanvas(windowWidth, windowHeight);
  db = firebase.database();

  game = new Game();
  game.getState(); //call getState() before showing form to the players
  game.start();

}

function draw() 
{
  background(backgroundImage);

  if(playerCount === 2)
  {
    game.updateState(1);
  }

  if(gameState === 1)
  {
    game.play();
  }
}

function windowResized() //It is called once whenever the browser window is resized
{
  resizeCanvas(windowWidth, windowHeight);
}
