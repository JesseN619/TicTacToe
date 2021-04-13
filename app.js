const gameBoard = (() => {
    let currentPlayer = "player1";
    const cells = document.querySelectorAll(".cell");
    const message = document.querySelector("#message");
    const newGameBtn = document.querySelector("#new-game");

    const getCurrentPlayer = () => {
        return currentPlayer;
    }

    const getBoard = () => {
        let board = [];
        cells.forEach(cell => board.push(cell.innerHTML));
        return board;
    };

    const render = () => {
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = getBoard()[i];
        }
    }

    function chooseCell() {
        if (currentPlayer === "player1") {
            this.innerHTML = "X";
            currentPlayer = "player2";
        } else if (currentPlayer === "player2") {
            this.innerHTML = "O";
            currentPlayer = "player1";
        }

        // Remove eventlistener after 1 click
        this.removeEventListener('click', chooseCell);
    }

    function checkWinner() {
        if (game.checkWinner() === "player1" || game.checkWinner() === "player2") {
            cells.forEach(cell => 
                cell.removeEventListener('click', chooseCell));
            cells.forEach(cell => 
                cell.removeEventListener('click', checkWinner));

            message.innerHTML = game.checkWinner() === "player1" ? 
                "Player 1 (X) won!" : "Player 2 (O) won!";
            // TODO: Change message in message spot to "Winner"
            // TODO: Reset board
            
        } else if (game.checkWinner() === "draw") {
            cells.forEach(cell => 
                cell.removeEventListener('click', checkWinner));
            message.innerHTML = "Draw";
        }
    }

    const init = () => {
        addListeners();
        render();
    }

    const addListeners = () => {
        cells.forEach(cell => 
            cell.addEventListener('click', chooseCell));
        cells.forEach(cell => 
            cell.addEventListener('click', checkWinner));
    }

    const reset = () => {
        cells.forEach(cell => cell.innerHTML = "");
        addListeners();
        message.innerHTML = "";
        currentPlayer = "player1";
    }

    newGameBtn.addEventListener("click", reset);

    return {getCurrentPlayer, init, getBoard};
})();

const Player = (marker) => {
    const getMarker = () => {
        return marker;
    };
    
    return {getMarker};
};

const game = (() => {
    const checkWinner = () => {
        const board = gameBoard.getBoard();
        const winConditions = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

        const lastMove = () => {
            let marker = gameBoard.getCurrentPlayer() === "player1" ? "O" : "X";
            return marker; 
        }

        const getMovesList = () => {
            const movesList = [];
            for (let i = 0; i < board.length; i++) {
                // Adds last move to movesList. movesList is the list of moves
                // for the player who last made a move
                if (board[i] === lastMove()) {
                    movesList.push(i);
                }
            }
            return movesList;
        }

        const movesList = getMovesList();

        let winner = false;

        for (let i = 0; i < winConditions.length; i++) {
            let oneWinCondition = winConditions[i];
            // Check if all items in winConditions[i] are in movesList
            if (oneWinCondition.every(elem => movesList.includes(elem))) {
                winner = lastMove() === "X" ? "player1" : "player2";
            }
        }

        if (winner === false && !gameBoard.getBoard().includes("")) {
            winner = "draw";
        }

        return winner;
    }

    return {checkWinner};
})();

// gameBoard.init();