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

//Display 12 hour time and double digit mins
let hour = now.getHours();
let minute = now.getMinutes();
minute = minute > 9 ? minute : '0' + minute;
hour = (hour % 12) || 12;
let timeDate = document.querySelector("#date-time");
timeDate.innerHTML = day + " " + hour + ":" + minute;




//Display days for 5-day forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat"
  ];
  return days[day];
}

//Display 5 day forecast
function displayForecast(response) {
  let forecastData = response.data.daily;

  let forecast = document.querySelector("#forecast");
  let forecastHMTL = `<div id="forecast" class="flex">`;
  
  forecastData.forEach(function (forecastDay, index)  {
    if (index < 5) {
    forecastHMTL = forecastHMTL + 
    `
    <section class="next-days">
    <ul>
       <li id="forecast-day">${formatDay(forecastDay.dt)}</li>
         <li><img class="sm-icon" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="60px"></li>
        <li>
          <h4>${Math.round(forecastDay.temp.max)}°</h4>
          <h4 class="gray">${Math.round(forecastDay.temp.min)}°</h4>
         </li> 
     </ul>
     </section>
     `
    }
  });

  forecastHMTL = forecastHMTL + `</div>`;
  forecast.innerHTML = forecastHMTL;
}

//Log coordinates for API forcast
function getForecast(coordinates) {
  let apiKey = "6bbab2b3b0c97103f3d9e1c12e1a2914";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

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
  temp = Math.round(response.data.main.temp);

  let degrees = document.querySelector(".temp");

  degrees.innerHTML = `${temp}`;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
  //Show Description
  let description = document.querySelector("#description");
  let weather = response.data.weather[0].main;
  description.innerHTML = `${weather}`;
  //Show Details
  let humidity = document.querySelector("#humidity")
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  //Show icon
  let icon = document.querySelector(".icon");
  icon.setAttribute(
    "src", 
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);

  }



 let temp = null;

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


searchEngine("New York");