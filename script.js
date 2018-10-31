let today = new Date();

let monthBtn = document.querySelector("#month");
let dateBtn = document.querySelector("#date");
let yearBtn = document.querySelector("#year");
let timeBtn = document.querySelector("#time");
let fullBtn = document.querySelector("#full-date");
let display = document.querySelector("#headline");

let month = today.getMonth() + 1;

let monthTitle = "";

let day = today.getDate();

let dayTitle = "";

let year = today.getFullYear();

switch (month) {
  case 1:
    monthTitle = "January";
    break;
  case 2:
    monthTitle = "February";
    break;
  case 3:
    monthTitle = "March";
    break;
  case 4:
    monthTitle = "April";
    break;
  case 5:
    monthTitle = "May";
    break;
  case 6:
    monthTitle = "June";
    break;
  case 7:
    monthTitle = "July";
    break;
  case 8:
    monthTitle = "August";
    break;
  case 9:
    monthTitle = "September";
    break;
  case 10:
    monthTitle = "October";
    break;
  case 11:
    monthTitle = "November";
    break;
  case 12:
    monthTitle = "December";
    break;
  default:
    monthTitle = "Error!";
}

if (day === 1 || day === 21 || day === 31) {
  dayTitle = day + "st";
} else if (day === 2 || day === 22) {
  dayTitle = day + "nd";
} else if (day === 3 || day === 23) {
  dayTitle = day + "rd";
} else {
  dayTitle = day + "th";
}

monthBtn.onclick = function() {
  display.innerHTML = `The month is ${monthTitle}`;
};

dateBtn.onclick = function() {
  display.innerHTML = `Today is the ${dayTitle} of the month`;
};

yearBtn.onclick = function() {
  display.innerHTML = `The year is ${year}`;
};

timeBtn.onclick = function() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let fullTime = "";

  if (hours > 12) {
    fullTime = `${hours - 12}:${minutes} PM`;
  } else if (hours === 0) {
    fullTime = `${hours + 12}:${minutes} AM`;
  } else if (hours === 12) {
    fullTime = `${hours}:${minutes} PM`;
  } else {
    fullTime = `${hours}:${minutes} AM`;
  }

  display.innerHTML = `The time is ${fullTime}`;
};

fullBtn.onclick = function() {
  let rightNowDate = new Date();
  display.innerHTML = `It is ${rightNowDate}`;
};
