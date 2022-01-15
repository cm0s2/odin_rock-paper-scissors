"use strict";

function computerPlay() {
    // Generate a random number between 0 and 2
    let computerChoice = Math.floor(Math.random() * 3);

    if (computerChoice === 0) return 'Rock';
    else if (computerChoice === 1) return 'Paper';
    else return 'Scissors';
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    // console.table({playerSelection: playerSelection, computerSelection: computerSelection});

    switch (true) {
        // Lose conditions with fall-through
        case playerSelection === 'rock' && computerSelection === 'paper':
        case playerSelection === 'paper' && computerSelection === 'scissors':
        case playerSelection === 'scissors' && computerSelection === 'rock':
            return `You lose! ${computerSelection} beats ${playerSelection}`;
        // Tie conditions
        case playerSelection === computerSelection:
            return `It's a tie! You both chose ${playerSelection}`
        // Win condition
        default:
            return `You win! ${playerSelection} beats ${computerSelection}`;
    }
}


let playerScore = 0;
let computerScore = 0;
let rounds = 0;

function updateStatus(statusMessage) {
    const statusElement = document.querySelector('#status');
    statusElement.textContent = statusMessage;
}

function updatePoints() {
    const playerP = document.querySelector("#player-points");
    const computerP = document.querySelector("#computer-points");

    playerP.textContent = playerScore;
    computerP.textContent = computerScore;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    rounds = 0;
    updatePoints();
    updateStatus('Make your choice! 😃');
}

function pressBtn(e) {

    // TODO: Add reset game logic
    if (rounds === 5) return;

    rounds++;

    const playerSelection = e.target.value;
    const computerSelection = computerPlay();

    let statusMessage = playRound(playerSelection, computerSelection);
    if (statusMessage.startsWith('You win!')) playerScore++;
    else if (statusMessage.startsWith('You lose')) computerScore++;

    // Game Over logic
    if (rounds === 5) {
        statusMessage += '. Game over! ';
        if (playerScore > computerScore) {
            statusMessage += `You won with ${playerScore} - ${computerScore}`;
        } else if (computerScore > playerScore) {
            statusMessage += `You lost with ${playerScore} - ${computerScore}`;
        } else {
            statusMessage += `You tied with ${playerScore} - ${computerScore}`
        }
    }

    updatePoints();
    updateStatus(statusMessage);
}



const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', pressBtn);
});

const reset = document.querySelector("#restart")
reset.addEventListener('click', resetGame);