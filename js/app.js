//game is about running sequence and repeating sequency
//when player click start sequence will be generate, then button will be lit up following the sequence.
//player will than repeat the sequence by clicking the button.

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
let disapperSpeed = 0;
const scoreBoard = document.getElementById("scoreboard");
let playerName = "";
let score;

//added range so player can adjust speed in the begining
speedBar.oninput = function () {
  displaySpeed = this.value;
};
//balance the base time how the 'light' will remain on
function toadjustDisapperSpeed() {
  disapperSpeed = displaySpeed - displaySpeed / 5;
}

//call basic function when page load
runInitial();
//event listener
colorBtns.forEach((button) => {
  button.addEventListener("click", testColor);
});
resetBtn.addEventListener("click", resetGame);

//run initial funtion
function runInitial() {
  disableColorBtns();
  setRootRunning();
  deStringNRetriveScore();
  displayTopFive();
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
//display the color sequency by add class to the button, and turn off by removing the sequence.
//added callback when the showing is complete to enable color button
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

//visial disable for hovering over button when sequence is running.
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
//start game function
function startLevel() {
  toadjustDisapperSpeed();
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

//testchoice and after math
function testColor(e) {
  if (e.target.id === sequences[guessCount]) {
    guessCount++;
    playerGuess.push(e.target.id);
    if (playerGuess.length === sequences.length) {
      level += 1;
      displayLevel();
      adjustSpeed();
      startLevel();
      displayCurrentScore();
    }
  } else {
    whenLose();
    enableResetButton();
    disableColorBtns();
    setRootRunning();
    enableSpeedBar();
    addToScoreArray();
    stringNStoreScore();
    displayTopFive();
    resetLevel();
    resetScore();
    displayCurrentScore();
    displaySpeed = speedBar.value;
  }
}

//what happen when lost and how score work
//when lost alert player
//let player enter name
//update score scoreborad, and save to local storage
function enterPlayerName() {
  let player = prompt("Enter you name to be on the Score Board");
  if (!player) {
    playerName = "Mystery";
  } else {
    playerName = player;
  }
}

function scoreCalculator() {
  if (displaySpeed <= 200) {
    score = +level * 200;
  } else if (displaySpeed <= 400) {
    score = +level * 150;
  } else if (displaySpeed <= 600) {
    score = +level * 100;
  } else {
    score = +level * 50;
  }
}

function addToScoreArray() {
  let player1 = { playerName, score };
  topFiveScore.push(player1);
}

function sortScore() {
  topFiveScore.sort(function (a, b) {
    return b.score - a.score;
  });
}

function onlyTopFive() {
  if (topFiveScore.length >= 5) {
    topFiveScore.length = 5;
  }
}

function displayTopFive() {
  const listEl = document.querySelector("ol");
  sortScore();
  onlyTopFive();
  listEl.innerHTML = "";
  topFiveScore.forEach(function (e) {
    let list = document.createElement("li");
    let displayScore = `${e.playerName} ${e.score}`;
    list.innerText = displayScore;
    listEl.appendChild(list);
  });
}

function stringNStoreScore() {
  let str = JSON.stringify(topFiveScore);
  localStorage.setItem("TopScores", str);
}

function deStringNRetriveScore() {
  topFiveScore = JSON.parse(localStorage.getItem("TopScores")) || [];
}

// adjust speed per level
function adjustSpeed() {
  if (level % 2 == 0 && displaySpeed >= 180) {
    displaySpeed = displaySpeed - displaySpeed / 10;
  }
  if (displaySpeed < 180) {
    displaySpeed = 180;
  }
}

// when lose notification
function whenLose() {
  alert("You Lose");
  enterPlayerName();
}
