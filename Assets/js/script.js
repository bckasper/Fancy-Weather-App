var city = 'Columbus'
var state = 'Ohio'
var APIKey = '35610e0fadafaec7131373302bc9e1ab'

function getWeather(){

    queryURL = 'https://api.openweathermap.org/data/2.5/weather?q='+city+','+state+'&appid='+APIKey+'&units=imperial'

    fetch(queryURL)
        .then(function(response){
            return response.json()
        })
        .then(function(result){
            console.log(result)
        })
}

getWeather()