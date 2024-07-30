
const keybordDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModel = document.querySelector(".game-model");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    //reseting all variables and ui elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `imgs/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keybordDiv.querySelectorAll("button").forEach(btn => btn.disabled= false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModel.classList.remove("show");
}

const getRandomWord= ()=> {
    const { word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
    
}

    const gameOver = (isVictory) =>{
        // after 600ms of game complete showing model with relavant deatails
        setTimeout(() => {
            const modelText = isVictory ? `You Found The Word:`: `The Correct Word Was:`;
            gameModel.querySelector("img").src = `imgs/${isVictory ? 'Victory' : 'Lost'}.gif`;
            gameModel.querySelector("h4").innerHTML = `${isVictory ? 'Congrates!' : 'Game Over!'}`;
            gameModel.querySelector("p").innerHTML = `${modelText} <b>${currentWord}</b>`;
            gameModel.classList.add("show");
        }, 300);
    }

 const initGame = (button, clickedLetter) => {
    // checking if clickedLetter is exist on the currentword
    if(currentWord.includes(clickedLetter)){
        //showing all corrent letters on the word display
        [...currentWord].forEach((letter, index) =>{
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerHTML = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })

    }
    else{
        // if click letter does not exist then update the wronGuessCount and hangman image
        wrongGuessCount ++;
        hangmanImage.src = `imgs/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

//creating the dynamic buttons
for(let i=97;i<123;i++){
    const button = document.createElement("button");
    button.innerHTML=String.fromCharCode(i);
    keybordDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target,String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click",getRandomWord);