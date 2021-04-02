const gameBoard = (() => {
    let currentPlayer = "player1";
    const cells = document.querySelectorAll(".cell");

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

    const init = () => {
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

        cells.forEach(cell => 
            cell.addEventListener('click', chooseCell));

        render();
    }

    return {init, getBoard};
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



        return winner;
    }

    return {checkWinner};
})();

gameBoard.init();