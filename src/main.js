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
});

cells.forEach((cells) => {
    cells.addEventListener("click", () => {
        
    });
});

