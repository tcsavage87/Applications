let total = 0;
let input1 = document.querySelector('#numberInput1');
let input2 = document.querySelector('#numberInput2');
let header = document.querySelector('#screen');
let operators = document.querySelectorAll('.operator');
let clearButton = document.querySelector('#clear');
let form = document.querySelector('form');

function reset() {
  form.reset();
  header.textContent = 'Ready to Calculate!';
}

clearButton.addEventListener('click', reset);

function operate(e) {
  const operand = e.target.dataset.operand;
  console.log(operand);
  let [num1, num2] = [parseFloat(input1.value), parseFloat(input2.value)];
  // Check it both number fields contain numbers
  if (!num1 || !num2) {
    header.textContent = 'Please input both numbers!';
    return;
  }
  const total = eval(`${num1}${operand}${num2}`);
  header.textContent = `The total is ${total}`;
  input1.value = total;
  input2.value = '';

}

operators.forEach(operator => {
  operator.addEventListener('click', function(e) {
    e.preventDefault();
    operate(e);
  });
})
