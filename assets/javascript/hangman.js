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

let word = "";
let index = 0;

let hiddenWord = [];

// sets up the stats for hangman
function initializeGame() {
    let wordElement = document.getElementById("word");

    index = Math.floor(Math.random() * words.length);
    word = words[index];

    for(let i in word.split("")) {
        hiddenWord.push("_");
    }

    wordElement.textContent = hiddenWord.join(" ");
}

// renders the word in the browser after every key press
document.addEventListener("keyup", event => {
    
    if (word.indexOf(event.key) > -1) {

        // loop through the array
        // for each character in the array
        // replace the hidden character with the key pressed

        for (let i in word) {
            if (word.charAt(i) === event.key) {
                hiddenWord[i] = word.charAt(i);
                console.log("index " + i + " character " + word.charAt(i));
            }
        }

        document.getElementById("word").textContent = hiddenWord.join(" ");

        if (hiddenWord.indexOf("_") < 0) {
            document.getElementById("win-text").textContent = "Congratulations, you win!";
        }
    }
});


initializeGame();
// console.log(words);
// console.log(index);
// console.log(word);

// render the game