let count = { home: 0, guest: 0 };
let fouls = { home: 0, guest: 0 };
const GAME_DURATION = 2700; // 45 minutes
let seconds = GAME_DURATION;   // ← بتبدأ من المدة الكاملة مش من صفر
let timerInterval = null;
let isRunning = false;
let gameStarted = false;
let period = 1;
const FOUL_LIMIT = 3;

function increase(id, amount) {
    count[id] += amount;
    document.getElementById(id).textContent = count[id];
}

function increaseFouls(id) {
    fouls[id] += 1;
    document.getElementById(`foul_${id}`).textContent = fouls[id];
    if (fouls[id] >= FOUL_LIMIT) {
        const opponent = id === "home" ? "guest" : "home";
        increase(opponent, 1);
    }
}

function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function updateTimerDisplay() {
    document.getElementById("timer-display").textContent = formatTime(seconds);
}

function setButtonsEnabled(enabled) {
    document.querySelectorAll(".btn, .btn_control").forEach(btn => {
        btn.disabled = !enabled;
    });
}

function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    isRunning = true;
    setButtonsEnabled(true);

    timerInterval = setInterval(() => {
        seconds--;                     // ← بتنقص مش بتزيد
        updateTimerDisplay();

        // نص الوقت بالعدّ التنازلي = لما توصل نص المدة المتبقية
        if (seconds === Math.floor(GAME_DURATION / 2) && period === 1) {
            period = 2;
            document.getElementById("period-display").textContent = period;

            fouls.home = 0;      // ← صفّري المتغير نفسه
            fouls.guest = 0;      // ← مش بس النص المعروض
            document.getElementById("foul_home").textContent = 0;
            document.getElementById("foul_guest").textContent = 0;

        }

        if (seconds <= 0) {            // ← لما توصل صفر، وقفي 
            seconds = 0;
            updateTimerDisplay();
            clearInterval(timerInterval);
            setButtonsEnabled(false);
            isRunning = false;
            announceWinner();          // ← ضيفي هاد السطر

        }
    }, 1);
}

function newGame() {
    clearInterval(timerInterval);
    isRunning = false;
    gameStarted = false;
    seconds = GAME_DURATION;   // ← رجّعيها للمدة الكاملة، مش صفر
    period = 1;

    count.home = 0;
    count.guest = 0;
    fouls.home = 0;
    fouls.guest = 0;

    document.getElementById("home").textContent = 0;
    document.getElementById("guest").textContent = 0;
    document.getElementById("foul_home").textContent = 0;
    document.getElementById("foul_guest").textContent = 0;
    document.getElementById("period-display").textContent = period;
    document.getElementById("winner-display").textContent = "";   // ← امسحي الرسالة

    updateTimerDisplay();

    setButtonsEnabled(false);
}

function announceWinner() {
    let message;
    if (count.home > count.guest) {
        message = "🏆 HOME WINS!";
    } else if (count.guest > count.home) {
        message = "🏆 GUEST WINS!";
    } else {
        message = "🤝 IT'S A TIE!";
    }

    document.getElementById("winner-display").textContent = message;
}