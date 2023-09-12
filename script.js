let timer = 1500;
let minutes;
let seconds;
let state = true;
let buttonState = false;
let breaks = 0;
let displayState = document.getElementById('state');
let displayTime = document.getElementById('timer');
let buttonPlay = document.getElementById('buttonPlay');

let buttonStop = document.getElementById('buttonStop');

tryState();
showTime();

buttonPlay.addEventListener('click', () =>{
    setInterval(decreaseTime, 1000);
    buttonPlay.style.display = 'none';
    buttonStop.style.display = 'block';
});

buttonStop.addEventListener('click', () =>{
    location.reload();
})

function tryState(){
    if(state) displayState.innerText = ('Work');
    else displayState.innerText = ('Break');
}

function swapState(){
    if(state) state = false
    else state = true
}

function showTime(){
    seconds = parseInt(timer%60 , 10);
    minutes = parseInt(timer/60 , 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    displayTime.innerText = (minutes+':'+seconds);
}

function cycle(){
    if(state){
        if(breaks == 4){
            breaks = 0;
            timer = 1200;
            swapState();
        } else {
            breaks++;
            timer = 300;
            swapState();
        }
    } else{
        timer = 1500;
        swapState();
    }
}

function decreaseTime(){
    tryState();
    timer--;
    if(timer < 0){
        cycle()
    }
    showTime();
}