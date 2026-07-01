const themeBtn = document.getElementById("themeBtn");

const input = document.getElementById("winInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("winList");
const streakEl = document.getElementById("streak");

let wins = JSON.parse(localStorage.getItem("wins")) || [];
let lastDate = localStorage.getItem("lastDate") || null;
let streak = parseInt(localStorage.getItem("streak")) || 0;

// Save
function saveAll() {
    localStorage.setItem("wins", JSON.stringify(wins));
    localStorage.setItem("streak", streak);
    localStorage.setItem("lastDate", lastDate);
}

// Streak logic
function updateStreak() {
    const today = new Date().toDateString();

    if (lastDate === today) return;

    if (lastDate) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastDate === yesterday.toDateString()) {
            streak++;
        } else {
            streak = 1;
        }
    } else {
        streak = 1;
    }

    lastDate = today;
    saveAll();
}

// Render
function render() {
    list.innerHTML = "";

    wins.forEach((win, index) => {
        const li = document.createElement("li");

        li.textContent = win;

        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";

        delBtn.addEventListener("click", () => {
            wins.splice(index, 1);
            saveAll();
            render();
        });

        li.appendChild(delBtn);
        list.appendChild(li);
    });

    streakEl.textContent = `🔥 Streak: ${streak} day(s)`;
}

// Add win
button.addEventListener("click", function () {
    const text = input.value.trim();
    if (text === "") return;

    updateStreak();

    wins.push(text);
    saveAll();
    render();

    input.value = "";
});

render();

let darkMode = localStorage.getItem("darkMode") === "true";

if (darkMode) {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️ Light Mode";
}

themeBtn.addEventListener("click", () => {
    darkMode = !darkMode;

    document.body.classList.toggle("dark");

    if (darkMode) {
        themeBtn.textContent = "☀️ Light Mode";
    } else {
        themeBtn.textContent = "🌙 Dark Mode";
    }

    localStorage.setItem("darkMode", darkMode);
});