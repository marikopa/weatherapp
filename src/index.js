let now = new Date();
let days = [
  "Pühapäev",
  "Esmaspäev",
  "Teisipäev",
  "Kolmapäev",
  "Neljapäev",
  "Reede",
  "Laupäev",
];
let day = days[now.getDay()];
let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let months = [
  "Jaanuar",
  "Veebruar",
  "Märts",
  "Aprill",
  "Mai",
  "Juni",
  "Juuli",
  "August",
  "September",
  "Oktoober",
  "November",
  "Detsember",
];
let month = months[now.getMonth()];
let h3 = document.querySelector("h3");
h3.innerHTML = `${day}, ${date}. ${month}, ${year}. Kell ${hour}:${minute}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  let units = "metric";
  let apiKey = "b05a1145e720875676132ce7411f570e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemperature(response) {
  let city = response.data.name;
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let temperatureElement = document.querySelector("#temperature");
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  city.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let h1 = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `${response.data.name}  `;
}
function retrievePosition(position) {
  let apiKey = "b05a1145e720875676132ce7411f570e";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(retrievePosition);

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Kolmapäev", "N", "R"];
  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
   <div class="col-2">
              <div class="weather-forecast-date">
              ${day}
              </div>
              <img src="https://media.istockphoto.com/vectors/cute-flat-sun-icon-vector-id1124567572?k=6&m=1124567572&s=612x612&w=0&h=FFU7e1Tb4LI6e7f6xU-uJZoGRSLF3koVNXHzDKSDX9g=" 
              alt="" width="36"> 
              <div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max">9 </span>
              <span class="weather-forecast-temperature-min"> 6</span>
              
             </div>
            </div>
          
          `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();
