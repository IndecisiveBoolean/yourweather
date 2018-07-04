/* TO DO
Proper Icon for certain conditions are not displayed based on the proper time of day.

Units do not automatically change from Imperial to Metric based on users location.

Change placeholder images and text that display during AJAX request.

Change final else statement in the iconSetter function to something more appropriate.

Change default font to something functional but better looking.
*/

const temperatureHTML = document.querySelector("#temperature");
const townHTML = document.querySelector("#location");
const humidityHTML = document.querySelector("#humidity");
const windHTML = document.querySelector("#wind")
const windDirectionHTML = document.querySelector("#direction");
const weatherIcon = document.querySelector("#conditions-icon");
const currentWeatherDescHTML = document.querySelector("#current-weather");
const weatherSearch = document.querySelector("#weather-search");
const allHTML = document.querySelector("html");

let key = "f46c141e52207ddd839a3255fe799a29"; // api key for weather info
let weatherResponse = [] // Contains the the response text from the weatherData AJAX request.

class userWeather {
  constructor(temp, desc, wind, windDirection, humidity, userTownName, weatherIcon) {
    this.temp = temp;
    this.desc = desc;
    this.wind = wind;
    this.windDirection = windDirection;
    this.humidity = humidity;
    this.userTownName = userTownName;
    this.weatherIcon = weatherIcon;
  }
}

// Listens for ENTER key keypress and calls the getWeatherZip function passing the value of the input field are an argument.
allHTML.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    
    getWeatherZip(weatherSearch.value);
    weatherSearch.value = '';
  }
});

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

//====    /LOCATION GETTER    ==== //


// Is called on location get success. Uses coordinates of the user's current location and opens an AJAX request using the openweathermap API.
function success(position) {
  let userLocation = []; //contains the location of the user
  userLocation.lat = position.coords.latitude;
  userLocation.lng = position.coords.longitude;
  
 weatherData = new XMLHttpRequest();
    weatherData.onreadystatechange = function () {
      if (weatherData.readyState === 4 && weatherData.status === 200) {
        weatherResponse = JSON.parse(weatherData.responseText);
        if (weatherResponse.sys.country === "US") {
          temperatureHTML.innerText = "F";
        } else {
          temperatureHTML.innerText = "C";
        };
        setWeatherInfo();
        currentWeatherIconSetter();
      }
    };
    weatherData.open('GET', 'https://api.openweathermap.org/data/2.5/weather?lat=' + userLocation.lat + '&lon=' + userLocation.lng + `&units=imperial&APPID=` + key);
    weatherData.send();
}

function getWeatherZip(zip) {
  weatherDataZip = new XMLHttpRequest();
  weatherDataZip.onreadystatechange = function () {
    if (weatherDataZip.readyState === 4 && weatherDataZip.status === 200) {
      weatherResponse = JSON.parse(weatherDataZip.responseText);
      unitSelection = weatherResponse.sys.country;
      if (unitSelection === "US") {
        unitSelection = "imperial";
      } else {
        unitSelection = "metric";
      };
      setWeatherInfo();
      currentWeatherIconSetter();
    }
  };
  weatherDataZip.open('GET', `https://api.openweathermap.org/data/2.5/weather?zip=${zip}` + `&units=imperial&APPID=` + key);
  weatherDataZip.send();
};


function setWeatherInfo () {
  //calls the cardDirectionConvert function with an argument of the value of property weatherResponse.wind.deg to convert to a proper cardinal direction.
  let windDirection = cardDirectionConvert(weatherResponse.wind.deg); 
  // Creates a new object using the userWeather class constructor.
  let weatherInformation = new userWeather(weatherResponse.main.temp, weatherResponse.weather[0].description, weatherResponse.wind.speed, windDirection, weatherResponse.main.humidity, weatherResponse.name, weatherResponse.weather[0].icon);
  // Assigns the proper text/values to the HTML elements using the weatherInformation object.
  temperatureHTML.textContent = weatherInformation.temp;

  currentWeatherDescHTML.textContent = weatherInformation.desc;

  weatherIconId = weatherResponse.weather[0].id;

  townHTML.textContent = weatherInformation.userTownName;

  windHTML.textContent = weatherInformation.wind;
  windDirectionHTML.textContent = weatherInformation.windDirection;

  humidityHTML.textContent = weatherInformation.humidity;   
};


//====    WIND DIRECTION DEGREES TO CARDINAL CONVERSION FUNCTION    ====//

// Converts the int value of the deg property returned from weatherData AJAX request to a cardinal direction. North, South, North East, etc...
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
