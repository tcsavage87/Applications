// Fill out your name and click submit to receive your Pirate Name

// Two input fields for First and Last Name || One Input FIeld for both names

// Submit button - when clicked display text "Your pirate name is :  {pirateName}"

// onSubmit 
	// Pull data from input fields
	// Validate strings a-z, only two names - if multiple just use first two
	// Determine First letter of each name
	// refer to first and last name arrays containing pirate names
	// match letters to pull pirate names and display text in DOM


const submitButton = document.querySelector('#submit-button');
const inputField = document.querySelector('#name');
const result = document.querySelector('#result');

const pirateFirstNames = ['Ahab', 'Bennie', 'Carlota', 'Denny'];
const pirateLastNames = ['Ahoy', 'Baba', 'Coco', 'Doyle'];
let pirateFirstName;
let pirateLastName;

function retrieveName(e) {
	e.preventDefault();
	const name = inputField.value.split(' ');
	if (name.length > 2) {
		name.splice(2, name.length);
	} else if (name.length < 2) {
		return;
	}
	const firstNameLetter = name[0][0].toUpperCase();
	const lastNameLetter = name[1][0].toUpperCase();
	console.log(firstNameLetter, lastNameLetter);

	for (let i=0; i < pirateFirstNames.length; i++) {
		if (pirateFirstNames[i][0] === firstNameLetter) {
			pirateFirstName = pirateFirstNames[i];
		}
		if (pirateLastNames[i][0] === lastNameLetter) {
			pirateLastName = pirateLastNames[i];
		}
	}
	console.log(pirateFirstName, pirateLastName);
	result.textContent = `Your pirate name is: ${pirateFirstName} ${pirateLastName}!`;
	inputField.value = '';
}

submitButton.addEventListener('click', function(e) {
	retrieveName(e);
})