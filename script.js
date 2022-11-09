const Gameboard = (() => {
    let gameBoard = [['','',''],['','',''],['','','']];
    return { gameBoard };
})();

const Player = (name, tile) => {
    let victories = 0;
    const addVictory = () => {
        victories++;
    }
    const getName = () => name;
    const getTile = () => tile;
    const makeMove = (row, column) => {
        if (Gameboard.gameBoard[row][column] == '') {
            Gameboard.gameBoard[row][column] = getTile();
            return true;
        } 
        else {
            return false;
        }
    }
    return { getName, getTile, addVictory, makeMove };
} 

const displayController = (() => {
    const gameContainer = document.querySelector(".gameContainer");

    const begin = () => {
        for (let i = 0; i < Gameboard.gameBoard.length; i++) {
            let row = gameContainer.children[i];
            for (let j = 0; j < Gameboard.gameBoard[i].length; j++) {
                let column = row.children[j];
                column.textContent = Gameboard.gameBoard[i][j];

                column.addEventListener("click", (e) => {
                    Game.Move(row.dataset.row, e.target.dataset.column)
                });
            }
        }
    }
    const reload = () => {
        for (let i = 0; i < Gameboard.gameBoard.length; i++) {
            let row = gameContainer.children[i];
            for (let j = 0; j < Gameboard.gameBoard[i].length; j++) {
                let column = row.children[j];
                column.textContent = Gameboard.gameBoard[i][j];
            }
        }
    }
    return { reload, begin }

})();

const Game = (() => {
    let turn;
    let player1;
    let player2;
    const begin = (playerone = Player("John", "x"), playertwo = Player("Peter", "o")) => {
        displayController.begin();
        player1 = playerone;
        player2 = playertwo;
        doTurn();
    }
    const doTurn = () => {
        if (turn === undefined) {
            turn = player1;
        }
        else if (turn.getName() === player1.getName()) {
            turn = player2;
            console.log(turn.getName());
        }
        else {
            turn = player1;
            console.log(turn.getName());
        }
    }

    const Move = (row, column) => {
        let moveMade = turn.makeMove(row, column);
        displayController.reload();
        if (moveMade) {
            if (checkVictory()) {
                alert(`${turn.getName()} won!`);
            } else {
                if (checkTie()) {
                    alert(`It's a tie!`);
                }
                else {
                    doTurn();
                }
            }
        }
    }

    const checkVictory = () => {
        for (let i = 0; i < Gameboard.gameBoard.length; i++) {
            if (Gameboard.gameBoard[i][0] === Gameboard.gameBoard[i][1] && Gameboard.gameBoard[i][1] === Gameboard.gameBoard[i][2] && Gameboard.gameBoard[i][0] !== "") {
                return true;
            }
            if (Gameboard.gameBoard[0][i] === Gameboard.gameBoard[1][i] && Gameboard.gameBoard[1][i] === Gameboard.gameBoard[2][i] && Gameboard.gameBoard[0][i] !== "") {
                return true;
            }
        }
        if (Gameboard.gameBoard[0][0] === Gameboard.gameBoard[1][1] && Gameboard.gameBoard[1][1] === Gameboard.gameBoard[2][2] && Gameboard.gameBoard[0][0] !== "") {
            return true;
        }
        if (Gameboard.gameBoard[0][2] === Gameboard.gameBoard[1][1] && Gameboard.gameBoard[1][1] === Gameboard.gameBoard[2][0] && Gameboard.gameBoard[0][2] !== "") {
            return true;
        }
        return false;
    }

    const checkTie = () => {
        for (let i = 0; i < Gameboard.gameBoard.length; i++) {
            for (let j = 0; j < Gameboard.gameBoard[i].length; j++) {
                if (Gameboard.gameBoard[i][j] === "") {
                    return false;
                }
            }
        }
        return true;
    }
    return { begin, Move };
})();

const interfaceController = (() => {
    const btnNew = document.querySelector(".btnNew");
    const btnReset = document.querySelector(".btnReset");
    btnReset.addEventListener("click", (e) => {
        location.reload();
    });

    btnNew.addEventListener("click", (e) => {
        e.target.disabled = true;
        btnReset.disabled = false;
        let player1Name = prompt("Pick name for Player 1");
        let player2Name = prompt("Pick name for Player 2");
        if (player1Name !== "" && player2Name !== "") {
            let player1 = Player(player1Name, "x");
            let player2 = Player(player2Name, "o");
            Game.begin(player1, player2);
        }
        else {
            Game.begin();
        }
    });
})();
