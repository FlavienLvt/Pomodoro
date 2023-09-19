let timer;
let breakTime;
let longBreakTime;
let workTime;
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
const inputs = [inputWorkTime, inputBreakTime, inputLongBreakTime];

/**
 * The few next line are for local storage
 */
if(localStorage.getItem('workTime', inputWorkTime.value) == null){
    timer = 1500;
    inputWorkTime.value = 25;
} else {
    timer = 60 * localStorage.getItem('workTime', inputWorkTime.value);
    workTime = 60 * localStorage.getItem('workTime', inputWorkTime.value);
};

if(localStorage.getItem('breakTime', inputBreakTime.value) == null){
    breakTime = 300;
    inputBreakTime.value = 5;
} else {
    breakTime = 60 * localStorage.getItem('breakTime', inputBreakTime.value);
};

if(localStorage.getItem('longBreakTime', inputLongBreakTime.value) == null){
    longBreakTime = 1200;
    inputLongBreakTime.value = 20;
} else {
    longBreakTime = 60 * localStorage.getItem('longBreakTime', inputLongBreakTime.value);
};

/**
 * The 3 next listeners are for the inputs for the timer cycles
 */
inputWorkTime.addEventListener('keyup', ()=>{
    if(inputWorkTime.value != null && inputWorkTime.value > 0){
        timer = inputWorkTime.value * 60;
        localStorage.setItem('workTime', inputWorkTime.value);
        showTime();
    } else {
        alert("Valeur < 0 ou non numérique");
    }
})

inputBreakTime.addEventListener('keyup', ()=>{
    if(inputBreakTime.value != null && inputBreakTime.value > 0){
        breakTime = inputBreakTime.value * 60;
        localStorage.setItem('breakTime', inputBreakTime.value);
        showTime();
    } else {
        alert("Valeur < 0 ou non numérique");
    }
})

inputLongBreakTime.addEventListener('keyup', ()=>{
    if(inputLongBreakTime.value != null && inputLongBreakTime.value > 0){
        longBreakTime = inputLongBreakTime.value * 60;
        localStorage.setItem('longBreakTime', inputLongBreakTime.value);
        showTime();
    } else {
        alert("Valeur < 0 ou non numérique");
    }
})

/**
 * This loop check expression regular
 */
for(let resultat of inputs) {
    resultat.addEventListener('input', () => {
        let inputValue = resultat.value.match(/^\d+$/);
        if (inputValue === null || Number.parseInt(inputValue) < 0) {
            resultat.value = "";
        }
})}

/**
 * This listener is for the button display and for start timer
 */
buttonPlay.addEventListener('click', () =>{
    setInterval(decreaseTime, 1000);
    buttonPlay.style.display = 'none';
    buttonStop.style.display = 'block';
});

/**
 * This listner is for the button reload pagen 
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
    if(state){
        state = false
        document.body.style.backgroundColor = '#54ff62'
    }else {
        state = true;
        document.body.style.backgroundColor = '#ff5e63'
    };
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
        timer = workTime;
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

/**
 * This 2 lines diplay the time and the statement on the first load
 */
tryState();
showTime();