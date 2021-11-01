const playerFactory = (name, marker) => {
    return {name, marker};
};

const playerOne = playerFactory("Tim", "X");
const playerTwo = playerFactory("Dani", "O");


const gameBoardFlowModule = (() => {
    let gameBoard = {
        tiles: 
        [
            {
                position: 0,
                marker: "none"
            },
            {
                position: 1,
                marker: "none"
            },
            {
                position: 2,
                marker: "none"
            },
            {
                position: 3,
                marker: "none"
            },
            {
                position: 4,
                marker: "none"
            },
            {
                position: 5,
                marker: "none"
            },
            {
                position: 6,
                marker: "none"
            },
            {
                position: 7,
                marker: "none"
            },
            {
                position: 8,
                marker: "none"
            }
        ]
    };


    let turnCounter = 1;
    let gameFlow = {
        turn: turnCounter,
        activePlayer: playerOne
    }

    return{gameBoard, gameFlow};

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

          if (cell.className == "gameBoardCell noSelect"){
              //Clicked box has not been marked yet, mark it with the current active players marker and add marked class

            cell.innerHTML = gameBoardFlowModule.gameFlow.activePlayer.marker; 
            cell.className = "gameBoardCell noSelect marked";

            //Check to see what players turn it currently is and flip it

            if (gameBoardFlowModule.gameFlow.activePlayer == playerOne){
                gameBoardFlowModule.gameFlow.activePlayer = playerTwo;
            }
            else {
                gameBoardFlowModule.gameFlow.activePlayer = playerOne;
            }
          }

          else {
              console.log("Spot Taken")
              console.log(cell.id)
          }


        }))

        gameBoardContainer.appendChild(cell);
        i++;
    });

})();