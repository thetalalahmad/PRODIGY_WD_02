// Stopwatch variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 1;

// DOM elements
const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

// Format time as HH:MM:SS.ms
function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

// Update display
function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

// Start or pause the stopwatch
function startPause() {
    if (isRunning) {
        clearInterval(timerInterval);
        startPauseBtn.textContent = 'Resume';
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10); // Update every 10ms for precision
        startPauseBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

// Reset the stopwatch
function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    startPauseBtn.textContent = 'Start';
    updateDisplay();
    lapsList.innerHTML = ''; // Clear laps
    lapCounter = 1;
}

// Record a lap
function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsList.appendChild(lapItem);
        lapCounter++;
    }
}

// Event listeners
startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

// Initial display update
updateDisplay();