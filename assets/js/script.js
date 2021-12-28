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
      // var currentWeatherDIV = document.querySelector("#currentWeather");
      // currentWeatherDIV.append(img);

      // searchButton.addEventListener("click", function () {
      var card = document.getElementById("weatherCard");
      card.innerHTML = "";
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
      
      var saveSearch = function(){
        localStorage.setItem("cityName", JSON.stringify(cityName));
    };
      // var uvIndex = document.createElement("p");
      // uvIndex.textContent = "UV Index:" + data.current.uvi;
      
      card.append(cityName, forecastDate,img,tempEl, windEl, humidityEl);
     
      
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
    
      

    var fiveDayForecast = document.getElementById("fiveDayForecast");
    fiveDayForecast.innerHTML="";
    for (var i=0; i < 5; i++){
      var card = document.createElement("div");
      var column = document.createElement("div");
      var cardBody = document.createElement("div");
      card.setAttribute("class", "card");
      column.setAttribute("class", "col");
      cardBody.setAttribute("class", "card-body");
      var tempEl = document.createElement("p");
      tempEl.textContent= "Temp: " + data.daily[i].temp.max + " °F";
      var humidityEl = document.createElement("p");
      humidityEl.textContent = "Humidity: " + data.daily[i].humidity + " %";
      var windEl = document.createElement("p");
      windEl.textContent = "Wind Speed: " + data.daily[i].wind_speed + " MPH";
      cardBody.append(tempEl,windEl,humidityEl,);
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

