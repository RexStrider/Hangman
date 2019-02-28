// words to randomly select for the game
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

// the word to be selected
let word = "";

// index of the selected word
let index = 0;

// number of times the player has won the game
let wins = 0;

// the selected word, but all characters will be replaced with '_'
let hiddenWord;

// an array of all of the characters the user has selected durring the current session
let lettersGuessed;

// used to keep track of the automatic timed reset after the game is finished
let intervalId;

// audio file to play when the user selects the correct letter
let audio = new Audio("assets/sounds/temple-bell.mp3");

// starts the game
function initializeGame() {
    // makes sure the game stops reseting
    clearInterval(intervalId);
    
    // clears the hidden word and letters guessed during a previous session
    hiddenWord = [];
    lettersGuessed = [];

    // retrieve the element that will display the hidden word
    let wordElement = document.getElementById("word");

    // select a random word from the list
    index = Math.floor(Math.random() * words.length);
    word = words[index];

    // push as many '_' characters as there are words in the chosen word
    for(let i in word.split("")) {
        hiddenWord.push("_");
    }

    // display the hidden word to the screen
    wordElement.textContent = hiddenWord.join(" ");

    // re-initializes the game text on the main web page
    document.getElementById("guessed-letters").textContent = "";
    document.getElementById("win-text").textContent = "";
    document.getElementById("new-game-text").textContent = "";
}

// renders the word in the browser after every key press
document.addEventListener("keyup", event => {

    // normalizes the input to lower case
    let eventKey = event.key.toLowerCase();

    // determines if the key pressed was part of the alphabet, and if the key has not been guessed yet, otherwise we ignore the key event
    if (eventKey.length === 1 && isAlpha(eventKey) && lettersGuessed.indexOf(eventKey) < 0) {

        // push the key to the list of guessed letters
        lettersGuessed.push(eventKey);
        console.log("pushed key " + eventKey + " to the letters guessed array");

        // display the guessed letters to the web page
        document.getElementById("guessed-letters").textContent = lettersGuessed.join(" ");

        // determines if the key pressed is in the word
        if (word.indexOf(eventKey) > -1) {

            // plays the sound of a temple bell on a successful guess
            audio.currentTime = 0;
            audio.play();
    
            // displays the letter guessed within the hidden word and displays it on the web page
            for (let i in word) {
                if (word.charAt(i) === eventKey) {
                    hiddenWord[i] = word.charAt(i);
                }
            }
            document.getElementById("word").textContent = hiddenWord.join(" ");

            // determines if the game is over
            if (hiddenWord.indexOf("_") < 0) {

                // tally the win
                wins++;
                document.getElementById("win-score").textContent = "wins: " + wins;

                // congratulate the user
                document.getElementById("win-text").textContent = "Congratulations, you win!";

                // inform them that a new game will be starting soon
                document.getElementById("new-game-text").textContent = "A new game will start in just a moment";
                
                // start the game in 5 seconds
                intervalId = setInterval(initializeGame, 5 * 1000);
            }
        }
    }

});

// determines if the first letter of the string is in the alphabet
function isAlpha(letter) {
    return /[a-zA-Z]/.test(letter);
}

// starts the game!
initializeGame();
