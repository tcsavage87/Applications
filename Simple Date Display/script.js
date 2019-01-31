// Button and display retrieval from document

const monthBtn = document.querySelector("#month");
const dateBtn = document.querySelector("#date");
const yearBtn = document.querySelector("#year");
const timeBtn = document.querySelector("#time");
const fullBtn = document.querySelector("#full-date");
const display = document.querySelector("#headline");

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Month function and event listener for Month button

function convertMonth() {
  const today = new Date();
  // Pass month value into monthNames array to retrieve full name
  const month = monthNames[today.getMonth()];
  console.log(month);
  display.textContent = `The month is ${month}!`;
}

monthBtn.addEventListener('click', convertMonth);

// Year function and event listener

function getYear() {
  const today = new Date();
  const year = today.getFullYear();
  display.textContent = `The year is ${year}`;
}

yearBtn.addEventListener('click', getYear);

// Full date function and event listener

function getFullDate() {
  const now = new Date();
  display.textContent = `It is currently ${now}`;
}

fullBtn.addEventListener('click', getFullDate);

function getDate() {
  const today = new Date();
  let day = today.getDate();
  const first = RegExp('1$');
  const second = RegExp('2$');
  const third = RegExp('3$');
  const tenth = RegExp('0$');
  if (first.test(day)) {
    day = `${day}st`;
  } else if (second.test(day)) {
    day = `${day}nd`;
  } else if (third.test(day)) {
    day = `${day}rd`;
  } else if (tenth.test(day)) {
    day = `${day}th`;
  }
  display.textContent = `Today is the ${day} day of the month`;
}

dateBtn.addEventListener('click', getDate);

function getTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const convertedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  if (hours > 0 && hours < 12) {
    fullTime = `${hours}:${convertedMinutes} AM`;
  } else if (hours === 12) {
    fullTime = `${hours}:${convertedMinutes} PM`;
  } else {
    hours > 12 ? fullTime = `${hours - 12}:${convertedMinutes} PM` : fullTIme = `${hours + 12}:${convertedMinutes} AM`;
  }
  display.textContent = `The time is ${fullTime}`;
}

timeBtn.addEventListener('click', getTime);

