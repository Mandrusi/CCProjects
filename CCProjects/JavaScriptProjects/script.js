let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:
// Function to generate target value at start of each new round
const generateTarget = () => {
    // We want to return a random integer 0 to 9
    const randomNumber = Math.floor(Math.random() * 10);
    // console.log(randomNumber)
    return randomNumber;
}
const compareGuesses = (human, comp, secret) => {
    // we wanna find which value human or comp guess is closer to target
    // best way to do this is probably to take the absolute value of guess - target
    // If human is closer or tied human wins
    if (human > 9 || human < 0) {
        alert('Your number is out of range!');
    }
    if (getAbsoluteDistance(human, secret) <= getAbsoluteDistance(comp, secret)){
        return true;
    }
    // otherwise the computer wins
    else {
        return false;
    }

}
// A helper method to call in compareGuesses

const getAbsoluteDistance = (numOne, numTwo) => {
    return Math.abs(numOne - numTwo);

}

const updateScore = (winner) => {
    if (winner === 'human'){
        humanScore += 1;
    }
    if (winner === 'computer'){
        computerScore += 1;
    }
}

const advanceRound = () => {
    currentRoundNumber += 1;
}

