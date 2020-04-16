/*
    COLOR GAME
*/
var squares = document.querySelectorAll(".square"); // List of colored squares
var colorDisplay = document.getElementById("colorDisplay"); // color to be found RGB(X ,Y, Z)
var heading = document.querySelector("h1"); // Heading
var messageDisplay = document.getElementById("message");

// Restart game by picking new colors
var restartBtn = document.getElementById("restart")

// Difficulty settings
var hardButton = document.getElementById("hard");
var easyButton = document.getElementById("easy");

// This function will generate a random color 
function randomColorGen() {
    var red = Math.floor(Math.random() * 256 + 0)
    var blue = Math.floor(Math.random() * 256 + 0)
    var green = Math.floor(Math.random() * 256 + 0)
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

// Generate List of colors
function randomColorList(difficulty) {
    var list = [];
    // Adding random colors to colorsList
    for (var i = 0; i < difficulty; i++) {
        var color = randomColorGen();
        list.push(color);
        // console.log(color);
    }
    return list;
}

// This function will randomly pick a color from the list
function randomColorPicker(list) {
    var index = 0;
    if (!isEasy) {
        index = Math.floor(Math.random() * 6 + 0);
    } else if (isEasy) {
        index = Math.floor(Math.random() * 3 + 0);
    }
    return list[index];
}


// This will change the color of the selected square
function changeColors(color) {
    //loop through all squares and change each color
    squares.forEach(element => {
        element.style.background = color;
    });
    //setting heading background
    heading.style.background = color;
}

var easy = 3; // Number of easy colors
var hard = 6; // Number of hard colors
isEasy = false; // State tracker
var colorsList = []; // List of colors, will update accordind to diffficulty
var pickedColor = ""; // selected color to find

//Generate squares with colors according to difficulty
function genColoredSquares(difficulty) {
    if (difficulty == hard) { // Hard Mode
        // update states
        isEasy = false;
        // easyButton.disabled = false;
        // hardButton.disabled = true;
        colorsList = randomColorList(hard);
        pickedColor = randomColorPicker(colorsList);
        colorDisplay.textContent = pickedColor;
        //display 6 squares
        for (var i = 0; i < colorsList.length; i++) {
            squares[i].style.display = "initial";
            squares[i].style.background = colorsList[i];
        }
    } else if (difficulty == easy) { // Easy Mode
        // update states
        isEasy = true;
        // easyButton.disabled = true;
        // hardButton.disabled = false;
        colorsList = randomColorList(easy);
        pickedColor = randomColorPicker(colorsList);
        colorDisplay.textContent = pickedColor;
        // display top 3 squares only
        for (var i = 0; i < colorsList.length; i++) {
            squares[i].style.display = "initial";
            squares[i].style.background = colorsList[i];
        }
        for (var i = 3; i < squares.length; i++) {
            squares[i].style.display = "none";
        }
    }
}

//square click listener
function squareClickListener() {
    squares.forEach(square => {
        square.addEventListener("click", function () {
            //compare clicked color to pickedColor
            var clickedColor = this.style.background;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!"
                restartBtn.textContent = "Play Again?";
                changeColors(clickedColor)
            } else {
                this.style.background = "transparent";
                messageDisplay.textContent = "Try Again!";
            }
        });
    });
}


// This function will reset the game
function restartGame() {
    messageDisplay.textContent = ""; // Reset field
    colorDisplay.textContent = pickedColor; // Reset to one of the new colors
    restartBtn.textContent = "New Colors" // Reset button text
    heading.style.background = "#062563"; // Reset heading background
}

// Restart button click listener
restartBtn.addEventListener("click", function () {
    restartGame();
    if(isEasy) genColoredSquares(easy);
    else genColoredSquares(hard);
});

// Hard button clicked
// We want 6 squares
hardButton.addEventListener("click", function () {
    hardButton.classList.add('selected');
    easyButton.classList.remove('selected');
    restartGame();
    genColoredSquares(hard);
    squareClickListener();
});

// Easy button clicked
// We want 3 squares
easyButton.addEventListener("click", function () {
    easyButton.classList.add('selected');
    hardButton.classList.remove('selected');
    restartGame();
    genColoredSquares(easy);
    squareClickListener();
});

function onStart() {
    genColoredSquares(hard);
    squareClickListener();
}
onStart();