var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var highscore = 0;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}

$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3")
    audio.play();
}
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(() => { $("#" + currentColor).removeClass("pressed") }, 100);
}

$(document).on("keypress", function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$("#restart").on("click", function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over");
        $("#restart").text("RESTART");
        startOver();
    }
}
function startOver() {
    if (level>highscore) {
        highscore = level;
    }
    $("#highscore").text("Highscore: Level " + highscore);
    level = 0;
    gamePattern = [];
    started = false;
}
