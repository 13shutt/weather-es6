class UI {
  constructor() {
    this.wind = document.querySelector('.wind')
    this.humidity = document.querySelector('.humidity')
    this.visibility = document.querySelector('.visibility')
    this.pressure = document.querySelector('.pressure')
    this.coordLat = document.querySelector('#coord-lat')
    this.coordLong = document.querySelector('#coord-long')
    this.date = document.querySelector('#date')
    this.logo = document.querySelector('.logo')
    this.temp = document.querySelector('.temperature')
    this.textCont = document.querySelector('.text-content')
    this.sunrise = document.querySelector('.sunrise')
    this.sunset = document.querySelector('.sunset')
    this.weeklyBlock = document.querySelector('.cards')
    this.town = document.querySelector('#town')
  }
  
  paintDayWeather(weather) {
    console.log(weather)
    var src = weather.channel.item.description
    this.town.textContent = weather.channel.location.city
    this.wind.textContent = ' ' + weather.channel.wind.speed + ' ' + weather.channel.units.speed
    this.humidity.textContent = ' ' + weather.channel.atmosphere.humidity + '%'
    this.visibility.textContent = ' ' + weather.channel.atmosphere.visibility + ' ' + weather.channel.units.distance
    this.pressure.textContent = ' ' + weather.channel.atmosphere.pressure + ' ' + weather.channel.units.pressure
    this.coordLat.textContent = 'latitude: ' + weather.channel.item.lat 
    this.coordLong.textContent = 'longitude: ' + weather.channel.item.long 
    this.date.textContent = formatDate(new Date())
    this.logo.src = src.match(/(https?:\/\/|ftp:\/\/|www\.)((?![.,?!;:()]*(\s|$))[^\s]){2,}/gim)[0].slice(0, -3)
    this.temp.textContent = weather.channel.item.condition.temp + ' ' + weather.channel.units.temperature
    this.textCont.textContent = weather.channel.item.condition.text
    this.sunrise.textContent = weather.channel.astronomy.sunrise
    this.sunset.textContent = weather.channel.astronomy.sunset
  }

  paintWeekWeather(weather) {
    console.log(weather.channel.item.forecast)
    weather.channel.item.forecast.forEach(item => {
      this.weeklyBlock.innerHTML += `
        <div class="card">
          <div class="card-date">${item.date}</div>
          <div class="card-day">${item.day}</div>
          <div class="card-logo">
            <i class="wi wi-yahoo-${item.code}"></i>
          </div>
          <div class="card-text">${item.text}</div>
          <div class="temp">
            <strong>low: </strong> ${item.low}${weather.channel.units.temperature}
            -
            <strong>high: </strong> ${item.high}${weather.channel.units.temperature}
          </div>
        </div>
      `
    })
    this.weeklyBlock.removeChild(this.weeklyBlock.childNodes[1])
    this.weeklyBlock.removeChild(this.weeklyBlock.childNodes[16])
    this.weeklyBlock.removeChild(this.weeklyBlock.childNodes[17])
  }
}

const formatDate = (date) => {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
} 

const chooseIcon = (code) => {
  switch(code) {
    case(0): 'tornado'
    break;

  }
}