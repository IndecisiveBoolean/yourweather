/* TO DO
Proper Icon for certain conditions are not displayed based on the proper time of day.

Units do not automatically change from Imperial to Metric based on users location.

Change placeholder images and text that display during AJAX request.

Change final else statement in the iconSetter function to something more appropriate.

Change default font to something functional but better looking.
*/


const temperatureHTML = document.querySelector("#temperature");
const townHTML = document.querySelector('#location');
const humidityHTML = document.querySelector("#humidity");
const windHTML = document.querySelector("#wind")
const windDirectionHTML = document.querySelector("#direction");
const weatherIcon = document.querySelector("#conditions-icon");
let currentWeatherDesc = document.querySelector("#current-weather");

let key = "f46c141e52207ddd839a3255fe799a29"; // api key for weather info
const userLocation = []; //contains the location of the user
let temp = [] // Contains the temperature data found in weatherResponse
let desc = [] // Contains the weather description data found in weatherResponse
let wind = [] // Contains the wind speed data found in weatherResponse
let windDirection = []// Contains the wind direction data found in weatherResponse
let humidity = [] // Contains the humidity data found in weatherResponse
let userTownName = [] // Contains the town name/location data found in weatherResponse
let weatherIconId = ''; // Contains the ID data found in weatherResponse used for Icon updates
let weatherResponse = [] // Contains the the response text from the weatherData AJAX request

//====    LOCATION GETTER    ==== //

// Checks if the users current position is obtained succesfully or errors
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  alert('Geolocation is not supported');
}

function error() {
  alert("That's weird. We couldn't find you!")
};

// Is called on success taking the coords of the user's current location and opens an AJAX request using the openweathermap API.
function success(position) {
  userLocation.lat = position.coords.latitude;
  userLocation.lng = position.coords.longitude;
  
 weatherData = new XMLHttpRequest();
    weatherData.onreadystatechange = function () {
      if (weatherData.readyState === 4 && weatherData.status === 200) {
        weatherResponse = JSON.parse(weatherData.responseText);
        unitSelection = weatherResponse.sys.country;
        setWeatherInfo();
        currentWeatherIconSetter();
      }
    };
    weatherData.open('GET', 'https://api.openweathermap.org/data/2.5/weather?lat=' + userLocation.lat + '&lon=' + userLocation.lng + '&units=imperial&APPID=' + key);
    weatherData.send();
}


function setWeatherInfo () {
  temp = weatherResponse.main.temp;
  temperatureHTML.textContent = temp;

  desc = weatherResponse.weather[0].description;
  currentWeatherDesc.textContent = desc;

  weatherIconId = weatherResponse.weather[0].id;

  userTownName = weatherResponse.name;
  townHTML.textContent = userTownName;

  wind = weatherResponse.wind.speed;
  windHTML.textContent = wind;
  windDirection = weatherResponse.wind.deg;
  windDirection = cardDirectionConvert(windDirection); //calls the cardDirectionConvert function with the value of windDirection as arguement
  windDirectionHTML.textContent = windDirection;


  humidity = weatherResponse.main.humidity;
  humidityHTML.textContent = humidity;   
};

//====    /LOCATION GETTER    ==== //


//====    WIND DIRECTION DEG TO CARDINAL COVERT FUNCTION    ==== //

// Converts the interger value of the deg property returned from weatherData AJAX request to a cardinal direction. North, South, North East, etc...
function cardDirectionConvert(deg) {
  if (deg>11.25 && deg<33.75){
    return "NNE";
  }else if (deg>33.75 && deg<56.25){
    return "ENE";
  }else if (deg>56.25 && deg<78.75){
    return "E";
  }else if (deg>78.75 && deg<101.25){
    return "ESE";
  }else if (deg>101.25 && deg<123.75){
    return "ESE";
  }else if (deg>123.75 && deg<146.25){
    return "SE";
  }else if (deg>146.25 && deg<168.75){
    return "SSE";
  }else if (deg>168.75 && deg<191.25){
    return "S";
  }else if (deg>191.25 && deg<213.75){
    return "SSW";
  }else if (deg>213.75 && deg<236.25){
    return "SW";
  }else if (deg>236.25 && deg<258.75){
    return "WSW";
  }else if (deg>258.75 && deg<281.25){
    return "W";
  }else if (deg>281.25 && deg<303.75){
    return "WNW";
  }else if (deg>303.75 && deg<326.25){
    return "NW";
  }else if (deg>326.25 && deg<348.75){
    return "NNW";
  }else{
    return "N"; 
  }
}

//====    /WIND DIRECTION DEG TO CARDINAL COVERT FUNCTION    ==== //



//====    WEATHER ICON SELECTOR    ==== //


// Checks the value stored in the weatherIconId variable to determine which weather icon should be used bt adding the src attribute along with the proper url to the <img> selected with the weatherIcon variable/selector.
function currentWeatherIconSetter() {
  
  if (weatherIconId >= 200 && weatherIconId <= 232) {
    weatherIcon.src= "https://openweathermap.org/img/w/11d.png";
    }
  else if (weatherIconId >= 300 && weatherIconId <= 321) {
      weatherIcon.src= "https://openweathermap.org/img/w/09d.png";
    }
  else if (weatherIconId >= 499 && weatherIconId <= 532) {
      weatherIcon.src= "https://openweathermap.org/img/w/10d.png";
    }
  else if (weatherIconId >= 599 && weatherIconId <= 623) {
      weatherIcon.src= "https://openweathermap.org/img/w/13d.png";
    }
  else if (weatherIconId >= 700 && weatherIconId <= 782) {
      weatherIcon.src= "https://openweathermap.org/img/w/50d.png";
    }
  else if (weatherIconId == 800) {
      weatherIcon.src= "https://openweathermap.org/img/w/01d.png";
    }
  else if (weatherIconId == 801) {
      weatherIcon.src= "https://openweathermap.org/img/w/02d.png";
    }
  else if (weatherIconId == 802) {
      weatherIcon.src= "https://openweathermap.org/img/w/03d.png";
    }
  else if (weatherIconId == 803 || weatherIconId == 804) {
      weatherIcon.src= "https://openweathermap.org/img/w/04d.png";
    }
  else {
      console.log("no it broke");
    }
}


//====    /WEATHER ICON SELECTOR    ==== //