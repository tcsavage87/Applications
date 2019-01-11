const clearButton = document.querySelector('#clear');
const numbers = document.querySelectorAll('.number');
const screen = document.querySelector('#screen');
const operators = document.querySelectorAll('.operator');
const equalButton = document.querySelector('#equals')


// Clear button functionality - 

clearButton.addEventListener('click', () => screen.textContent = '');

// Display numeric input on number button click

function display(e) {
  const input = e.target.dataset.number;
  screen.textContent += input;
}

numbers.forEach(number => {
  number.addEventListener('click', function(e) {
    e.preventDefault();
    display(e);
  });
});

// Include operator on display when clicked

function store(e) {
  const operator = e.target.dataset.operand;
  screen.textContent += operator;
}

operators.forEach(operator => {
  operator.addEventListener('click', function(e) {
    e.preventDefault();
    store(e);
  });
});

// Equals button functionality - Display total when clicked

equalButton.addEventListener('click', function(e) {
  e.preventDefault();
  screen.textContent = eval(screen.textContent);
})