var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;
var clicks = 0;

function nextSequence() {

    level++;
    $("h1").text("Level " + level);

    //Generating a random number from 0 to 3 and picking a color according to it
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    //Creating flash animation for the chosen color box
    animateOnClick(randomChosenColor);

    //Playing the sound
    playSound("sounds/" + randomChosenColor + ".mp3");
}

//Function to play sounds
function playSound(audioSrc) {
    var audio = new Audio(audioSrc);
    audio.play();
}

//Checking for any clicks
$(document).click(function (event) {
    clicks++;

    //Checking the button clicked by the user
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);

    //Playing the sound
    playSound("sounds/" + userChosenColor + ".mp3");

    //Creating flash animation for the clicked color box
    animateOnClick(userChosenColor);

    //Checking user's answer
    checkAnswer(clicks);
});

//Function to animate the button
function animateOnClick(target) {
    $("#" + target).fadeIn(100).fadeOut(100).fadeIn(100);
}

$(document).keypress(function () {
    if (!started) {
        started = true;
        userClickedPattern = [];
        clicks = 0;
        console.log(gamePattern);
        nextSequence();
    }
});

//Function to check the user's answer
function checkAnswer(currentLevel) {
    var wrong = false;
    console.log(gamePattern);
    console.log(userClickedPattern);
    for (var i = 0; i < currentLevel; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            wrong = true;
        }
    }

    if (wrong) {
        console.log("Wrong");
        $("h1").text("Game Over!");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);
        setTimeout(restart, 3000);
    } else {
        if (clicks === level) {

            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
            clicks = 0;
            console.log("Right");
        }
    }
}

//Function to restart the game
function restart() {
    $("h1").text("Press A key to start");
    level = 0;
    started = false;
    gamePattern = [];
}