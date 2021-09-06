// HTML document variables
const cityInput = document.getElementById('city-input')
const searchFormEl = document.getElementById('search-form')
const city = document.getElementById('city-input')
const currentCityEl = document.getElementById('current-city')
const currentCityIconEl = document.getElementById('current-city-icon')
const currentCityTemp = document.getElementById('current-weather-temp')
const currentCityWind = document.getElementById('current-weather-wind')
const currentCityHumidity = document.getElementById('current-weather-humidity')
const currentCityUV = document.getElementById('current-weather-uv')
const 


// Global variables
var units = 'imperial'
var APIKey = '35610e0fadafaec7131373302bc9e1ab'



// API request to get the current weather for the city the user inputs
function getCurrentWeather(){
    currentQueryURL = 'https://api.openweathermap.org/data/2.5/weather?q='+city.value.trim()+'&appid='+APIKey+'&units='+units

    // console.log(currentQueryURL)

    fetch(currentQueryURL)
        .then(function(response){
            if(!response.ok){
                throw response.json()
            }
           
            return response.json()
        })
        .then(function(result){
            console.log(result)
            storeInput(result.name)
            printCurrentWeather(result)
            printUVIndex(result)
        })
        .catch(function(){
            alert('City not found. Please try again!')
        })


}

// API request to get the 5-day forcast for the city the user inputs
function getForecast(){
    forecastQueryURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+city.value.trim()+'&appid='+APIKey+'&units='+units+'&cnt=5'

    fetch(forecastQueryURL)
        .then(function(response){
            return response.json() 
        })
        .then(function(result){
            printFiveDayForecast(result)
        })
}


// The next three functions will print current weather, the UV Index of the current weather, and the 5-day forecast

// Print current weather from current city API
function printCurrentWeather(result){
    var iconURL = 'http://openweathermap.org/img/wn/'+result.weather[0].icon+'@2x.png'

    currentCityEl.innerHTML = result.name
    currentCityIconEl.setAttribute('src', iconURL)

    currentCityTemp.innerHTML = Math.round(result.main.temp)+'° F'
    currentCityWind.innerHTML = Math.round(result.wind.speed)+' mph'
    currentCityHumidity.innerHTML = result.main.humidity+'%'    
}

// Print UV Index from One-Call API
function printUVIndex(result){
    var lat = result.coord.lat
    var long = result.coord.lon
    var oneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&appid='+APIKey

    fetch(oneCallUrl)
        .then(function(response){
            return response.json()
        })
        .then(function(result){
            console.log(result)
            var uvIndex = result.current.uvi
            currentCityUV.innerHTML = uvIndex

            if(uvIndex < 3){
                currentCityUV.setAttribute('style', 'background-color:green; font-weight:bold')
            } else if(uvIndex < 7){
                currentCityUV.setAttribute('style', 'background-color:orange; font-weight:bold')
            } else {
                currentCityUV.setAttribute('style', 'background-color:red; font-weight:bold')
            }
        })
}
// Print 5-day forecast from forecast API
function printFiveDayForecast(result){

}

// Store the user's city input into local storage
function storeInput(result){
    var storedSearch = JSON.parse(localStorage.getItem("searchHistory"));
    if (storedSearch == null) {storedSearch = []}
    
    storedSearch.push(result);
    localStorage.setItem("searchHistory", JSON.stringify(storedSearch))
}

// Event listener that handles the user's form submission. Stores the input into local storage and then fires the getCurrentWeather and getForecast functions for API requests
searchFormEl.addEventListener('submit', function(event){
    event.preventDefault()

    getCurrentWeather()
    getForecast()

    city.value = '';
})

// This function will run on the page load and will pull in the current
// function init(){
    
//     var mostRecentSearch = localStorage.getItem("searchHistory"[0])
//     printCurrentWeather(mostRecentSearch)
// }

// init()