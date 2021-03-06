const ui = new UI;

document.getElementById('add-town-form').addEventListener('submit', (e) => {
  callNewCity(document.getElementById('add-town').value)
  e.preventDefault()
  document.getElementById('add-town').value = ''
})

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.main').innerHTML = `
    <div class="error">
      <h3>Please, enter your town!)</h3>
    </div>
  `
})

const alarm = () => {
  confirm('NE RABOTAET!!!')
}

const callNewCity = (city) => {
  document.querySelector('.cards').innerHTML = ''
  var scr = document.createElement('script')
  scr.src = `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${city}")&format=json&callback=callbackFunction`
  document.body.appendChild(scr)
}

callNewCity('kiiv')

var callbackFunction = function(data) {
  var allWeather = data.query.results;
  if (allWeather == null) {
    document.querySelector('.main').classList.remove('hide')
    document.querySelector('.main').innerHTML = `
      <div class="error">
        <h1>Ooooooops, 404!</h1>
        <h2>Sorry we didn't catch your request.</h2>
        <h4>Please, type more correctly and stand by.</h4>
        <h6>So,you can try again</h6>
      </div>
    `
  } else {
    document.querySelector('.main').classList.add('hide')
    ui.paintDayWeather(allWeather)
    ui.paintWeekWeather(allWeather)
    ui.recent(allWeather)
    document.querySelector('#toggle-star').classList.remove('fas')
    favArr.forEach(item => {
      if (ui.town.textContent == item) {
        document.querySelector('#toggle-star').classList.add('fas')
      }
    })
  }
};

var favArr = []
document.getElementById('toggle-star').addEventListener('click', (e) => {
  if (document.querySelector('#toggle-star').classList.contains('fas') != true) {
    document.querySelector('#toggle-star').classList.add('fas')
    favArr.push(document.querySelector('#town').textContent)
    document.querySelector('.fav').innerHTML = ''
    favArr.forEach(item => {
      document.querySelector('.fav').innerHTML += `
        <div onclick='callNewCity("${item}")'>${item}</div>
      `
    })
  } else if (document.querySelector('#toggle-star').classList.contains('fas') == true) {
      document.querySelector('#toggle-star').classList.remove('fas')
      favArr.forEach((item, index) => {
        if (item == document.querySelector('#town').textContent)  favArr.splice(index, 1)
      })
      document.querySelector('.fav').innerHTML = ''
      favArr.forEach(item => {
        document.querySelector('.fav').innerHTML += `
          <div onclick='callNewCity("${item}")'>${item}</div>
        `
      })
    }
  e.preventDefault()
})
