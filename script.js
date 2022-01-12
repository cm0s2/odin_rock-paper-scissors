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

    console.table({playerSelection: playerSelection, computerSelection: computerSelection});

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

function game() {
    let playerScore = 0;
    let computerScore = 0;

    for (let i = 0; i < 5; i++) {
        const playerSelection = prompt("What do you choose?");
        // TODO: Input error handling

        const computerSelection = computerPlay();

        const roundResult = playRound(playerSelection, computerSelection);
        if (roundResult.startsWith('You win!')) playerScore++;
        else if (roundResult.startsWith('You lose')) computerScore++;

        console.log(roundResult);
    }

    let gameOverMessage = 'Game over! ';
    if (playerScore > computerScore) {
        gameOverMessage += `You won with ${playerScore} - ${computerScore}`;
    } else if (computerScore > playerScore) {
        gameOverMessage += `You lost with ${playerScore} - ${computerScore}`;
    } else {
        gameOverMessage = `You tied with ${playerScore} - ${computerScore}`
    }

    console.log(gameOverMessage);
}

game();

