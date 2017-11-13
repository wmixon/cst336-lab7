var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
var selectedWord = "";
var selectedHint = "";
var board = "";
var remainingGuesses = 6;
var words = [   {word: "snake", hint: "It's a reptile"},
                {word: "monkey", hint: "It's a mammal"},
                {word: "beetle", hint: "It's an insect"}];
var firstTime = true;
                

// Begin the game whent he page is fully loaded
window.onload = startGame();

function startGame(){
    pickWord();
    initBoard();
    updateBoard();
    createLetters();
}

function pickWord(){
    var randomInt = Math.floor(Math.random() * words.length);
    selectedWord = words[randomInt].word.toUpperCase();
    selectedHint = words[randomInt].hint;
}

function initBoard(){
    for(var letter in selectedWord){
        board += '_';
    }
}



function updateBoard(){
    $("#word").empty();
    
    for (var letter of board){
        document.getElementById("word").innerHTML += letter + " ";
    }
    
    $("#word").append("<br />");
    //$("#word").append("<span class='hint'>Hint: " + selectedHint + "</span>");
}

$("letterBtn").click(function(){
    var boxVal = $("#letterBox").val();
})

//Creates the letter inside the letters div
function createLetters(){
    for(var letter of alphabet){
        $("#letters").append("<button class='letter' id='" + letter + "'>" + letter + "</button>");
    }
}

$(".letter").click(function(){
    checkLetter($(this).attr("id"));
    disableButton($(this));
})

//Checks to see if the selected letter exists in the selectedWord
function checkLetter(letter){
    var positions = new Array();
    
    // Put all the positions the letter exists in an array
    for (var i = 0; i < selectedWord.length; i++){
        if (letter == selectedWord[i]){
            positions.push(i);
        }
    }
    
    if (positions.length > 0) {
        updateWord(positions, letter);
        
        // Check to see if this is a winning guess
        if (!board.includes('_')) {
            endGame(true);
        }
    } else {
        remainingGuesses -= 1;
        updateMan();
    }
    
    if (remainingGuesses <= 0) {
        endGame(false);
    }
}

// Update the current word then calls for a board update
function updateWord(positions, letter) {
    for (var pos of positions) {
        board = replaceAt(board, pos, letter)
    }
    
    updateBoard();
}

// Helper function for replacing specific indexes in a string
function replaceAt(str, index, value){
    return str.substr(0, index) + value + str.substr(index + value.length);
}

// Calculates and updates the image for our stick man
function updateMan() {
    $("#hangImg").attr("src", "img/stick_" + (6 - remainingGuesses) + ".png");
}

// Ends the game by hiding game divs and displaying the win or loss divs
function endGame(win) {
    $("#letters").hide();
    
    if(win) {
        $('#won').show();
    } else {
        $('#lost').show();
    }
}

$(".replayBtn").on("click", function() {
    location.reload();
});

// Disables the button and changes the style to tell the user it's disabled
function disableButton(btn) {
    btn.prop("disabled", true);
    btn.attr("class", "btn btn-danger");
}

function hint(){
    if (firstTime){
        firstTime = false;
        $("#word").append("<span class='hint'>Hint: " + selectedHint + "</span>");
    }

}