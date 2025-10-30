let timerDisplay = document.querySelector("#timer-display")
let startBtn = document.querySelector("#start-btn")
let pauseBtn = document.querySelector("#pause-btn")
let resetBtn = document.querySelector("#reset-btn")
let inputValue = document.querySelector("#input-value")

let time
let timer
let isRunning = false

let audio = new Audio("ding-sound-effect_2.mp3")

function startTimer () {
    if (!isRunning) {
        time = Number(inputValue.value) * 60
        inputValue.value = ""
        isRunning = true
        timer = setInterval(updateTimer, 1000)
    }
}

function updateTimer() {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60

    localStorage.setItem("time", time)

    if (seconds < 10) {
        seconds = "0" + seconds
    }
    if (minutes < 10) {
        minutes = "0" + minutes
    }

    timerDisplay.textContent = `${minutes} : ${seconds}`
    time--

    if (time < 0) {
        clearInterval(timer)
        isRunning = false
        audio.play()
        alert("Time's up, take a short break 🧘!")
    }
}

function pauseTimer () {
    clearInterval(timer)
    isRunning = false
}

function resetTimer () {
    clearInterval(timer)
    isRunning = false
    time = 25 * 60
    localStorage.removeItem("time")
    timerDisplay.textContent = "25 : 00"
}

function switchMode() {
    document.body.classList.toggle("dark-mode");

    let darkBtn = document.getElementById("dark-btn")

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("mode", "dark")
        darkBtn.textContent = "🌞"
    } else {
        localStorage.setItem("mode", "light")
        darkBtn.textContent = "🌙"
    }
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
window.addEventListener("load", function () {
    savedTime = localStorage.getItem("time")

    if (savedTime) {
        time = Number(savedTime)
        updateTimer()
    }

    if (time > 0) {
            isRunning = true;
            timer = setInterval(updateTimer, 1000);
    }

    savedTheme = localStorage.getItem("mode")

    if (savedTheme == "dark") {
        document.body.classList.add("dark-mode")
        darkBtn.textContent = "🌞"
    } else {
        darkBtn.textContent = "🌙"
    }
})