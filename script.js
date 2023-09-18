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

/**
 * This listener is for the button display and for start timer
 */
buttonPlay.addEventListener('click', () =>{
    setInterval(decreaseTime, 1000);
    buttonPlay.style.display = 'none';
    buttonStop.style.display = 'block';
});

/**
 * This listner is for the button reload page
 */
buttonStop.addEventListener('click', () =>{
    location.reload();
})

/**
 * This function try the statement of the timer
 */
function tryState(){
    if(state) displayState.innerText = ('Work');
    else displayState.innerText = ('Break');
}

/**
 * This function switch between the 2 states
 */
function swapState(){
    if(state) state = false
    else state = true
}

/**
 * This function if for the timer display
 */
function showTime(){
    seconds = parseInt(timer%60 , 10);
    minutes = parseInt(timer/60 , 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    displayTime.innerText = (minutes+':'+seconds);
}

/**
 * This function is used to set the timer at the good value
 */
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

/**
 * This function is for decrease time
 */
function decreaseTime(){
    tryState();
    timer--;
    if(timer < 0){
        cycle()
    }
    showTime();
}