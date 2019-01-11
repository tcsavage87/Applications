let total = 0;
let numberInput1 = document.querySelector('#numberInput1');
let numberInput2 = document.querySelector('#numberInput2');
let header = document.querySelector('#screen');

function reset() {
  numberInput2.value = '';
}

function add() {
  total = eval(numberInput1.value) + eval(numberInput2.value);
  header.innerHTML = total;
  numberInput1.value = total;
  reset();
}

function subtract() {
  total = eval(numberInput1.value) - eval(numberInput2.value);
  header.innerHTML = total;
  numberInput1.value = total;
  reset();
}

function multiply() {
  total = eval(numberInput1.value) * eval(numberInput2.value);
  header.innerHTML = total;
  numberInput1.value = total;
  reset();
}

function divide() {
  total = eval(numberInput1.value) / eval(numberInput2.value);
  header.innerHTML = total;
  numberInput1.value = total;
  reset();
}

function empty() {
  total = 0;
  document.querySelector('#screen').innerHTML = 'Ready to Calculate!';
  numberInput1.value = '';
}
