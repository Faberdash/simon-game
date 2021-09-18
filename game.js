//alert("The game is ON!");
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var audio;

var numberOfClicks = 0;

var check;

var level = -1;

$(document).keypress(function() {
  if (level === -1) {
    level++;

    nextSequence();
  } else {
    $(document).unbind("keypress");
    console.log("Keypress event removed..");
  }
});

var buttons = $(".btn");

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  var randomChosenSound = "sounds/" + randomChosenColor + ".mp3";
  audio = new Audio(randomChosenSound);
  var query = "#" + randomChosenColor;
  var randomChosenButton = $(query);
  randomChosenButton.fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
  //return randomNumber;
  userClickedPattern = [];
}

function playSound(name) {
  var path = "sounds/" + name + ".mp3";
  audio = new Audio(path);
  audio.play();
}

function animatePress(currentColor) {
  var query = "#" + currentColor;

  var randomChosenButton = $(query);

  randomChosenButton.addClass("pressed");

  setTimeout(function() {
    randomChosenButton.removeClass("pressed");
  }, 100);
}

function checkUserProgress() {
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] != gamePattern[i]) {
      return false;
    }
  }
  return true;
}

function gameOver() {
  level = 0;

  playSound("wrong");

  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("Game Over, Press Any Key to Restart");

  $(document).keypress(function() {
    if (level === 0) {
      startOver();
    } else {
      $(document).unbind("keypress");
    }
  });
}

function startOver() {
  gamePattern = [];
  numberOfClicks = 0;
  nextSequence();
  $("level-title").text("Level " + level);
}

buttons.on("click", function() {
  numberOfClicks++;
  var userChosenColor;
  
  if (numberOfClicks < level) {
    userChosenColor = this.id;
    //console.log(userChosenColor);
    userClickedPattern.push(userChosenColor);
    check = checkUserProgress();

    if (check === false) {
      gameOver();
    } else {
      playSound(this.id);
      animatePress(this.id);
    }

  } else if (numberOfClicks === level) {
    userChosenColor = this.id;
    //console.log(userChosenColor);
    userClickedPattern.push(userChosenColor);
    check = checkUserProgress();

    if (check === true) {
      playSound(this.id);
      animatePress(this.id);
      numberOfClicks = 0;
      setTimeout(nextSequence, 400);
    } else {
      gameOver();
    }
  } else {
    gameOver();
  }
});
