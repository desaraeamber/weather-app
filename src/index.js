//In your project, display the current date and time using JavaScript: Tuesday 16:00
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

//let hours = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
let hour = now.getHours();
let minute = now.getMinutes();

let timeDate = document.querySelector("#date-time");
timeDate.innerHTML = day + " " + hour + ":" + minute;

//Search city and display city name & current temp
function searchEngine(city) {
  let apiKey = "6bbab2b3b0c97103f3d9e1c12e1a2914";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

//Show city name
function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#form-input");
  let cityName = document.querySelector("#city-name");
  event.preventDefault();
  cityName.innerHTML = `${city.value}`;
  searchEngine(city.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", showCity);

//Show temperature

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let degrees = document.querySelector(".temp");
  degrees.innerHTML = `${temp}`;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
}

//BONUS: Allow current button to display current position temp and name

function currentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let apiKey = "6bbab2b3b0c97103f3d9e1c12e1a2914";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

let currentButton = document.querySelector(".current");
currentButton.addEventListener("click", currentPosition);
