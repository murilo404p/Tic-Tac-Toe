import './style.css';

let darkThemeButton = document.getElementById("dark-theme");
const cells = document.querySelectorAll("#game-board button");
let scoreX = document.getElementById("score-player-X");
let scoreO = document.getElementById("score-player-O");
let scoreTie = document.getElementById("score-tie");
let playerTurn = document.getElementById("player-turn");
let reset = document.getElementById("reset");

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

let roundFinshed = false;
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
    if (roundFinshed) {
        return;
    }
    
    if (board[index] !== "") {
        return
    }

    board[index] = currentPlayer.symbol;
    cell.textContent = currentPlayer.symbol;

    const winnerPlayer = winner(board);
    if (winnerPlayer) {
        updateScore(winnerPlayer);
        roundFinshed = true;
        playerTurn.textContent = winnerPlayer.name + " WIN!"
        setTimeout(() => {
            resetBoard();
            roundFinshed = false;
        }, 1000);
        return;
    } else if (board.every(cell => cell !== "" )) {
        ties++;
        roundFinshed = true;
        scoreTie.textContent = ties
        playerTurn.textContent = "TIE! PLAY AGAIN";
        setTimeout(() => {
            resetBoard();
            roundFinshed = false;
        }, 1000);
        return;
    }

    if(currentPlayer === playerX) {
        currentPlayer = playerO
        playerTurn.textContent = playerO.name + " TURN";
    } else {
        currentPlayer = playerX
        playerTurn.textContent = playerX.name + " TURN";
    }
}

function winner(board) {
    for (const combination of combinationsWinning) {
        if (board[combination[0]] === board[combination[1]] && board[combination[1]] === board[combination[2]] && board[combination[0]] !== "") {
            if (board[combination[0]] === playerX.symbol) {
                return playerX;
            } else {
                return playerO;
            }
        }
    } 
    return null;
}

function updateScore(winnerPlayer) {
    if (winnerPlayer === playerX) {
        winnerPlayer.score++;
        scoreX.textContent = winnerPlayer.score;
    } else if (winnerPlayer === playerO) {
        winnerPlayer.score++;
        scoreO.textContent = winnerPlayer.score;
    } else {
        return
    }
}

function resetBoard() {
    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ]

    cells.forEach((cell) => {
        cell.textContent = "";
    });
}

reset.addEventListener("click", () => {
    playerO.score = 0;
    scoreO.textContent = playerO.score;

    playerX.score = 0;
    scoreX.textContent = playerO.score;
    
    ties = 0;
    scoreTie.textContent = ties;

    playerTurn.textContent = "PLAY AGAIN!"
}); 