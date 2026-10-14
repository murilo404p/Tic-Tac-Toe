export let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

export const playerX = {
    name: "PLAYER X",
    score: 0,
    symbol: "X"
};

export const playerO = {
    name: "PLAYER O",
    score: 0,
    symbol: "O"
};

export let roundFinished = false;
export let ties = 0;
export let currentPlayer = playerX;

const combinationsWinning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export function playerMove(index) {
    if (roundFinished) {
        return {
            symbol: null,
            result: "invalid"
        }
    }

    if (board[index] !== "") {
        return {
            symbol: null,
            result: "invalid"
        }
    }

    const symbol = currentPlayer.symbol;
    const name = currentPlayer.name;
    board[index] = currentPlayer.symbol;

    const winnerPlayer = winner(board);

    if (winnerPlayer) {
        updateScore(winnerPlayer);
        roundFinished = true;
        return {
            symbol: symbol,
            result: "winner",
            name: name,
            points: winnerPlayer.score
        };
    }

    if (board.every(cell => cell !== "")) {
        ties++;
        roundFinished = true;
        return {
            symbol: symbol,
            result:"tie",
            points: ties
        }
    }

    if (currentPlayer === playerX) {
        currentPlayer = playerO;
    } else {
        currentPlayer = playerX;
    }

    const nextPlayer = currentPlayer.name;

    return {
        symbol: symbol,
        result: "continue",
        nextPlayer: nextPlayer
    }
}

function winner(board) {
    for (const combination of combinationsWinning) {
        if (
            board[combination[0]] === board[combination[1]] &&
            board[combination[1]] === board[combination[2]] &&
            board[combination[0]] !== ""
        ) {
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
    winnerPlayer.score++;
}

export function resetBoard() {
    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    roundFinished = false;
    currentPlayer = playerX;
}

export function resetGame() {
    resetBoard();

    playerO.score = 0;
    playerX.score = 0;
    ties = 0;
}