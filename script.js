// script.js
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let laps = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTime, 1000);
  startStopButton.textContent = 'Pause';
}

function pauseTimer() {
  clearInterval(timerInterval);
  startStopButton.textContent = 'Start';
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  display.textContent = '00:00:00';
  laps = [];
  updateLaps();
  startStopButton.textContent = 'Start';
}

function lapTime() {
  laps.push(display.textContent);
  updateLaps();
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  display.textContent = timeToString(elapsedTime);
}

function updateLaps() {
  lapsList.innerHTML = laps.map((lap, index) => `<li>Lap ${index + 1}: ${lap}</li>`).join('');
}

function timeToString(time) {
  let date = new Date(time);
  let hours = String(date.getUTCHours()).padStart(2, '0');
  let minutes = String(date.getUTCMinutes()).padStart(2, '0');
  let seconds = String(date.getUTCSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

startStopButton.addEventListener('click', () => {
  if (timerInterval) {
    pauseTimer();
  } else {
    startTimer();
  }
});

resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTime);
