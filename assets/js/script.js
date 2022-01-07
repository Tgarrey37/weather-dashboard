var apiKey = "f79e3e82fc040e4a8f219c6cb09a3b88";
var weatherCard = document.getElementById("weatherCard");
var searchButton = document.querySelector("button");
var searchHistory = JSON.parse(localStorage.getItem("cityStorage")) || [];
function currentWeatherAPI(city) {
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  fetch(url)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // oneCallAPI(data.coord.lat, data.coord.lon);
      var imageSource = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      var img = document.createElement("img");
      img.setAttribute("src", imageSource);
      // var currentWeatherDIV = document.querySelector("#currentWeather");
      // currentWeatherDIV.append(img);

      // searchButton.addEventListener("click", function () {

      weatherCard.innerHTML = "";
      var forecastDate = document.createElement("h3");
      forecastDate.textContent = moment().format("L");
      var cityName = document.createElement("h1");
      cityName.textContent = data.name;
      var tempEl = document.createElement("p");
      tempEl.textContent = "Temp: " + data.main.temp + " °F";
      var humidityEl = document.createElement("p");
      humidityEl.textContent = "Humidity: " + data.main.humidity + " %";
      var windEl = document.createElement("p");
      windEl.textContent = "Wind Speed: " + data.wind.speed + " MPH";
      if (searchHistory.indexOf(data.name) === -1){
        cityAppend(data.name);
      };
      var saveSearch = function () {
        localStorage.setItem("cityName", JSON.stringify(cityName));
        
      };
      // var uvIndex = document.createElement("p");
      // uvIndex.textContent = "UV Index:" + data.current.uvi;

      weatherCard.append(
        cityName,
        forecastDate,
        img,
        tempEl,
        windEl,
        humidityEl
      );
      oneCallAPI(data.coord.lat, data.coord.lon);

      //   weatherCard current weather
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
      console.log(data.current.uvi);
      var uvIndex = document.createElement("p");
      uvIndex.innerHTML = `UV Index: <button type="button" id="uvButton" class="btn">${data.current.uvi}</button>`;
      weatherCard.append(uvIndex);

      if (data.current.uvi <= 3 && data.current.uvi >= 0) {
        document.getElementById("uvButton").classList.add("favorable");
      } else if (data.current.uvi > 3 && data.current.uvi <= 6) {
        document.getElementById("uvButton").classList.add("moderate");
      } else {
        document.getElementById("uvButton").classList.add("severe");
      }

      var fiveDayForecast = document.getElementById("fiveDayForecast");
      fiveDayForecast.innerHTML = "";
      for (var i = 1; i < 6; i++) {
        var card = document.createElement("div");
        var column = document.createElement("div");
        var cardBody = document.createElement("div");
        card.setAttribute("class", "card");
        column.setAttribute("class", "col");
        cardBody.setAttribute("class", "card-body");
        var tempEl = document.createElement("p");
        tempEl.textContent = "Temp: " + data.daily[i].temp.max + " °F";
        var humidityEl = document.createElement("p");
        humidityEl.textContent = "Humidity: " + data.daily[i].humidity + " %";
        var windEl = document.createElement("p");
        windEl.textContent = "Wind Speed: " + data.daily[i].wind_speed + " MPH";
        var imageSource = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png`;
        var img = document.createElement("img");
        img.setAttribute("src", imageSource);
        var date = new Date(data.daily[i].dt * 1000).toLocaleDateString();
        var dateEl = document.createElement("p");
        dateEl.textContent = date;
        console.log(date);
        cardBody.append(date, tempEl, img, windEl, humidityEl);
        card.append(cardBody);
        column.append(card);
        fiveDayForecast.append(column);
      }

      // fiveDayForecast.textContent = data.daily.temp;
      // card.append()

      // uvi, color and 5 day forecast
    });
}

searchButton.addEventListener("click", function () {
  var cityInput = document.getElementById("cityInput").value;
  var weatherCard = document.querySelector("#card");
  weatherCard.classList.remove("hidden");
  currentWeatherAPI(cityInput);
});

function cityAppend(cityName) {
  searchHistory.push(cityName);
  localStorage.setItem("cityStorage", JSON.stringify(searchHistory));
  var storage = document.createElement("li");
  var button = document.createElement("button");
  button.textContent = cityName;
  button.onclick = listClick; 
  var storageEl = document.querySelector(".cityStorage");
  storage.append(button);
  storageEl.append(storage);
}
function listClick(event) {
  console.log(event.target);
  console.log(this.textContent);
  var weatherCard = document.querySelector("#card")
  weatherCard.classList.remove("hidden");
  currentWeatherAPI(this.textContent);
}

// create for loop that loops through search history , that executes cityAppend for each city in array.
for (let i = 0; i < searchHistory.length; i++) {
  var storage = document.createElement("li");
  var button = document.createElement("button");
  button.textContent = searchHistory[i];
  button.onclick = listClick; 
  var storageEl = document.querySelector(".cityStorage");
  storage.append(button);
  storageEl.append(storage);
  
};