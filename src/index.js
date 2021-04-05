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
let minute = now.getMinutes();

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

let h5 = document.querySelector("#card-title");
h5.innerHTML = `${day}, ${date}. ${month}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  let units = "metric";
  let apiKey = "b05a1145e720875676132ce7411f570e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature).then(showPosition);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let message = `Hetkel on ${temperature} ℃`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = message;
}

function showWeather(response) {
  let h1 = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `${response.data.name} ${temperature}° `;
}

function retrievePosition(position) {
  let apiKey = "b05a1145e720875676132ce7411f570e";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);
