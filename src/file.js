let currentTime = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  let currentDate = `Last updated on ${currentDay}, ${currentHour}:${currentMinute}`;
  return currentDate;
}
let time = document.querySelector(".time");
time.innerHTML = formatDate(currentTime);

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".wind").innerHTML =
    (response.data.wind.speed * (60 * 60)) / 1000;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather.icon}@2x.png`
    );
}
function searchCity(event) {
  event.preventDefault();
  let apiKey = "c0f23c2af89da48c0615f7a3012794ef";
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeather);
}
function retrievePosition(position) {
  let apiKey = "c0f23c2af89da48c0615f7a3012794ef";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);
let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", retrievePosition);
