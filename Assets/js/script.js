// HTML document variables for the search inputs and current city weather elements
const cityInput = document.getElementById('city-input')
const searchFormEl = document.getElementById('search-form')
const city = document.getElementById('city-input')
const searchHistoryUL = document.getElementById('search-history-ul')
const currentCityEl = document.getElementById('current-city')
const currentCityIconEl = document.getElementById('current-city-icon')
const currentCityTemp = document.getElementById('current-weather-temp')
const currentCityWind = document.getElementById('current-weather-wind')
const currentCityHumidity = document.getElementById('current-weather-humidity')
const currentCityUV = document.getElementById('current-weather-uv')
const removeDupesBtn = document.getElementById('dupes')
const clearStorageBtn = document.getElementById('clear')

// HTML document variables for the forecast elements
const fcstIconOne = document.getElementById('fcst-1-icon')
const fcstTempOne = document.getElementById('fcst-1-temp')
const fcstWindOne = document.getElementById('fcst-1-wind')
const fcstHumidityOne = document.getElementById('fcst-1-humidity')
const fcstIconTwo = document.getElementById('fcst-2-icon')
const fcstTempTwo = document.getElementById('fcst-2-temp')
const fcstWindTwo = document.getElementById('fcst-2-wind')
const fcstHumidityTwo = document.getElementById('fcst-2-humidity')
const fcstIconThree = document.getElementById('fcst-3-icon')
const fcstTempThree = document.getElementById('fcst-3-temp')
const fcstWindThree = document.getElementById('fcst-3-wind')
const fcstHumidityThree = document.getElementById('fcst-3-humidity')
const fcstIconFour = document.getElementById('fcst-4-icon')
const fcstTempFour = document.getElementById('fcst-4-temp')
const fcstWindFour = document.getElementById('fcst-4-wind')
const fcstHumidityFour = document.getElementById('fcst-4-humidity')
const fcstIconFive = document.getElementById('fcst-5-icon')
const fcstTempFive = document.getElementById('fcst-5-temp')
const fcstWindFive = document.getElementById('fcst-5-wind')
const fcstHumidityFive = document.getElementById('fcst-5-humidity')


// Global variables
var units = 'imperial'
var APIKey = '35610e0fadafaec7131373302bc9e1ab'
var storage = JSON.parse(localStorage.getItem("searchHistory"))



// API request to get the current weather for the city the user inputs
function getCurrentWeather(input){
    currentQueryURL = 'https://api.openweathermap.org/data/2.5/weather?q='+input+'&appid='+APIKey+'&units='+units

    console.log(currentQueryURL)

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
            printUVIndex(result)
            addLastSearch(result.name)
            storeInput(result.name)
        })
        .catch(function(){
            alert('City not found. Please try again!')
        })


}

// This function does the same as the getCurrentWeather function above, but it runs when the created button is clicked and thus omits the steps of storing the search in local storage and creating another button.
function getCurrentWeatherBtn(input){
    currentQueryURL = 'https://api.openweathermap.org/data/2.5/weather?q='+input+'&appid='+APIKey+'&units='+units

    console.log(currentQueryURL)

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
            printUVIndex(result)
        })
        .catch(function(){
            alert('City not found. Please try again!')
        })
}

// API request to get the 5-day forcast for the city the user inputs
function getForecast(input){
    forecastQueryURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+input+'&appid='+APIKey+'&units='+units+'&cnt=5'

    fetch(forecastQueryURL)
        .then(function(response){
            return response.json() 
        })
        .then(function(result){
            console.log(result)
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

    // Fcst day 1
    var fcst1IconUrl = 'http://openweathermap.org/img/wn/'+result.list[0].weather[0].icon+'@2x.png'
    fcstIconOne.setAttribute('src',fcst1IconUrl)
    fcstTempOne.innerHTML = Math.round(result.list[0].main.temp)+'° F'
    fcstWindOne.innerHTML = Math.round(result.list[0].wind.speed)+' mph'
    fcstHumidityOne.innerHTML = result.list[0].main.humidity+'%' 

    // Fcst day 2
    var fcst2IconUrl = 'http://openweathermap.org/img/wn/'+result.list[1].weather[0].icon+'@2x.png'
    fcstIconTwo.setAttribute('src',fcst2IconUrl)
    fcstTempTwo.innerHTML = Math.round(result.list[1].main.temp)+'° F'
    fcstWindTwo.innerHTML = Math.round(result.list[1].wind.speed)+' mph'
    fcstHumidityTwo.innerHTML = result.list[1].main.humidity+'%' 

    // Fcst day 3
    var fcst3IconUrl = 'http://openweathermap.org/img/wn/'+result.list[2].weather[0].icon+'@2x.png'
    fcstIconThree.setAttribute('src',fcst3IconUrl)
    fcstTempThree.innerHTML = Math.round(result.list[2].main.temp)+'° F'
    fcstWindThree.innerHTML = Math.round(result.list[2].wind.speed)+' mph'
    fcstHumidityThree.innerHTML = result.list[2].main.humidity+'%' 

    // Fcst day 4
    var fcst4IconUrl = 'http://openweathermap.org/img/wn/'+result.list[3].weather[0].icon+'@2x.png'
    fcstIconFour.setAttribute('src',fcst4IconUrl)
    fcstTempFour.innerHTML = Math.round(result.list[3].main.temp)+'° F'
    fcstWindFour.innerHTML = Math.round(result.list[3].wind.speed)+' mph'
    fcstHumidityFour.innerHTML = result.list[3].main.humidity+'%' 
    
    // Fcst day 5
    var fcst5IconUrl = 'http://openweathermap.org/img/wn/'+result.list[4].weather[0].icon+'@2x.png'
    fcstIconFive.setAttribute('src',fcst5IconUrl)
    fcstTempFive.innerHTML = Math.round(result.list[4].main.temp)+'° F'
    fcstWindFive.innerHTML = Math.round(result.list[4].wind.speed)+' mph'
    fcstHumidityFive.innerHTML = result.list[4].main.humidity+'%' 
}

// Store the user's city input into local storage
function storeInput(result){
    if(storage == null) {storage = []}
    if(storage.includes(result)){
        return
    }

    storage.push(result);
    localStorage.setItem("searchHistory", JSON.stringify(storage))
}

// Below is the function that will run to add buttons of each search to a list below the search bar
function addLastSearch(city){

        var listItem = document.createElement('li')
        searchHistoryUL.append(listItem)
        var button = document.createElement('button')
        listItem.append(button)
        button.innerHTML = city
        button.setAttribute('class','col-10')
        button.setAttribute("data-city",city)

        button.addEventListener('click', function(event){
            event.preventDefault()

            getCurrentWeatherBtn(button.getAttribute('data-city'))
            getForecast(button.getAttribute('data-city'))
        })

    
}

// Event listener that handles the user's form submission. Stores the input into local storage and then fires the getCurrentWeather and getForecast functions for API requests
searchFormEl.addEventListener('submit', function(event){
    event.preventDefault()

    getCurrentWeather(city.value.trim())
    getForecast(city.value.trim())

    city.value = '';
})

clearStorageBtn.addEventListener('click', function(){
    localStorage.clear()
    location.reload()
})

// This function will run on the page load and will pull in the current weather and forecast for the most recently searched element
function init(){
    if(!storage){return}
    
    for(let i=0; i<storage.length; i++){
        addLastSearch(storage[i])
    }

    getCurrentWeatherBtn(storage[0])
    getForecast(storage[0])
}

init()
