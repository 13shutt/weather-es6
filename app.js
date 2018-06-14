//select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="nome, ak")
// yahoo.apiKey = 28876c68417b0f085d28b4c06ef67505468d0fa2

// var scr = document.createElement('script')
// scr.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='kyiv')&format=json&callback=callbackFunction"

// document.body.appendChild(scr)

const ui = new UI;

document.getElementById('add-town-form').addEventListener('submit', (e) => {
  console.log(document.getElementById('add-town').value)
  e.preventDefault()
  
})

const callNewCity = (city) => {
  var scr = document.createElement('script')
  scr.src = `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='${city}')&format=json&callback=callbackFunction`
  document.body.appendChild(scr)
}

callNewCity('kyiv')

var callbackFunction = function(data) {
  var allWeather = data.query.results;

  ui.paintDayWeather(allWeather)
  ui.paintWeekWeather(allWeather)
};
