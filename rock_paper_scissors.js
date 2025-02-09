const rockPaperScissors = ['rock', 'paper', 'scissors'];
let humanScore = 0;
let computerScore = 0;
let humanChoice;
const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorBtn = document.getElementById("scissorBtn");
const humanScoreText = document.getElementById("humanScoreText");
const computerScoreText = document.getElementById("computerScoreText");
const resultText = document.getElementById("results")


function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * rockPaperScissors.length);
    return rockPaperScissors[randomIndex];
}

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        console.log("Tie");
    } else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        humanScore++;
    } else {
        computerScore++;
    }
    humanScoreText.innerHTML = "Human Score: " + humanScore;
    computerScoreText.innerHTML = "Computer Score: " + computerScore;
}

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    setTimeout(() => {
        resultText.innerHTML = 'Choose Rock Paper or Scissor below';
        humanScoreText.innerHTML = "Human Score: " + humanScore;
        computerScoreText.innerHTML = "Computer Score: " + computerScore;
    }, 3000); // Reset the game after 3 seconds
}

const computerChoice = getComputerChoice();

rockBtn.onclick = function () {
    humanChoice = 'rock';
    const computerChoice = getComputerChoice();
    playRound(humanChoice, computerChoice);
    resultText.innerHTML = "Computer played: " + computerChoice + " //// " + "You played: " + humanChoice;
    if (humanScore === 3 || computerScore === 3) {
        if (computerScore === 3) {
            resultText.innerHTML = "GAME OVER YOU LOSE"
            resetGame()
        } else {
            resultText.innerHTML = "GAME OVER YOU WIN"
            resetGame()
        }
    }
}

paperBtn.onclick = function () {
    humanChoice = "paper";
    const computerChoice = getComputerChoice();
    playRound(humanChoice, computerChoice);
    resultText.innerHTML = "Computer played: " + computerChoice + " //// " + "You played: " + humanChoice;
    if (humanScore === 3 || computerScore === 3) {
        if (computerScore === 3) {
            resultText.innerHTML = "GAME OVER YOU LOSE"
            resetGame()
        } else {
            resultText.innerHTML = "GAME OVER YOU WIN"
            resetGame()
        }
    }

};

scissorBtn.onclick = function () {
    humanChoice = "scissors";
    const computerChoice = getComputerChoice();
    playRound(humanChoice, computerChoice);
    resultText.innerHTML = "Computer played: " + computerChoice + " //// " + "You played: " + humanChoice;
    if (humanScore === 3 || computerScore === 3) {
        if (computerScore === 3) {
            resultText.innerHTML = "GAME OVER YOU LOSE"
            resetGame()
        } else {
            resultText.innerHTML = "GAME OVER YOU WIN"
            resetGame()
        }
    }

};


// Function to fetch scores from the API
async function fetchScores() {
    const response = await fetch('http://127.0.0.1:5000/api/scores');
    const parsedData = await response.json(); // No need for JSON.parse() here
    humanScoreText.innerHTML = "Human Score: " + parsedData["Human Score"];
    computerScoreText.innerHTML = "Computer Score: " + parsedData["Computer Score"];
    humanScore = parsedData["Human Score"]
    computerScore = parsedData["Computer Score"]
}


document.getElementById('loadScoreBtn').addEventListener('click', fetchScores);



// Function to send scores to API
async function saveScores() {
    const newScores = {
        "Computer Score": computerScore,
        "Human Score": humanScore,
    };

    await fetch('http://127.0.0.1:5000/api/scores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newScores),
    });
}

document.getElementById('saveScoreBtn').addEventListener('click', saveScores);
