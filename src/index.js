let now = new Date();
let today = document.querySelector("#current-day");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
today.innerHTML = `${day} ${time}`;


function showLocation(position) {
  let apiKey = "4e3399058fb83764b1a548f8be443cf5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation() {
navigator.geolocation.getCurrentPosition(showLocation);
}

let locationButton = document.querySelector("#get-location-button");
locationButton.addEventListener("click", getCurrentLocation);

function displayWeather(response) {
let temperature = Math.round(response.data.main.temp);
document.querySelector("#current-city").innerHTML = response.data.name;
document.querySelector("#current-temp").innerHTML = temperature;
document.querySelector("#current-humidity").innerHTML = response.data.main.humidity;
document.querySelector("#current-wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#description").innerHTML = response.data.weather[0].main;
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

let searchEngine = document.querySelector("#search-engine-form");
searchEngine.addEventListener("submit", handleSubmit);

search("New York");