var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
var buttonColors=["red","blue","green","yellow"];
$(document).keypress(function(){
  if(!started){
  nextSequence();
  started=true;
  $(".Gameh1").text("Level " + level);
}});
function nextSequence(){
  level++;userClickedPattern=[];
  $(".Gameh1").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
$(".btnInstruct").click(
  function(){
  var audio=new Audio("sounds/blue.mp3");
  audio.play();
  setTimeout(100000);
  window.location.href='instructt.html';
});
$(".btn").click(
function(){
  var userChosenColour=$(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

function startOver(){
  started=false;
  level=0;
  gamePattern=[];
}
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 100);
      }
    } else {
      playSound("wrong");
      $(".index").addClass("game-over");
      $(".Gameh1").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $(".index").removeClass("game-over");
      }, 200);

      startOver();
    }
}
