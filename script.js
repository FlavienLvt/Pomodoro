let timer = 5;
let minutes;
let secondes;
let state = true;

let displayState = document.getElementById('state');
let displayTime = document.getElementById('timer');

function tryState(){
    if(state) displayState.innerText = ('Work');
    else displayState.innerText = ('Break');
}

function swapState(){
    if(state) state = false
    else state = true
}

function decreaseTime(){
    tryState();
    secondes = parseInt(timer%60 , 10);
    minutes = parseInt(timer/60 , 10);
    timer--;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    secondes = secondes < 10 ? "0" + secondes : secondes;

    displayTime.innerText = (minutes+':'+secondes);
    if(timer < 0){
        swapState();
        timer = 1500;
    }
}

setInterval(decreaseTime, 1000);