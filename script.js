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

const Displaycontrol = (() => {
    let displayController = () => {

    }

})();

const container = document.querySelector(".container")
const board = document.createElement("div");
board.classList.add("board");
container.appendChild(board);