// HTML document variables
const cityInput = document.getElementById('city-input')
const searchFormEl = document.getElementById('search-form')
const city = document.getElementById('city-input')
const currentCityEl = document.getElementById('current-city')
const currentCityIconEl = document.getElementById('current-city-icon')
const currentCityTemp = document.getElementById('current-weather-temp')


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
            printCurrentWeather(result)
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
            console.log(result)
        })
}

// Store the user's city input into local storage
function storeInput(){
    var storedSearch = JSON.parse(localStorage.getItem("searchHistory"));
    if (storedSearch == null) {storedSearch = []}
    
    storedSearch.push(city.value);
    localStorage.setItem("searchHistory", JSON.stringify(storedSearch))
}


function printCurrentWeather(result){
    
    currentCityEl.innerText = result.name
    currentCityTemp.innerHTML = Math.round(result.main.temp)+'° F'
    
}


// Event listener that handles the user's form submission. Stores the input into local storage and then fires the getCurrentWeather and getForecast functions for API requests
searchFormEl.addEventListener('submit', function(event){
    event.preventDefault()

    storeInput()
    getCurrentWeather()
    // getForecast()

    city.value = '';
})
