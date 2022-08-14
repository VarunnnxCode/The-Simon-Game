var start = false;
var level = 0;
gamePattern = [];
userClickedPattern = [];
var buttonColors = ["red","blue","green","yellow"];


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+ level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $('.'+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    var gameLevel = userClickedPattern.length;
    checkAnswer(gameLevel-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("h1").text("Game Over, Press any key to restart!")
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver(){
    gamePattern = [];
    level = 0;
    start = false;
}

function playSound(chosenColor){
    var audio = new Audio("sounds/"+chosenColor+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
    }, 100);
}

$(document).keydown(function(){
    if(!start){ 
        $("h1").text("Level "+ level);
        nextSequence();       
        start = true;
    }
});

