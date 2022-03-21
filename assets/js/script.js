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

var logLatLon = function(lat, lon) {
    console.log(lat);
    console.log(lon);
};

var displayCurrentCity = function(dataGeo, name) {
    currentCityNameEl.textContent = "";
    currentCityNameEl.textContent = name;
};

// var displayCurrentDay = function(dataGeo, date) {
//     currentDayEl.textContent = "";
//     currentDayEl.textContent = date;
// };

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
            // displayCurrentDay(dataGeo, date);
        });
    });
};

// Insert City name as object of getCity function to get that city in the Geo API response:
// getCity("Atlanta");

// calling "Chicago" ("lat: 33.44" & "lon: -94.04") in One Call API:
// fetch('https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=4d05b6f1e04f1e497e900b04da198f9d')

// function to get the weather of a location based on "lat" and "lon" (from JSON data for each call)
var getWeather = function(lat, lon) {
    // the One Call API url + variables
    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

    // the API request
    fetch(weatherApiUrl).then(function(response) {
        response.json().then(function(dataWeather) {
            console.log(dataWeather);
        });
    });
};

// lat & lon are for Atlanta
// getWeather("33.74", "-84.39");

cityFormEl.addEventListener("submit", formSubmitHandler);