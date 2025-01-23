var playing = false;
var score;
var action;
var timeremaining;
var correctanswer;
var operator;
// if we click on the start/reset
document.getElementById("startreset").onclick=function(){
// if we are playing
if(playing==true){
location.reload();// reload page 
}else{// if we are not playing

//change mode to playing
    playing=true;
    //set score to 0
score=0;
document.getElementById("scorevalue").innerHTML=score;
// show countdown box
show("timeremaining");
//set time remaining to 60
timeremaining=60;
document.getElementById("timeremainingvalue").innerHTML=timeremaining;
//hide gameover box
hide("gameover");

//change button to reset
document.getElementById("startreset").innerHTML="Reset Game";

//start countdown

startcountdown();

//generate a new question
generatequestion();

}
}


for(var i=1;i<5;i++){
    //if we click on answer box
document.getElementById("box"+i).onclick=function(){
    //if we are playing
    if(playing==true){
        //if we are correct
        if(this.innerHTML==correctanswer){
            score++;
            document.getElementById("scorevalue").innerHTML=score;
            //hide wrong box
            hide("wrong");
            //show correct box
            show("correct");
            //generate new Q&A
            setTimeout(function(){hide("correct");},1000);
            generatequestion();
    
        }else{
            //hide correct box
            hide("correct");
            //show wrong box
            show("wrong");
            //generate new Q&A
            setTimeout(function(){hide("wrong");},1000);
            
        }
    }
    }
}



//function to start countdown
function startcountdown(){
action=setInterval(function(){
    timeremaining--;
    document.getElementById("timeremainingvalue").innerHTML=timeremaining;
    if(timeremaining==0){
       //gameover
       stopcountdown();
      show("gameover");
       document.getElementById("gameover").innerHTML="<p>Game Over</p><p>Your score is "+score+".</p>";

       hide("timeremaining");
       hide("correct");
       hide("wrong");
       playing= false;
       document.getElementById("startreset").innerHTML="Start Game";
    }
},1000)

}
//function to stop countdown
function stopcountdown(){
    clearInterval(action);
}
//function to hide an element
function hide(Id){
    document.getElementById(Id).style.display="none";
}
//function to show an element
function show(Id){
    document.getElementById(Id).style.display="block";
}
//function to generate a new question and multiple choices
function generatequestion(){
    var x= 1+Math.round(Math.random()*9);
    var y=1+Math.round(Math.random()*9);
    //Randomly choose operator(1=+,2=x,3=-,4=/)
     operator=1+Math.round(Math.random()*4);
     correctanswer;
     //if operator is 1, then add
     if (operator==1) {
        correctanswer=x+y;
        document.getElementById("question").innerHTML=x+"+"+y;
     } else if (operator==2) {
        //if operator is 2, then multiply
        correctanswer=x*y;
        document.getElementById("question").innerHTML=x+"x"+y;
     } else   {
        //if operator is 3, then subtract
        correctanswer=x-y;
        document.getElementById("question").innerHTML=x+"-"+y;
     }
    
    var correctposition=1+ Math.round(Math.random()*4);
    //fill the correct answer in the box
    document.getElementById("box"+correctposition).innerHTML=correctanswer;
    
    var answers=[correctanswer];
    //fill other boxes with wrong answers
    for(var i=1;i<5;i++){
        if(i!=correctposition){
            //generate wrong answer
            var wronganswer 
          do{
            if (operator==1) {//add
                wronganswer=1+Math.round(Math.random()*18);
            } else if (operator==2) {//multiply
                wronganswer=(1+Math.round(Math.random()*9))*(1+Math.round(Math.random()*9));
            } else {//subtract
                wronganswer=1+Math.round(Math.random()*19)-9;//difference between 1 and 19 is 18, so we subtract 9 to get the range of 1 to 9
            }
          }while (answers.indexOf(wronganswer)>-1||wronganswer==correctanswer) 
    
    document.getElementById("box"+i).innerHTML=wronganswer;
    answers.push(wronganswer);
        }
    }
    
    }