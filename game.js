var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var gameStarted = 0;
var answerChecker = 0;
var timesClicked = 0;

function init(){
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  answerChecker = 0;
  gameStarted = 1;
  timesClicked = 0;
}

function checkAnswer(timesClicked){
  //for (var i = 0; i < gamePattern.length; i++){
    if(gamePattern[timesClicked] !== userClickedPattern[timesClicked]){
      return false;
    }
  //}
  return true;
}

function nextSequence() {

  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);
  return randomNumber;

}

function playSound(color) {
  if(color === "red"){
    var red = new Audio('sounds/red.mp3');
    red.play();
  }else if(color === "blue"){
    var blue = new Audio('sounds/blue.mp3');
    blue.play();
  }if(color === "green"){
    var green = new Audio('sounds/green.mp3');
    green.play();
  }if(color === "yellow"){
    var yellow = new Audio('sounds/yellow.mp3');
    yellow.play();
  }
}

function startGame(){
  init();
  generate();
}

function generate(){
  userClickedPattern = [];
  $("h1").text("Level " + level);
  level++;
  var randomChosenColor = buttonColors[nextSequence()];
  gamePattern.push(randomChosenColor);
  loopRandomColors();
}

function loopRandomColors(){
  var i = 0;
  var intervalId = setInterval(function(){
      if(i <= level){
        playSound(gamePattern[i]);
        $("#"+gamePattern[i]).fadeOut(100).fadeIn(100);
      }else{
        clearInterval(intervalId);
      }
      i++;
  }, 500);

}

function gameOver(){
  var gOver = new Audio('sounds/wrong.mp3');
  gOver.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200)
  $("h1").text("Game Over, Press Any Key to Restart!");
}

function pressedHandler(id){
  var thisColor = id;
  userClickedPattern.push(thisColor);
  playSound(thisColor);
  $("#"+thisColor).addClass("pressed");
  setTimeout(function(){
    $("#"+thisColor).removeClass("pressed");
  },100)
}

// CLick listeners
$(".btn").click(function(){

  pressedHandler($(this).attr("id"));
  //Check answer
  answerChecker = checkAnswer(timesClicked);

  if(answerChecker == true){
    timesClicked++;
  }else{
    setTimeout(gameOver(), 500);
  }

  if(timesClicked === level){
    timesClicked = 0;
    setTimeout(generate, 1000);
  }

});

//Start listener
$(document).keypress(startGame);
