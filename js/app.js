const colors = ["yellow", "red", "green", "blue"];
let sequences = [];
let playerGuess = [];
let topFiveScore = [];
let Level;
const root = document.querySelector("#root");
const resetBtn = document.querySelector("#Start");
const colorBtns = document.querySelectorAll(".btn");
let guessCount = 0;
const speedBar = document.getElementById("speedRange");
let displaySpeed = speedBar.value;
let disapperSpeed = displaySpeed - 200;
const scoreBtn = document.querySelector("#scoreBtn");
const scoreBoard = document.getElementById("scoreboard");
let playerName = "";
let score;

speedBar.oninput = function () {
  displaySpeed = this.value;
};
//call basic function when page load
disableColorBtns();
setRootRunning();
deStringNRetriveScore();
//event listener
colorBtns.forEach((button) => {
  button.addEventListener("click", testColor);
});
resetBtn.addEventListener("click", resetGame);
scoreBtn.addEventListener("click", displayScoreBoard);

function scoreCalculator() {
  if (displaySpeed < 750) {
    score = +level * 200;
  } else {
    score = +level * 100;
  }
}

function displayScoreBoard() {
  if (scoreBoard.style.display === "none") {
    scoreBoard.style.display = "block";
  } else {
    scoreBoard.style.display = "none";
  }
}

function enterPlayerName() {
  let player = prompt("Enter you name to be on the Score Board");
  playerName = player;
}

function addSequence() {
  sequences.push(colors[Math.floor(Math.random() * 4)]);
}

function displayLevel() {
  document.querySelector("#currentLevel").innerText = `Level: ${level}`;
}

function displayCurrentScore() {
  document.querySelector("#currentScore").innerText = `Current Score: ${score}`;
}

function resetScore() {
  score = 0;
}

function resetLevel() {
  level = 1;
  displayLevel();
}

function displaySequences(callbackFunction) {
  sequences.forEach((color, index) => {
    let node = document.querySelector(`#${color}`);
    setTimeout(() => {
      node.classList.add("displaySequence");
      setTimeout(() => {
        node.classList.remove("displaySequence");
        if (index === sequences.length - 1) {
          callbackFunction();
        }
      }, index + 1 * disapperSpeed);
    }, index * displaySpeed);
  });
}

function clearGuesses() {
  guessCount = 0;
  playerGuess.length = 0;
}

function enableResetButton() {
  resetBtn.disabled = false;
}

function disableResetButton() {
  resetBtn.disabled = true;
}

function disableSpeedBar() {
  speedBar.disabled = true;
}

function enableSpeedBar() {
  speedBar.disabled = false;
}

function resetGame() {
  resetLevel();
  sequences.length = 0; // reset sequences
  disableResetButton();
  startLevel();
  disableSpeedBar();
}

function setRootRunning() {
  root.classList.remove("stopped");
  root.classList.add("running");
}

function setRootStop() {
  root.classList.remove("running");
  root.classList.add("stopped");
}

function disableColorBtns() {
  colorBtns.forEach((colorBtn) => {
    colorBtn.disabled = true;
  });
}

function enableColorBtns() {
  colorBtns.forEach((colorBtn) => {
    colorBtn.disabled = false;
  });
}

function startLevel() {
  clearGuesses();
  addSequence();
  setTimeout(() => {
    disableColorBtns();
    displaySequences(() => {
      enableColorBtns();
      setRootStop();
    });
    setRootRunning();
  }, 1000);
  scoreCalculator();
}

function testColor(e) {
  if (e.target.id === sequences[guessCount]) {
    guessCount++;
    playerGuess.push(e.target.id);
    if (playerGuess.length === sequences.length) {
      level += 1;
      displayLevel();
      startLevel();
      displayCurrentScore();
    }
  } else {
    alert("youlose");
    enterPlayerName();
    enableResetButton();
    disableColorBtns();
    setRootRunning();
    enableSpeedBar();
    addToScoreArray()
    stringNStoreScore()
    displayTopFive()
    resetLevel();
      resetScore()
    displayCurrentScore();
  }
}

function addToScoreArray() {
  if (topFiveScore === null){
    topFiveScore = new Array
    let player1 = {playerName, score}
    topFiveScore.push(player1)
  }else {
    let player1 = {playerName, score}
    topFiveScore.push(player1)
  }
}

function sortScore(){
  topFiveScore.sort(function (a,b){
    return b.score - a.score
  })
}

function onlyTopFive(){
  if (topFiveScore.length >= 5){
    topFiveScore.length = 5
  }
}

function displayTopFive(){
  const listEl = document.querySelector('ol')
  sortScore()
  onlyTopFive()
  listEl.innerHTML = ""
  topFiveScore.forEach(function(e){
    let list = document.createElement('li')
    let displayScore = `${e.playerName} ${e.score}`
    list.innerText = displayScore
    listEl.appendChild(list)
  })
}

function stringNStoreScore(){
  let str = JSON.stringify(topFiveScore)
  localStorage.setItem('TopScores', str)
}

function deStringNRetriveScore(){
  topFiveScore = JSON.parse(localStorage.getItem('TopScores'))
}
