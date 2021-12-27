var apiKey = "f79e3e82fc040e4a8f219c6cb09a3b88";
var searchButton = document.querySelector("button");
function currentWeatherAPI(city) {
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  fetch(url)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      oneCallAPI(data.coord.lat, data.coord.lon);
      var imageSource = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      var img = document.createElement("img");
      img.setAttribute("src", imageSource);
      var currentWeatherDIV = document.querySelector("#currentWeather");
      currentWeatherDIV.append(img);

      // searchButton.addEventListener("click", function () {
      var card = document.getElementById("weatherCard");
      card.innerHTML = "";
      var forecastDate = document.createElement("h1");
      forecastDate.textContent = 
      var cityName = document.createElement("h2");
      cityName.textContent = data.name;
      var tempEl = document.createElement("p");
       tempEl.textContent = data.main.temp;
      var humidityEl = document.createElement("p");
      humidityEl.textContent = data.main.humidity;
      var windEl = document.createElement("p");
      windEl.textContent = data.wind.speed;
      
      card.append(cityName, humidityEl, tempEl, windEl);
      // humidityEl.append("#weatherCard");
      console.log(humidityEl);
      // });
      //   card current weather
    });
}
// this is my call for current weather.

function oneCallAPI(latitude, longitude) {
  var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=imperial`;
  fetch(url)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
  // uvi, color and 5 day forecast
}

searchButton.addEventListener("click", function () {
  var cityInput = document.getElementById("cityInput").value;
  currentWeatherAPI(cityInput);
});
//   var humidityEl = data.main.humidity;
//   humidityEl.append("weatherCard");
//   console.log(humidityEl);
// });
