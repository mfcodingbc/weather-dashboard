var apiKey = '4d05b6f1e04f1e497e900b04da198f9d';

fetch('https://api.openweathermap.org/data/2.5/onecall?lat={33.44}&lon={-94.04}&exclude={alerts}&appid={apiKey}')
// .then(response => response.json())
// .then(console.log(response));

var getWeather = function() {
    console.log("This function was called!");
};

getWeather();