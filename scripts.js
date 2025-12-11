// Player factory for two players
const Player = function (name) {

    this.name = name;
    let score = 0;
    const increaseScore = () => score++;
    const getScore = () => score;

    const getName = () => name;
    const setName = (newName) => { name = newName };

    let symbol = null;
    const getSymbol = () => symbol;
    const setSymbol = (newSymbol) => { symbol = newSymbol };

    return { setName, getName, increaseScore, getScore, setSymbol, getSymbol };
}

// IIFE since there is only one gameboard
const GameboardController = (function () {
    let gameBoard = [null, null, null, null, null, null, null, null, null];
    const getBoard = () => gameBoard;

    const resetBoard = () => gameBoard = [null, null, null, null, null, null, null, null, null];


    const markBoardInArray = (symbol, index) => {

        if(gameBoard[index] !== null){
            alert("This square is full, play elsewhere!");  
        }
        else{
            gameBoard[index] = symbol;
        }
    }

    const checkWin =  (gameBoard) => {
        const winPatterns = [
            [0, 1, 2], // Top row
            [3, 4, 5], // Middle row
            [6, 7, 8], // Bottom row
            [0, 3, 6], // Left column
            [1, 4, 7], // Middle column
            [2, 5, 8], // Right column
            [0, 4, 8], // Diagonal \
            [2, 4, 6]  // Diagonal /
            ];

        for (const pattern of winPatterns){
            const[a,b,c] = pattern;

            if (gameBoard[a] &&
                gameBoard[a] === gameBoard[b] &&
                gameBoard[a] === gameBoard[c]) {
                    return{
                        winner: gameBoard[a], // the winning board symbol (X or O)
                        winningCells: pattern // the positions of [a, b, c]
                    };
                }
        }

        if (!gameBoard.includes(null)){
            return {winner: "draw"}; // returns an object containing winner: draw
        }

        return null; // This is the final, if no winner or draw is found we continue with null being returned
    }

    // Big composite function, this should run through the entire chain of events

    return { markBoardInArray, checkWin, getBoard, resetBoard };
})();



// updating the visualls.
const displayController = (function (){
    const cells = document.querySelectorAll(".cell");

    const displayBoard = () => {
        cells.forEach(cell =>{

        });
    }

const addClickers = (clickHandler) => {  // ← Add parameter here
    cells.forEach(cell => {
        cell.addEventListener("click", function(){
            // Use the parameter instead of gameController directly
            clickHandler(this.dataset.cellIndex);  // ← Changed this line
        });
    });
};
    return { addClickers };
})();

// IIFE since there is only one game controller
const gameController = (function () {

    let startingPlayer = Math.floor(Math.random() * 2) + 1;
    let currentPlayerTurn = startingPlayer;
    let player1, player2;

    const getCurrentPlayerTurn = () => currentPlayerTurn;


    // For switching the turns after each move
    const switchTurn = () => {
        if(currentPlayerTurn === 1){
            currentPlayerTurn = 2;
        }
        else{
            currentPlayerTurn = 1;
        }
    };

    // ingition switch
    const startGame = () => {
        player1 = new Player("Keagan");
        player2 = new Player("Chun-li");
        player1.setSymbol("X");
        player2.setSymbol("O");
        displayController.addClickers(handleCellClick);
    };

    const handleCellClick = (index) => {
        
        if (currentPlayerTurn === 1){
            GameboardController.markBoardInArray(player1.getSymbol(), index);
        }
        else{
            GameboardController.markBoardInArray(player2.getSymbol(), index);
        }
        console.log(GameboardController.getBoard());
        switchTurn();
                /* depening on the turn will mark the cell
         then will check for win, if return {winner:} object we conclude the game
         if return null the game continues by swapping the current turn by changing the currentTurn variable using the switchTurn Function
        */
    };
    return { getCurrentPlayerTurn, handleCellClick, switchTurn, startGame };
})();

gameController.startGame();
