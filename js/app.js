// 1-X , 2-O

class Player{
    constructor(_playerId,_playerName,_playerIcon,_playerField){
        this.playerId=_playerId
        this.playerName=_playerName
        this.playerIcon=_playerIcon
        this.playerField=_playerField
    }
    addIconToCell(cell){
        cell.innerHTML = this.playerIcon
    }
}

class GameController{
    moveCount=0;
    whoIsTheCurrentPlayer(){
        if(this.moveCount%2==0){
            currentPlayer=firstPlayer;
        }
        else{
            currentPlayer=secondPlayer;
        }
        return currentPlayer;
    }
    countMove(cell){
        cell.style.pointerEvents = "none"
        this.moveCount++;
    }
    darkCurrentplayerAfterMove(currentplayer){
       let currentplayerField = document.querySelector(currentplayer.playerField)
       currentplayerField.classList.remove('normal-bright')
       currentplayerField.classList.add('semi-bright')
    }
    brightNewPlayer(newPlayer){
        let newPlayerField = document.querySelector(newPlayer.playerField)
        newPlayerField.classList.add('normal-bright')
    }      
}

let firstPlayer = new Player(1,"Teymur",`<i class="fa-solid fa-x"></i>`,`.player1-X-score`)
let secondPlayer = new Player(2,"Ismayil",`<i class="fa-solid fa-o"></i>`,`.player2-O-score`)
let gameController = new GameController()


let currentPlayer = null
let cell = document.getElementsByClassName("cell");
for (let i = 0; i < cell.length; i++) {
    cell[i].addEventListener('click',function(){
        let currentPlayer = gameController.whoIsTheCurrentPlayer()
        currentPlayer.addIconToCell(cell[i])
        gameController.countMove(cell[i])

        gameController.darkCurrentplayerAfterMove(currentPlayer)
        let newPlayer = gameController.whoIsTheCurrentPlayer()
        gameController.brightNewPlayer(newPlayer)
    }) 
}



