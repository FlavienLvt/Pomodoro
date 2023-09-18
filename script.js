let timer = 1500;
let breakTime = 300;
let longBreakTime = 1200;
let minutes;
let seconds;
let state = true;
let breaks = 0;
let displayState = document.getElementById('state');
let displayTime = document.getElementById('timer');
let buttonPlay = document.getElementById('buttonPlay');
let buttonLocal = document.getElementById('buttonLocalStorage');
let buttonStop = document.getElementById('buttonStop');
let inputWorkTime = document.getElementById('workTime');
let inputBreakTime = document.getElementById('breakTime');
let inputLongBreakTime = document.getElementById('longBreakTime');

/**
 * The 3 next listeners are for the inputs for the timer cycles
 */
inputWorkTime.addEventListener('keyup', ()=>{
    if(inputWorkTime.value != null && inputWorkTime.value > 0){
        timer = inputWorkTime.value * 60;
        showTime();
    } else {
        alert("Valeur < 0 ou non numérique");
    }
})

inputBreakTime.addEventListener('keyup', ()=>{
    if(inputBreakTime.value != null && inputBreakTime.value > 0){
        breakTime = inputBreakTime.value * 60;
        showTime();
    } else {
        alert("Valeur < 0 ou non numérique");
    }
})

inputLongBreakTime.addEventListener('keyup', ()=>{
    if(inputLongBreakTime.value != null && inputLongBreakTime.value > 0){
        longBreakTime = inputLongBreakTime.value * 60;
        showTime();
    } else {
        alert("Valeur < 0 ou non numérique");
    }
})
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

buttonLocal.addEventListener('click', () =>{
    localStorage.clear();
    location.reload();
});

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
    if(state) state = false;
    else state = true;
    tryState();
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
            timer = longBreakTime;
            swapState();
        } else {
            breaks++;
            localStorage.setItem('breaks', breaks);
            timer = breakTime;
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
    timer--;
    if(timer < 0){
        cycle()
    }
    showTime();
}