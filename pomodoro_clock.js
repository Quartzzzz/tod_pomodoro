

/* --- Global variables --- */

let secTotal;
let secTotalInit;
let sec;
let min;
let timerStr;
let intervalID;
let toggleValue = true;
let sessionTimeInit = 1500;
let breakTimeInit = 300;

/* --- Audio --- */
const kalimba = document.querySelector('#kalimba');

const shaker = document.querySelector('#shaker');


/* --- Toggle Feature --- */
function toggleSessionBreak(init=sessionTimeInit) {
	secTotal = init;
} 

toggleSessionBreak(); // Initialize the value of sessionTimeValueText

/* --- Parameters --- */

// Session Parameters
const sessionTimeValue = document.querySelector('#session-time-value');
sessionTimeValueText();

function sessionTimeValueText() {
	sessionTimeValue.textContent = Math.floor(sessionTimeInit/60);
}

const sessionTimeDecreaser = document.querySelector('#session-time-decreaser');
sessionTimeDecreaser.addEventListener('click', () => {
	if (sessionTimeInit !== secTotal || secTotal <= 60) return; // Prevent the user from changing the session time initializer while the timer is running or paused.
	sessionTimeInit = secTotal -= 60;
	sessionTimeValueText();
	timerDisplayText();
});

const sessionTimeIncreaser = document.querySelector('#session-time-increaser');
sessionTimeIncreaser.addEventListener('click', () => {
	if (sessionTimeInit !== secTotal || secTotal >= 1500) return;
	sessionTimeInit = secTotal += 60;
	sessionTimeValueText();
	timerDisplayText();
})

// Break parameters
const breakTimeValue = document.querySelector('#break-time-value');

function breakTimeValueText() {
	breakTimeValue.textContent = Math.floor(breakTimeInit/60);
}

const breakTimeDecreaser = document.querySelector('#break-time-decreaser');
breakTimeDecreaser.addEventListener('click', () => {
	if (sessionTimeInit !== secTotal || breakTimeInit <= 60) return;
	breakTimeInit -= 60;
	breakTimeValueText();
})

const breakTimeIncreaser = document.querySelector('#break-time-increaser');
breakTimeIncreaser.addEventListener('click', () => {
	if (sessionTimeInit !== secTotal || breakTimeInit >= 300) return; 			 
	breakTimeInit += 60;																						
})

/* --- Display --- */

const timerDisplay = document.querySelector('#timer');
timerDisplayText();

function timerDisplayText() {
	timerDisplay.textContent = timer();
}


function timer() {
	sec = secTotal % 60; 
	min = Math.floor(secTotal/60);
	return timerStr = min + ':' + sec.toString().padStart(2, "0"); // Seconds are formatted to be displayed with two digits ("0" becomes "00");
}

/* --- Timer --- */

const timerState = document.querySelector('#timer-state');

const startBtn = document.querySelector('#start');
startBtn.addEventListener('click', () => {
	shaker.play();
	start();

})

function start() {
	intervalID = setInterval(decreaseSec, 10);

}

function decreaseSec() {
	if (!secTotal) {													// When the seconds = 0, switch between the Session and the Break and vice versa.
		switch (toggleValue) {
			case true:
				toggleSessionBreak(breakTimeInit);
				timerState.textContent = "Break";
				toggleValue = false;
				kalimba.play(); 
				break;
			case false:
				toggleSessionBreak(sessionTimeInit);
				timerState.textContent = "Session";
				toggleValue = true;
				shaker.play(); 
				break;
		}
	}
 	--secTotal;
 	timerDisplay.textContent = timer()
}

const pauseBtn = document.querySelector('#pause');
pauseBtn.addEventListener('click', () => clearInterval(intervalID));

const stopBtn = document.querySelector('#stop');
stopBtn.addEventListener('click', () => {
	clearInterval(intervalID);
	(toggleValue) ? secTotal = sessionTimeInit : secTotal = breakTimeInit; 
	timerDisplayText();
})

const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', () => {
	clearInterval(intervalID);
	toggleValue = true;
	sessionTimeInit = 1500;
	sessionTimeValueText();
	breakTimeInit = 300;
	breakTimeValueText();
	toggleSessionBreak();
	timerState.textContent = "Session";
	timerDisplayText();
})
