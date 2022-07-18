function formatDate(date) {
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}

let dateAndTime = new Date();
let dateElement = document.querySelector(`#date-time`);
dateElement.innerHTML = formatDate(dateAndTime);

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchCity(city);
}
function convertFahrenheit(event) {
  event.preventDefault();
  let degrees = document.querySelector(`#degrees`);
  degrees.innerHTML = 66;
}
function convertCelsius(event) {
  event.preventDefault();
  let degrees = document.querySelector(`#degrees`);
  degrees.innerHTML = 18;
}

function displayWeather(response) {
  document.querySelector(`#city`).innerHTML = response.data.name;
  document.querySelector(`#degrees`).innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector(`#wind`).innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#description`).innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = `93a1ae54f6c9ad534d4f4446ca97d20b`;
  let units = `metric`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(weatherUrl).then(displayWeather);
}

function searchLocation(position) {
  let apiKey = `93a1ae54f6c9ad534d4f4446ca97d20b`;
  let units = `metric`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(weatherUrl).then(displayWeather);
}

function fetchCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector(`#search-form`);
searchForm.addEventListener(`submit`, handleSubmit);

let fahrenheit = document.querySelector(`#fahrenheit`);
fahrenheit.addEventListener(`click`, convertFahrenheit);

let celsius = document.querySelector(`#celsius`);
celsius.addEventListener(`click`, convertCelsius);
searchCity(`sanford`);

let currentLocation = document.querySelector(`#current-location`);
currentLocation.addEventListener(`click`, fetchCurrentLocation);
