const colors = ["yellow", "red", "green", "blue"];
let sequences = [];
let playerGuess = [];
let level = 1;
let root = document.querySelector("#root");
let resetBtn = document.querySelector("#reset");
let colorBtns = document.querySelectorAll(".btn");
let guessCount = 0;

colorBtns.forEach((button) => {
    button.addEventListener("click", testColor);
});
resetBtn.addEventListener("click", resetGame);

function addSequence() {
    sequences.push(colors[Math.floor(Math.random() * 4)]);
}

function displaySequences(callbackFunction) {
  sequences.forEach((color, index) => {
    let node = document.querySelector(`#${color}`);
    setTimeout(() => {
      node.classList.add("displaySequence")
      setTimeout(() => {
        node.classList.remove("displaySequence")
        if (index === sequences.length - 1){
            callbackFunction()
        }
      }, index + 1 * 800);
    }, index * 1000);
  })
}

function clearGuesses() {
    guessCount = 0;
    playerGuess.length = 0;
}

function enableResetButton () {
    resetBtn.disabled = false;
}

function disableResetButton () {
    resetBtn.disabled = true;
}

function resetGame() {
    level = 1 // reset level
    sequences.length = 0 // reset sequences
    disableResetButton()
    startLevel()
}

function setRootRunning() {
    root.classList.remove("stopped")
    root.classList.add("running")
}

function setRootStop() {
    root.classList.remove("running")
    root.classList.add("stopped")
}

function disableColorBtns() {
    colorBtns.forEach(colorBtn => {
        colorBtn.disabled = true;
    })
}

function enableColorBtns() {
    colorBtns.forEach(colorBtn => {
        colorBtn.disabled = false;
    })
}

function runThisSHit() {
    enableColorBtns()
    setRootStop();
}

function startLevel() {
    clearGuesses();
    addSequence();
    setTimeout(() => {
        disableColorBtns();
        // displaySequences(runThisSHit);
        displaySequences(() => {
            enableColorBtns()
            setRootStop();
        });
        setRootRunning()
    }, 1000);

}

function testColor(e) {
    if (e.target.id === sequences[guessCount]) {
        guessCount++;
        playerGuess.push(e.target.id);
        if (playerGuess.length === sequences.length) {
            level = level + 1;
            startLevel();
        }
    } else {
        alert("haha you got it wrong");
        enableResetButton();
    }
}
