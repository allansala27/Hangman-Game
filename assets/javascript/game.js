// 30 teams
var teams = ["hawks", "celtics", "nets", "hornets", "bulls", "cavaliers", "mavericks", "nuggets", "pistons", "warriors", "rockets", "pacers", "clippers", "lakers", "grizzlies", "heat", "bucks", "timberwolves", "pelicans", "knicks", "thunder", "magic", "seventy sixers", "suns", "trail blazers", "kings", "spurs", "raptors", "jazz", "wizards"];

//random team
var randomTeam = "";

//empty array for team to be guessed
var guessTeam = [];

//store number of letters in word
var numLetters = 0;

//tracks progress on current game
var currentGame = [];

//stores incorrect letters
var wrongGuesses = [];

//Amount of chances to guess word
var numLives = 9;

//loss and win counters
var losses = 0;
var wins = 0;

function newGame (){
	//Use random word and replace each letter with a " - " and send to html doc
	currentGame = [];
	wrongGuesses = [];
	
	randomTeam = teams[Math.floor(Math.random() * teams.length)];
	guessTeam = randomTeam.split("");
	numLetters = randomTeam.length;

	//for loop too push dashes into guessTeam array
	for (var i = 0; i < numLetters; i++) {
		currentGame.push(" __ ");
	}
}

function guessAndCheck (userGuess) {
	//Takes the letter the user guesses to check if it is in the word
	//Correct guesses reveals letter
	//Wrong guesses decreases numLives
	//Both actions store the letters in either correctGuesses or wrongGuesses

	var letterBool = false

	for (var i = 0; i < numLetters; i++) {
		if (guessTeam[i] === userGuess){
			letterBool = true;
		}
	}

	if (letterBool){
		for (var i = 0; i < numLetters; i++) {
			if (guessTeam[i] === userGuess){
				currentGame[i] = userGuess;
			}
		}
	}	
	else {
		numLives--;
		wrongGuesses.push(userGuess);
		for (i = 0; i < wrongGuesses.length; i++){
			if (userGuess === wrongGuesses[i]){
				wrongGuesses.splice(i, 1);
			}
		}
		console.log(guessTeam);
	}		
}	

function displayHTML () {
	// //Displays all current info to the html doc
	document.getElementById("new-game").innerHTML = currentGame.join(" ").toUpperCase();
	document.getElementById("lives").innerHTML = "0:0" + numLives + " SECONDS LEFT!";
	document.getElementById("letters-used").innerHTML = "Letters used: " + wrongGuesses.join(" ");

	if (currentGame === guessTeam) {
		wins++;
		alert("YOU BEAT THE " + randomTeam.toUpperCase() + " !");
		document.getElementById("win-counter").innerHTML = wins;
		newGame();
	}
	else if (numLives === 0){
		losses++;
		document.getElementById("loss-counter").innerHTML = losses;
		alert("YOU MISSED THE GAME WINNING SHOT!");
		newGame();

	}




}
newGame();


document.onkeyup = function(chooseLetter) {
	//takes in letter and passes it to guessAndCheck function

	//converts letter chosen into a lowercase letter
	var userLetter = String.fromCharCode(chooseLetter.keyCode).toLowerCase();
	guessAndCheck(userLetter);
	displayHTML();
}