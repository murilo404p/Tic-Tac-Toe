import './style.css';

let darkThemeButton = document.getElementById("dark-theme");
const cells = document.querySelectorAll("#game-board button");

const playerX = {
    name: "PLAYER X",
    score: 0,
    symbol: "X"
}

const playerO = {
    name: "PLAYER O",
    score: 0,
    symbol: "O"
}

let ties = 0;
let currentPlayer = playerX;

darkThemeButton.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", "dark");

    const isDark = document.documentElement.classList.contains("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Depois de fechar a página, verifica qual tema o localStorage guardou 
const theme = localStorage.getItem("theme");

if (theme === "dark") {
    document.documentElement.classList.add("dark");
}

cells.forEach((cell) => {
    cell.addEventListener("click", playerMove);
});

function playerMove(event) {
    const cells = event.currentTarget

    if (cells.textContent !== "") {
        return
    }

    cells.textContent = currentPlayer.symbol;

    if(currentPlayer == playerX) {
        currentPlayer = playerO
    } else {
        currentPlayer = playerX
    }

}

