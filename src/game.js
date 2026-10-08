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

    board[index] = currentPlayer.symbol;

    const winnerPlayer = winner(board);

    if (winnerPlayer) {
        updateScore(winnerPlayer);
        roundFinished = true;
        return {
            symbol: currentPlayer.symbol,
            result: "winner"
        };
    }

    if (board.every(cell => cell !== "")) {
        ties++;
        roundFinished = true;
        return {
            symbol: currentPlayer.symbol,
            result:"tie"
        }
    }

    const symbol = currentPlayer.symbol;

    if (currentPlayer === playerX) {
        currentPlayer = playerO;
    } else {
        currentPlayer = playerX;
    }

    return {
        symbol: symbol,
        result: "continue"
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
    if (winnerPlayer === playerX) {
        winnerPlayer.score++;
    } else if (winnerPlayer === playerO) {
        winnerPlayer.score++;
    }
}

export function resetBoard() {
    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];
}