var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var numberOfClicks = 0;

// function to generate the next element in random sequence of colors
function nextSequence() {
  var min = 0;
  var max = 3;
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  level++;
  $("#level-title").text("Level " + level);

  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  numberOfClicks = 0;
  userClickedPattern = [];

  playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if(currentLevel + 1 === level){
      // remove the class again after short delay
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");

    // remove the class again after short delay
    setTimeout(function() {
      $("body").removeClass('game-over');
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart ");
    startOver();
  }
}

// reset state of the game
function startOver(){
  level = 0;
  gamePattern = [];
}

// button click handler function
function buttonClicked() {
  userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(numberOfClicks++)
}

// function that plays the sound effect
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  // remove the class again after short delay
  setTimeout(function() {
    $("#" + currentColour).removeClass('pressed');
  }, 100);
}


// add event listeners for button clicks
$(".btn").click(buttonClicked);

// detect keyboard key to start the game
$(document).on("keydown", function(event) {
  if (level === 0) {
    nextSequence();
  }
});
