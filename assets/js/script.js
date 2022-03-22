// the API Key in order to gain access to data from the Open Weather APIs
var apiKey = "4d05b6f1e04f1e497e900b04da198f9d";

// elements targeting ids in the HTML in order to dynamically update with data
var currentWeatherEl = document.getElementById("currentWeatherText");

var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#inputCitySearch");

var currentCityNameEl = document.querySelector("#current-city");
var currentDayEl = document.querySelector("#current-day");
var currentTempEl = document.querySelector("#current-text-temp");
var currentWindEl = document.querySelector("#current-text-wind");
var currentHumidEl = document.querySelector("#current-text-humid");
var currentUVEl = document.querySelector("#current-text-uv");

var weatherIconEl = document.querySelector("#weather-icon");

var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim();

    if (cityName) {
        getCity(cityName);
        // clear out user input in form
        cityInputEl.value = "";
    } else {
        alert("Please enter a city");
    }
    console.log(event);
};

var displayCurrentCity = function(location, name) {
    currentCityNameEl.textContent = "";
    currentCityNameEl.textContent = name;
    console.log(location);
    console.log(name);
};

// calling "Atlanta" in Geocoding API:
// fetch('http://api.openweathermap.org/geo/1.0/direct?q=Atlanta,GA,USA&limit=1&appid=4d05b6f1e04f1e497e900b04da198f9d')

// function to get the location for a city based on "name" (from JSON data for each call)
var getCity = function(name) {
    // the Geocoding API url + variables
    // REMOVE the '{}' from the GET call, otherwise the call will NOT work
    var geoApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + name + ",USA&limit=1&appid=" + apiKey;

    // the API request
    fetch(geoApiUrl).then(function(response) {
        response.json().then(function(dataGeo) {
            displayCurrentCity(dataGeo, name);
            getWeather(dataGeo);
        });
    });
};

// Insert City name as object of getCity function to get that city in the Geo API response:
// getCity("Atlanta");

// calling "Chicago" ("lat: 33.44" & "lon: -94.04") in One Call API:
// fetch('https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=4d05b6f1e04f1e497e900b04da198f9d')

// function to get the weather of a location based on "lat" and "lon" (from JSON data for each call)
var getWeather = function(location) {
    // setting the units for the API call into US standard measurements
    var units = "imperial"

    // converting the lat & lon number values into strings
    console.log(location);
    var lat = location[0].lat;
    lat.toString();
    var lon = location[0].lon;
    lon.toString();

    // the One Call API url + variables (change units to imperial for US measurements)
    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=" + units + "&appid=" + apiKey;

    // the API request
    fetch(weatherApiUrl).then(function(response) {
        response.json().then(function(dataWeather) {
            console.log(dataWeather);
            getCurrentWeather(dataWeather);
            getWeatherIcon(dataWeather);
        });
    });
};

var getCurrentWeather = function(weatherToday) {
    // creating and setting the appropriate stats for current weather
    var tempEl = document.createElement("div")
    currentTempEl.textContent = weatherToday.current.temp + "°F";
    currentWindEl.textContent = weatherToday.current.wind_speed + " miles per hour";
    currentHumidEl.textContent = weatherToday.current.humidity + "%";
    currentUVEl.textContent = weatherToday.current.uvi;
        if (currentUVEl.textContent < 3) {
            $(currentUVEl).addClass("bg-success px-3 rounded-pill text-white")
        } else if (currentUVEl.textContent < 6 ) {
            $(currentUVEl).addClass("bg-warning")
        } else {
            $(currentUVEl).addClass("bg-danger")
        };

};


var getWeatherIcon = function(weatherIcon) {
    // for current weather icon
    var icon = weatherIcon.current.weather[0].icon

    var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

    console.log(iconUrl);
};

// lat & lon are for Atlanta
// getWeather("33.74", "-84.39");

cityFormEl.addEventListener("submit", formSubmitHandler);