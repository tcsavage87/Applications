// Canvas setup

const canvas = document.querySelector('#hangman');
const ctx = canvas.getContext('2d');

ctx.strokeStyle = 'black';

// Draw noose

ctx.beginPath();
ctx.moveTo(175, 125);
ctx.lineTo(175, 75);
ctx.lineTo(300, 75);
ctx.lineTo(300, 350);
ctx.lineTo(275, 375);
ctx.moveTo(100, 375);
ctx.lineTo(300, 375);
ctx.lineTo(300, 350);
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
	ctx.arc(175, 145, 20, 0, 2 * Math.PI);
	ctx.stroke();
	headDrawn = true;
}

function drawTorso() {
	if (torsoDrawn) {
		drawArms();
	}
	ctx.beginPath();
	ctx.moveTo(175, 165);
	ctx.lineTo(175, 265);
	ctx.stroke();
	torsoDrawn = true;
}

function drawArms() {
	if (!arm1Drawn && !arm2Drawn) {
		ctx.beginPath();
		ctx.moveTo(175, 210);
		ctx.lineTo(130, 175);
		ctx.stroke();
		arm1Drawn = true;
	} else if (arm1Drawn && !arm2Drawn) {
		ctx.beginPath();
		ctx.moveTo(175, 210);
		ctx.lineTo(220, 175);
		ctx.stroke();
		arm2Drawn = true;
	} else if (arm1Drawn && arm2Drawn) {
		drawLegs();
	}
}

function drawLegs() {
	if (!leg1Drawn) {
		ctx.beginPath();
		ctx.moveTo(175, 265);
		ctx.lineTo(130, 300);
		ctx.stroke();
		leg1Drawn = true;
	} else {
		ctx.beginPath();
		ctx.moveTo(175, 265);
		ctx.lineTo(220, 300);
		ctx.stroke();
		bodyComplete = true;
	}
}

// Word Blank build out

const blankRow = document.querySelector('#wordRow');

const words = ['dog', 'cat', 'boy', 'girl', 'puppy', 'hybrid', 'education'];

let randomWord = words[Math.floor(Math.random() * words.length)]
	.split('');

console.log(randomWord);

for (let i = 0; i < randomWord.length; i++) {
	randomWord[i] = randomWord[i].toUpperCase();
	console.log(randomWord[i]);
	let blank = document.createElement('td');
	blank.setAttribute("data-count", randomWord[i]);
	blankRow.appendChild(blank);
}

//let blanks = document.querySelector('td[')

// Guesses

const guessButton = document.querySelector('#guessButton');
const guessInput = document.querySelector('#guess');
const regex = new RegExp(/[A-Z]/);

const header = document.querySelector('#guessHeader');
const guessRow = document.querySelector('#guessRow')

const guesses = [];

// Retrieve User Guess Input

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
	guesses.push(letter);
	console.log(guesses);
	guessInput.value = '';

	// Add guess to table
	let guess = document.createElement('td');
	guessRow.appendChild(guess);
	guess.textContent = letter;

	// Check if guess is correct

	let correctCount = 0;
	let blanks = document.querySelectorAll('td[data-count]');

	if (randomWord.includes(letter)) {
		blanks.forEach(blank => {
			if (blank.dataset.count === letter) {
				blank.textContent = letter;
				answerCheck.textContent = 'Correct!';
				answerCheck.style.color = 'green';
				blank.style.border = 'none';
			}
		});
	} else {
		drawHead();
		answerCheck.textContent = 'Incorrect!';
		answerCheck.style.color = 'red';
	}

	// Alert results

	if (bodyComplete) {
		answerCheck.textContent = 'You Lose!';
	}
}

// Guess button listener

guessButton.addEventListener('click', function(e) {
	e.preventDefault();
	retrieveLetter();
});
