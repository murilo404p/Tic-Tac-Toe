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

let board = [
    "", "", "",
    "", "", "",
    "", "", ""
]

const combinationsWinning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        playerMove(cell, index)
    });
});

function playerMove(cell, index) {
    if (board[index] !== "") {
        return
    }

    board[index] = currentPlayer.symbol;
    cell.textContent = currentPlayer.symbol;

    const winnerPlayer = winner(board);
    if (winnerPlayer) {
        updateScore(winnerPlayer);
    }

    if(currentPlayer === playerX) {
        currentPlayer = playerO
    } else {
        currentPlayer = playerX
    }
}

function winner(board) {
    for (const combination of combinationsWinning) {
        if (board[combination[0]] === board[combination[1]] && board[combination[1]] === board[combination[2]] && board[combination[0]] !== "") {
            if (board[combination[0]] == playerX.symbol) {
                console.log("Vencedor: X")
                return playerX;
            } else {
                console.log("Vencedor: O")
                return playerO;
            }

            
        }
    } 
    return null;
}

function updateScore(winnerPlayer) {
    if (winnerPlayer === null) {
        return;
    }

    winnerPlayer.score++;
    console.log("Vencedor da rodada: " + winnerPlayer.name + " Pontos: " + winnerPlayer.score);
}