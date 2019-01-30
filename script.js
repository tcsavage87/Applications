const clearButton = document.querySelector('#clear');
const numbers = document.querySelectorAll('.number');
const screen = document.querySelector('#screen');
const equalButton = document.querySelector('#equals')
const regex = new RegExp(/[0-9]/);

// Create flag to reset screen if number input after equation run

let equalFlag = false;

// Clear button functionality

function clear() {
  screen.textContent = '';
} 

// Display numeric input on number button click

function display() {
  const input = this.dataset.number;
  let isNumber;
  if (regex.test(input) || input.includes('.')) {
    isNumber = true;
  }
  if (equalFlag && isNumber) {
    clear();
  }
  screen.textContent += input;
  equalFlag = false;
}

// Equals button functionality - Display total when clicked

equalButton.addEventListener('click', () => {
  try {
    screen.textContent = eval(screen.textContent);
    equalFlag = true;
  } catch (e) {
    console.error(e);
    screen.textContent = 'ERROR';
    equalFlag = true;
  }
});

clearButton.addEventListener('click', clear);

numbers.forEach(number => number.addEventListener('click', display));