// 1-X , 2-O
let dialog = document.querySelector(".player-name-input")
function showInputDialog(){
  dialog.style.display="flex"
}
showInputDialog()
let inputBtn = document.querySelector(".player-name-input button")
function takePlayerNames(){
  console.log("salam")
  let firstPlayerName = dialog.querySelectorAll("input").item(0).value
  let secondPlayerName= dialog.querySelectorAll("input").item(1).value

  let player1Name = document.querySelectorAll(`${firstPlayer.playerField} span`).item(0)
  player1Name.innerHTML=`${firstPlayerName}(X)`
  let player2Name = document.querySelectorAll(`${secondPlayer.playerField} span`).item(0)
  player2Name.innerHTML=`${secondPlayerName}(O)`
  dialog.style.display="none"
}
inputBtn.addEventListener('click',function(){
  takePlayerNames()
})
class Player{
    constructor(_playerId,_playerName,_playerIcon,_playerField,_playerString){
        this.playerId=_playerId
        this.playerName=_playerName
        this.playerIcon=_playerIcon
        this.playerField=_playerField
        this.playerString=_playerString
    }
    addIconToCell(cell,cells){
        cell.innerHTML = this.playerIcon
        let cellIndex = Array.from(cells).indexOf(cell)
        const rowIndex = Math.floor(cellIndex / 3);
        const columnIndex = cellIndex % 3;
        gameController.board[rowIndex][columnIndex] = this.playerString;
    }   
}

class GameController{
    boardUI=document.querySelector(".board")
    currentPlayer=null
    board = [
        [],
        [],
        []
      ];
    firstPlayerWinCount =0;
    secondPlayerWinCount=0;
    tie=0;
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
        newPlayerField.classList.remove("semi-bright")
        newPlayerField.classList.add('normal-bright')
    }

   checkWin() {
        console.log(this.board)
        // Horizontal check
        for (let i = 0; i < 3; i++) {
          if (this.board[i][0] !== undefined && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]) {
            return this.board[i][0]; 
          }
        }
        // Vertical check
        for (let j = 0; j < 3; j++) {
          if (this.board[0][j] !== undefined && this.board[0][j] === this.board[1][j] && this.board[1][j] === this.board[2][j]) {
            return this.board[0][j]; 
          }
        }      
        // Check diagonal lines
        if (this.board[0][0] !== undefined && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
            return this.board[0][0];
        }
        if (this.board[0][2] !== undefined && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) {
            return this.board[0][2]; 
        }
        return undefined;
      }
      
      restartGame(){
        this.moveCount=0
        this.board=  [
            [],
            [],
            []
          ]

        this.boardUI.innerHTML = `
        <div class="row">
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
    </div>

    <div class="row">
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
    </div>

    <div class="row">
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
    </div>
        `
        defaultSettings()
        setEventListeners()
        }
    
    displayGameResult(winner){
        let gameResult = document.querySelector(".game-result")
        if(winner!=null){
        gameResult.innerHTML=`
        ${winner.playerIcon}
            <h1>Winner!</h1>
            <button>Restart</button>
        `
        }
        else{
            gameResult.innerHTML=`
            <h1>Tie!</h1>
            <button>Restart</button>
        `
        }
        gameResult.style.display="flex"
        let restartButton = document.querySelector(".game-result button")
        restartButton.addEventListener('click',function(){

            gameController.restartGame()
            let gameResult = document.querySelector(".game-result")
            gameResult.style.display="none"
        
        })
    }
    
    whoIsTheWinner(resultOfCheckWin) {
        const nonEmptyCells = this.board.flat().filter(cell => cell !== undefined);
        
        if (resultOfCheckWin === firstPlayer.playerString) {
          this.firstPlayerWinCount++;
          let player1ScoreUI = document.querySelector(`${firstPlayer.playerField} .score`);
          player1ScoreUI.innerHTML = this.firstPlayerWinCount;
          setTimeout(() => {
            this.displayGameResult(firstPlayer);
          }, 200);
          return firstPlayer;
        } else if (resultOfCheckWin === secondPlayer.playerString) {
          this.secondPlayerWinCount++;
          let player2ScoreUI = document.querySelector(`${secondPlayer.playerField} .score`);
          player2ScoreUI.innerHTML = this.secondPlayerWinCount;
          setTimeout(() => {
            this.displayGameResult(secondPlayer);
          }, 200);
          return secondPlayer;
        } else if (nonEmptyCells.length === 9 && resultOfCheckWin === undefined) {
          this.tie++;
          let tieScore = document.querySelector(".tie .score");
          tieScore.innerHTML = this.tie;
          this.displayGameResult(null);
          return null;
        } else {
          return "game continue";
        }
      }
      
 
}
      


let currentPlayer = null
let firstPlayer = new Player(1,"Teymur",`<i class="fa-solid fa-x"></i>`,`.player1-X-score`,"X")
let secondPlayer = new Player(2,"Ismayil",`<i class="fa-solid fa-o"></i>`,`.player2-O-score`,"O")
let gameController = new GameController()

function defaultSettings(){
  currentPlayer=firstPlayer
  let firstPlayerField= document.querySelector(firstPlayer.playerField)
  firstPlayerField.classList.remove("semi-bright")
  let secondPlayerField= document.querySelector(secondPlayer.playerField)
  secondPlayerField.classList.remove("normal-bright")
  secondPlayerField.classList.add("semi-bright")
}
defaultSettings()
function setEventListeners(){
let cells = document.getElementsByClassName("cell");
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click',function(){
    currentPlayer.addIconToCell(cells[i],cells)
    gameController.countMove(cells[i])
    if(gameController.moveCount>4){
    console.log(gameController.whoIsTheWinner(gameController.checkWin()))
    }
    gameController.darkCurrentplayerAfterMove(currentPlayer)
    let newPlayer = gameController.whoIsTheCurrentPlayer()
    gameController.brightNewPlayer(newPlayer)})
}}
setEventListeners()



