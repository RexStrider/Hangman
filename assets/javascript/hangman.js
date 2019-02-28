let words = [
    "banana",
    "mango",
    "apple",
    "pear",
    "guano",
    "vanilla",
    "bully",
    "fanatic",
    "rubber",
    "duck",
    "onomatopoeia"
];

let intervalId;

let word = "";
let index = 0;

let hiddenWord;

let lettersGuessed;

// sets up the stats for hangman
function initializeGame() {
    clearInterval(intervalId);
    
    hiddenWord = [];
    lettersGuessed = [];

    let wordElement = document.getElementById("word");

    index = Math.floor(Math.random() * words.length);
    word = words[index];

    for(let i in word.split("")) {
        hiddenWord.push("_");
    }

    wordElement.textContent = hiddenWord.join(" ");

    document.getElementById("guessed-letters").textContent = "";
    document.getElementById("win-text").textContent = "";
    document.getElementById("new-game-text").textContent = "";
}

// renders the word in the browser after every key press
document.addEventListener("keyup", event => {
    console.log(event.key);

    let eventKey = event.key.toLowerCase();

    // the letter has not been guessed
    if (eventKey.length === 1 && isAlpha(eventKey) && lettersGuessed.indexOf(eventKey) < 0) {

        lettersGuessed.push(eventKey);
        console.log("pushed key " + eventKey + " to the letters guessed array");
        document.getElementById("guessed-letters").textContent = lettersGuessed.join(" ");

        if (word.indexOf(eventKey) > -1) {
    
            for (let i in word) {
                if (word.charAt(i) === eventKey) {
                    hiddenWord[i] = word.charAt(i);
                    console.log("index " + i + " character " + word.charAt(i));
                }
            }
    
            document.getElementById("word").textContent = hiddenWord.join(" ");

            if (hiddenWord.indexOf("_") < 0) {
                document.getElementById("win-text").textContent = "Congratulations, you win!";

                document.getElementById("new-game-text").textContent = "A new game will start in just a moment";
                intervalId = setInterval(initializeGame, 5 * 1000);
            }
        }
    }

    
});

function isAlpha(letter) {
    return /[a-zA-Z]/.test(letter);
}

initializeGame();
// console.log(words);
// console.log(index);
// console.log(word);

// render the game