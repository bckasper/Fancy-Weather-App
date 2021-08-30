var city = 'Columbus'
var state = 'Ohio'
var units = 'imperial'
var APIKey = '35610e0fadafaec7131373302bc9e1ab'

function getCurrentWeather(){

    currentQueryURL = 'https://api.openweathermap.org/data/2.5/weather?q='+city+','+state+'&appid='+APIKey+'&units='+units

    fetch(currentQueryURL)
        .then(function(response){
            return response.json()
        })
        .then(function(result){
            console.log(result)
        })
}


function getForecast(){

    forecastQueryURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+','+state+'&appid='+APIKey+'&units='+units+'&cnt=5'

    fetch(forecastQueryURL)
        .then(function(response){
            return response.json()
        })
        .then(function(result){
            console.log(result)
        })
}

getCurrentWeather()
getForecast()