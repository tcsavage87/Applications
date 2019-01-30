// Canvas setup

const canvas = document.querySelector('#hangman');
const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'black';
ctx.lineWidth = 4;

// Draw noose

ctx.beginPath();
ctx.moveTo(175, 75);
ctx.lineTo(175, 25);
ctx.lineTo(300, 25);
ctx.lineTo(300, 300);
ctx.lineTo(275, 325);
ctx.moveTo(100, 325);
ctx.lineTo(300, 325);
ctx.lineTo(300, 300);
ctx.stroke();

// Hangman contingency flags

let headDrawn = false;
let torsoDrawn = false;
let arm1Drawn = false;
let arm2Drawn = false;
let leg1Drawn = false;
let bodyComplete = false;

// Drawing functions

function drawHead() {
	if (headDrawn) {
		drawTorso();
	}
	ctx.beginPath();
	ctx.arc(175, 95, 20, 0, 2 * Math.PI);
	ctx.stroke();
	headDrawn = true;
}

function drawTorso() {
	if (torsoDrawn) {
		drawArms();
	}
	ctx.beginPath();
	ctx.moveTo(175, 115);
	ctx.lineTo(175, 215);
	ctx.stroke();
	torsoDrawn = true;
}

function drawArms() {
	if (!arm1Drawn) {
		ctx.beginPath();
		ctx.moveTo(175, 160);
		ctx.lineTo(130, 125);
		ctx.stroke();
		arm1Drawn = true;
	} else if (arm1Drawn && !arm2Drawn) {
		ctx.beginPath();
		ctx.moveTo(175, 160);
		ctx.lineTo(220, 125);
		ctx.stroke();
		arm2Drawn = true;
	} else if (arm1Drawn && arm2Drawn) {
		drawLegs();
	}
}

function drawLegs() {
	if (!leg1Drawn) {
		ctx.beginPath();
		ctx.moveTo(175, 215);
		ctx.lineTo(130, 250);
		ctx.stroke();
		leg1Drawn = true;
	} else {
		ctx.beginPath();
		ctx.moveTo(175, 215);
		ctx.lineTo(220, 250);
		ctx.stroke();
		bodyComplete = true;
	}
}

// Word Blank build out

const blankRow = document.querySelector('#wordRow');

const words = ['acres','adult','advice','arrangement','attempt','August','Autumn','border','breeze','brick','calm','canal','cast','chose','claws','coach','constantly','contrast','cookies','customs','damage','deeply','depth','discussion','doll','donkey','essential','exchange','exist','explanation','facing','film','finest','fireplace','floating','folks','fort','garage','grandmother','habit','heading','image','independent','instant','kids','label','lungs','mathematics','melted','memory','mill','mission','monkey','mysterious','neighborhood','nuts','occasionally','official','palace','plates','poetry','policeman','positive','possibly','practical','pride','promise','recall','relationship','remarkable','require','rhyme','rocky','rush','sale','satellites','satisfied','scared','selection','shake','shallow','shout','silly','simplest','slight','slip','slope','soap','solar','species','spin','stiff','swung','tales','thumb','tobacco','toy','trap','treated','tune','university','vapor','vessels','wealth','wolf','zoo'];

let randomWord = words[Math.floor(Math.random() * words.length)]
	.split('');

for (let i = 0; i < randomWord.length; i++) {
	randomWord[i] = randomWord[i].toUpperCase();
	let blank = document.createElement('td');
	blank.setAttribute("data-count", randomWord[i]);
	blankRow.appendChild(blank);
}

// Guesses

const guessButton = document.querySelector('#guessButton');
const guessInput = document.querySelector('#guess');
const regex = new RegExp(/[A-Z]/);

const guessTable = document.querySelector('.guessedLetters');
const header = document.querySelector('#guessHeader');
const guessRow = document.querySelector('#guessRow')

const guesses = [];


// Retrieve User Guess Input
let correctCount = 0;

function retrieveLetter() {
	let label = document.querySelector('label');
	label.classList.remove('alert');
	label.textContent = 'Guess a letter!';
	let answerCheck = document.querySelector('#correct');

	let letter = guessInput.value.toUpperCase();

	// Validate input as alpha
	if (!regex.test(letter) || letter.length > 1) {
		label.textContent = 'One Letter Only Please!';
		label.classList.add('alert');
		guessInput.value = '';
		return;
	}

	// Validate input as new 
	if (guesses.includes(letter)) {
		label.textContent = 'New Letters Only Please!';
		label.classList.add('alert');
		guessInput.value = '';
		return;
	}

	// Add guess to array
	guesses.push(letter);
	console.log(guesses);
	guessInput.value = '';

	// Add guess to table
	let colspan = header.attributes[1].value;
	colspan++;
	header.setAttribute("colspan", `${colspan}`);

	let guess = document.createElement('td');
	let newRow = document.createElement('tr');

	if (guesses.length < 11) {
		guessRow.appendChild(guess);
		guess.textContent = letter;
	} else if (guesses.length === 11) {
		newRow.setAttribute("id", "newRow");
		guessTable.appendChild(newRow);
		newRow.appendChild(guess);
		guess.textContent = letter;

	} else if (guesses.length > 11) {
		document.querySelector('#newRow').appendChild(guess);
		guess.textContent = letter;
	}

	// Check if guess is correct
	let blanks = document.querySelectorAll('td[data-count]');

	if (randomWord.includes(letter)) {
		blanks.forEach(blank => {
			if (blank.dataset.count === letter) {
				blank.textContent = letter;
				answerCheck.textContent = 'Correct!';
				answerCheck.style.color = 'green';
				blank.style.border = 'none';
				correctCount++;
			}
		});
	} else {
		drawHead();
		answerCheck.textContent = 'Incorrect!';
		answerCheck.style.color = '#B10000';
	}

	// Alert results
	if (correctCount === randomWord.length) {
		answerCheck.textContent = 'Congratulations - you win!';
	} else if (bodyComplete) {
		answerCheck.textContent = 'You Lose!';
		for (let i = 0; i < randomWord.length; i++) {
			blanks[i].textContent = randomWord[i];
		}
	}
	console.log(correctCount);
}

// Guess button listener
guessButton.addEventListener('click', function(e) {
	e.preventDefault();
	retrieveLetter();
});

// Reset Button
const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', function(e) {
	e.preventDefault();
	location.reload();
});