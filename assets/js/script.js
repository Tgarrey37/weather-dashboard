var apiKey = "f79e3e82fc040e4a8f219c6cb09a3b88";

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
      //   card current weather
    });
}
// this is my call for current weather.
currentWeatherAPI("mesa");

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
