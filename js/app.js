const colors = ["yellow", "red", "green", "blue"];
let sequences = [];
let playerGuess = [];
let Level
let root = document.querySelector("#root");
let resetBtn = document.querySelector("#Start");
let colorBtns = document.querySelectorAll(".btn");
let guessCount = 0;
let speedBar = document.getElementById("speedRange");
let displaySpeed = speedBar.value;
let disapperSpeed = displaySpeed - 200;

speedBar.oninput = function () {
  displaySpeed = this.value;
};
//call basic function when page load
disableColorBtns();
setRootRunning();
//event listener 
colorBtns.forEach((button) => {
  button.addEventListener("click", testColor);
});
resetBtn.addEventListener("click", resetGame);

function addSequence() {
  sequences.push(colors[Math.floor(Math.random() * 4)]);
}

function displayLevel() {
  document.querySelector("h3").innerText = `Level: ${level}`;
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
}

function testColor(e) {
  if (e.target.id === sequences[guessCount]) {
    guessCount++;
    playerGuess.push(e.target.id);
    if (playerGuess.length === sequences.length) {
      level += 1;
      displayLevel();
      startLevel();
    }
  } else {
    alert("haha you got it wrong");
    enableResetButton();
    disableColorBtns();
    setRootRunning();
    enableSpeedBar();
    resetLevel();
  }
}
