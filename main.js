const playerFactory = (name, marker) => {
    return {
        name,
        marker
    };
};

let playerOne = playerFactory("playerOne", "X");
let playerTwo = playerFactory("playerTwo", "O");


const gameBoardFlowModule = (() => {

    let gameOver = false;

    let tileMarker = (id) => {
        gameBoard.tiles[id].marker = gameFlow.activePlayer.marker;
    }
    let gameBoard = {
        tiles: []
    };
    for(i = 0; i < 9; i++) {
        gameBoard.tiles[i] = {
            position: i,
            marker: `none${i}`
        }
    }


    let tileChecker = (tileOne, tileTwo, tileThree) => {
        if (gameBoard.tiles[tileOne].marker == gameBoard.tiles[tileTwo].marker && gameBoard.tiles[tileOne].marker == gameBoard.tiles[tileThree].marker) {
            alert(`player ${gameFlow.activePlayer.name} has won!`)
            gameBoardFlowModule.gameOver = true;
        }
    }

    let turnCounter = 1;
    let gameFlow = {
        turn: turnCounter,
        activePlayer: playerOne
    }

    return {
        gameBoard,
        gameFlow,
        gameOver,
        tileMarker,
        tileChecker
    };

})();

const displayController = (() => {


    let gameBoardContainer = document.getElementById("gameBoardContainer");
    let i = 0;
    gameBoardFlowModule.gameBoard.tiles.forEach(tile => {
        let cell = document.createElement("div");
        cell.innerHTML = "";
        cell.id = i;
        cell.className = "gameBoardCell noSelect";

        cell.addEventListener("click", (() => {
            //Check to see if the clicked box has been marked already

            if ((gameBoardFlowModule.gameBoard.tiles[cell.id].marker != "X" && gameBoardFlowModule.gameBoard.tiles[cell.id].marker != "O") && gameBoardFlowModule.gameOver == false) {
                //Clicked box has not been marked yet, mark it with the current active players marker and add marked class

                gameBoardFlowModule.gameFlow.turn++;
                cell.innerHTML = gameBoardFlowModule.gameFlow.activePlayer.marker;
                gameBoardFlowModule.tileMarker(cell.id);

                //check to see if any winning combos are present

                gameBoardFlowModule.tileChecker(0, 1, 2);
                gameBoardFlowModule.tileChecker(3, 4, 5);
                gameBoardFlowModule.tileChecker(6, 7, 8);
                gameBoardFlowModule.tileChecker(0, 3, 6);
                gameBoardFlowModule.tileChecker(1, 4, 7);
                gameBoardFlowModule.tileChecker(2, 5, 8);
                gameBoardFlowModule.tileChecker(0, 4, 8);
                gameBoardFlowModule.tileChecker(2, 4, 6);

                if (gameBoardFlowModule.gameFlow.turn == 10 && gameBoardFlowModule.gameOver == false) {
                    alert("Tie Game!");
                }

                //Check to see what players turn it currently is and flip it

                if (gameBoardFlowModule.gameFlow.activePlayer == playerOne) {
                    gameBoardFlowModule.gameFlow.activePlayer = playerTwo;
                } else {
                    gameBoardFlowModule.gameFlow.activePlayer = playerOne;
                }
            } else {
                console.log("Spot Taken")
                console.log(cell.id)
            }

        }))


        gameBoardContainer.appendChild(cell);
        i++;
    });

})();

const gameSetup = (() => {

    let playerOneInput = document.getElementById("playerOneName");
    let playerTwoInput = document.getElementById("playerTwoName");
    let submitButton = document.getElementById("submitNamesButton");
    let resetBoard = document.getElementById("resetBoardButton");


    resetBoard.addEventListener("click", (() => {
        for (let i = 0; i < 9; i++) {
            let resetTile = document.getElementById(i)

            resetTile.innerHTML = "";
            gameBoardFlowModule.gameBoard.tiles[i].marker = `none${i}`

        }
        gameBoardFlowModule.gameOver = false;
        gameBoardFlowModule.gameFlow.turn = 1;
        gameBoardFlowModule.gameFlow.activePlayer = playerOne;
    }))

    submitButton.addEventListener("click", (() => {
        playerOne.name = playerOneInput.value;
        playerTwo.name = playerTwoInput.value;
        alert("Player Names added")
    }))

})()