// HTML document variables
const cityInput = document.getElementById('city-input')
const searchFormEl = document.getElementById('search-form')
const city = document.getElementById('city-input')

// Global variables
var units = 'imperial'
var APIKey = '35610e0fadafaec7131373302bc9e1ab'



// API request to get the current weather for the city the user inputs
function getCurrentWeather(){
    currentQueryURL = 'https://api.openweathermap.org/data/2.5/weather?q='+city.value.trim()+',&appid='+APIKey+'&units='+units

    // console.log(currentQueryURL)

    fetch(currentQueryURL)
        .then(function(response){
            return response.json()
        })
        .then(function(result){
            console.log(result)
        })
}

// API request to get the 5-day forcase for the city the user inputs
function getForecast(){
    forecastQueryURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+city.value.trim()+',&appid='+APIKey+'&units='+units+'&cnt=5'

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


// Event listener that handles the user's form submission. Stores the input into local storage and then fires the getCurrentWeather and getForecast functions for API requests
searchFormEl.addEventListener('submit', function(event){
    event.preventDefault()

    storeInput()
    getCurrentWeather()
    getForecast()
})
