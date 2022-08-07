let now = new Date();
let today = document.querySelector("#current-day");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
today.innerHTML = `${day} ${time}`;

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[day];

}

function displayForecast(response) {
let forecast = response.data.daily;
let forecastElement = document.querySelector("#forecast");

let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let forecastHTML = `<div class="row">`;
forecast.forEach(function(forecastDay, index) {
  if (index < 6) {
forecastHTML = forecastHTML + `
<div class="col weather-forecast-date">${formatDay(forecastDay.dt)}<div class="row">
 <div class="col-12">
 <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" />
 </div>
 <div class="col-12 weather-forecast-temperature">
<span class="day-temperature">${Math.round(forecastDay.temp.day)}°C</span>
<span class="night-temperature">/${Math.round(forecastDay.temp.night)}°C</span>
</div>
</div>
</div>
`;
}
})
forecastHTML = forecastHTML + `</div>`;

forecastElement.innerHTML = forecastHTML;
}

function showLocation(position) {
  let apiKey = "4e3399058fb83764b1a548f8be443cf5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation() {
navigator.geolocation.getCurrentPosition(showLocation);
}

function getForecast(coordinates) {
  let apiKey = "4e3399058fb83764b1a548f8be443cf5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
let temperature = Math.round(response.data.main.temp);
celsiusTemperature = temperature;
document.querySelector("#current-city").innerHTML = response.data.name;
document.querySelector("#current-temp").innerHTML = temperature;
document.querySelector("#current-humidity").innerHTML = response.data.main.humidity;
document.querySelector("#current-wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#description").innerHTML = response.data.weather[0].description;
document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);

getForecast(response.data.coord);
}

function search(city) {
let apiKey = "4e3399058fb83764b1a548f8be443cf5";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-engine-input").value;
  search(city);
}

let locationButton = document.querySelector("#get-location-button");
locationButton.addEventListener("click", getCurrentLocation);

let celsiusTemperature = null;

let searchEngine = document.querySelector("#search-engine-form");
searchEngine.addEventListener("submit", handleSubmit);

search("Kyiv");



