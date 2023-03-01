const { default: axios } = require('axios');

let weatherToday = new Date();
let weatherDayOfWeek = weatherToday.toLocaleString('en-US', {
  weekday: 'long',
});
// console.log(weatherDayOfWeek);

let weatherTodayOptions = { year: 'numeric', month: 'long', day: 'numeric' };
let weatherDayNow = weatherToday.toLocaleString('en-GB', weatherTodayOptions);
// console.log(weatherDayNow);

const weatherContainer = document.querySelector('.weather');
// console.log(weatherContainer);
let latPosition = 0;
let lonPosition = 0;

function getCoordinat() {
  navigator.geolocation.getCurrentPosition(showCoordinat, showError);
}

function showCoordinat(position) {
  latPosition = position.coords.latitude;
  lonPosition = position.coords.longitude;
  axios
    .get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: latPosition,
        lon: lonPosition,
        appid: 'f2ba0fa18561e8523c95662543c65b15',
        units: 'metric',
      },
    })
    .then(response => response)
    .then(data => {
      // console.log(data);
      weatherContainer.insertAdjacentHTML(
        'beforeend',
        `<div class="weather_UI">
            <div class="weather_info">
                <div class="weather_temperatura">
                    <p class="weather_temp"> ${Math.round(data.data.main.temp)} </p>
                    <p class="weather_badge">&#176</p>
                </div>
                <div class="weathr_position">
                    <p class="weather_state">${data.data.weather[0].description}</p>
                    <p class="weather_city">${data.data.name}</p>
                </div>
            </div>
            <img class="weather_img" src="https://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png" alt="weather img">
            <div class="weather_day">
                <p class="weather_dayOfWeek">${weatherDayOfWeek}</p>
                <p class="weather_date">${weatherDayNow}</p>
            </div>
        </div>
        <button class="weather_week">weather for week</button>
`
      );
    })
    .catch(error => error);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert('User prohibited from reading location information');
      break;
    case error.POSITION_UNAVAILABLE:
      alert('The browser was unable to locate');
      break;
    case error.TIMEOUT:
      alert('Browser has not had time to locate');
      break;
    case error.UNKNOWN_ERROR:
      alert('An unspecified error has occurred');
      break;
  }
}

// Запуск Геолокации
getCoordinat();
