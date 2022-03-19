var apiKey = "4d05b6f1e04f1e497e900b04da198f9d";

// REMOVE the '{}' from the GET call, otherwise the call will NOT work

// calling "Atlanta" in Geocoding API:
// fetch('http://api.openweathermap.org/geo/1.0/direct?q=Atlanta,GA,USA&limit=1&appid=4d05b6f1e04f1e497e900b04da198f9d')

// function to get the location for a city based on "name" (from JSON data for each call)
var getCity = function(name) {
    // the Geocoding API url + variables
    var geoApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + name + ",USA&limit=1&appid=" + apiKey;

    // the API request
    fetch(geoApiUrl).then(function(response) {
        response.json().then(function(dataGeo) {
            console.log(dataGeo);
        });
    });
};

// Insert City name as object of getCity function to get that city in the Geo API response:
getCity("Atlanta");

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
getWeather("33.74", "-84.39");