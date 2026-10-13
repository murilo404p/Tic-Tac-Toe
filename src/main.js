import './style.css';
import { playerO, playerX, board, currentPlayer, ties, roundFinished, playerMove, resetBoard } from "./game.js";

let darkThemeButton = document.getElementById("dark-theme");
const cells = document.querySelectorAll("#game-board button");
let scoreX = document.getElementById("score-player-X");
let scoreO = document.getElementById("score-player-O");
let scoreTie = document.getElementById("score-tie");
let playerTurn = document.getElementById("player-turn");
let reset = document.getElementById("reset");

darkThemeButton.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    const isDark = document.documentElement.classList.contains("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Depois de fechar a página, verifica qual tema o localStorage guardou 
const theme = localStorage.getItem("theme");

if (theme === "dark") {
    document.documentElement.classList.add("dark");
} 

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        const result = playerMove(index);
        if (result.symbol === null) {
            return;
        } else {
            cell.textContent = result.symbol;
        }
        
        if (result.result === "winner") {
            if (result.symbol === "X") {
                scoreX.textContent = result.points;
            } else {
                scoreO.textContent = result.points;
            } 
            playerTurn.textContent = result.name + " WIN!";

        } else if(result.result === "tie") {
            playerTurn.textContent = "IT'S A TIE! PLAY AGAIN"
            scoreTie.textContent = result.points
        } else {
            playerTurn.textContent = result.nextPlayer + " TURN"
        }
    });
});