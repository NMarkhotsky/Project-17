import axios from 'axios';

let weatherToday = new Date();
let weatherDayOfWeek = weatherToday.toLocaleString('en-US', {
  weekday: 'long',
});

let weatherTodayOptions = { year: 'numeric', month: 'long', day: 'numeric' };
let weatherDayNow = weatherToday.toLocaleString('en-GB', weatherTodayOptions);

const weatherContainer = document.querySelector('.weather');
// let btnEl = '';
let latPosition = 0;
let lonPosition = 0;
let tempsOnDay = [];

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
      weatherContainer.insertAdjacentHTML(
        'beforeend',
        `<div class="weather_UI">
            <div class="weather_info">
                <div class="weather_temperatura">
                    <p class="weather_temp"> ${Math.round(
                      data.data.main.temp
                    )} </p>
                    <p class="weather_badge">&#176</p>
                </div>
                <div class="weathr_position">
                    <p class="weather_state">${
                      data.data.weather[0].description
                    }</p>
                    <p class="weather_city">${data.data.name}</p>
                </div>
            </div>
            <img class="weather_img" src="https://openweathermap.org/img/wn/${
              data.data.weather[0].icon
            }@2x.png" alt="weather img">
            <div class="weather_day">
                <p class="weather_dayOfWeek">${weatherDayOfWeek}</p>
                <p class="weather_date">${weatherDayNow}</p>
            </div>
        </div>
        <button class="weather_btn">weather for week</button>
`
      );
      const btnEl = document.querySelector('.weather_btn');
      btnEl.addEventListener('click', onClickWeatherBtn);
    })
    .catch(error => error);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      // alert('User prohibited from reading location information');
      break;
    case error.POSITION_UNAVAILABLE:
      // alert('The browser was unable to locate');
      break;
    case error.TIMEOUT:
      // alert('Browser has not had time to locate');
      break;
    case error.UNKNOWN_ERROR:
      // alert('An unspecified error has occurred');
      break;
  }
}

function oneStringToArr(str) {
  return str.trim().split(' ');
}

//  функция поиска элемента в массиве, с большим колличеством одинаковых элементов
function occurrence(arr) {
  return arr
    .sort(
      (a, b) =>
        arr.filter(v => v === a).length - arr.filter(v => v === b).length
    )
    .pop();
}

function onClickWeatherBtn() {
  //Создаем массив объекта з данными
  clearWeather();

  axios
    .get('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        lat: latPosition,
        lon: lonPosition,
        appid: 'f2ba0fa18561e8523c95662543c65b15',
        units: 'metric',
      },
    })
    .then(response => response)
    .then(data => {
      let arreyData = data.data.list;
      let fullDays = [];
      weatherContainer.insertAdjacentHTML(
        'beforeend',
        `<div class="weather_UI_week">
            <p class="weather_city_week">${data.data.city.name}</p>
            <div class="weather_info_week">
            </div>
        </div>
            `
      );

      const weatherConteinerOneDay =
        document.querySelector('.weather_info_week');
      arreyData.forEach(element => {
        dayAndTime = oneStringToArr(element.dt_txt);
        fullDays.push(...oneStringToArr(dayAndTime[0]));
      });
      days = Array.from(new Set(fullDays));
      for (i = 0; i < days.length; i += 1) {
        tempsOnDay = [];
        tempsWeatherImgKod = [];
        for (a = 0; a < arreyData.length; a += 1) {
          if (oneStringToArr(arreyData[a].dt_txt)[0] === days[i]) {
            tempsOnDay.push(arreyData[a].main.temp);
            tempsWeatherImgKod.push(arreyData[a].weather[0].icon);
          }
        }
        // console.log(tempsOnDay)
        // температура за день

        let weatherTodayWeek = new Date(days[i]);
        // console.log(weatherTodayWeek);
        let weatherDayOfWeeks = weatherTodayWeek.toLocaleString('en-US', {
          weekday: 'long',
        });

        let weatherTodayOptionsWeek = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
        let weatherDayNowWeek = weatherTodayWeek.toLocaleString(
          'en-GB',
          weatherTodayOptionsWeek
        );

        // console.log(tempsWeatherImgKod);
        //картинки за день
        let WeatherImgDay = occurrence(tempsWeatherImgKod);
        // console.log(WeatherImgDay);
        // код картинки температури за день.
        weatherConteinerOneDay.insertAdjacentHTML(
          'beforeend',
          `<div class="weather_info_day">
                    <p class="weather_dayOfWeek_week">${weatherDayOfWeeks}</p>
                    <p class="weather_date_week">${weatherDayNowWeek}</p>
                    <img class="weather_img_week" src="https://openweathermap.org/img/wn/${WeatherImgDay}@2x.png" alt="weather img">
                    <div class="weather_temp_fullday">
                        <div class="weather_temperatura_min">
                            <p class="weather_temp_week"> ${Math.round(
                              Math.min(...tempsOnDay)
                            )} </p>
                            <p class="weather_badge_week">&#176</p>
                        </div>
                        <div>
                        <p class="weather_temp_week"> ... </p>
                        </div>
                        <div class="weather_temperatura_max">
                            <p class="weather_temp_week"> ${Math.round(
                              Math.max(...tempsOnDay)
                            )} </p>
                            <p class="weather_badge_week">&#176</p>
                        </div>
                    </div>
                </div>
          `
        );
      }
      weatherConteinerOneDay.insertAdjacentHTML(
        'beforeend',
        `<button class="weather_week_btn">weather for today</button>`
      );
      const btnWeekEl = document.querySelector('.weather_week_btn');
      btnWeekEl.addEventListener('click', returnWeather);
    })
    .catch(error => error);
}

function returnWeather() {
  clearWeather();
  getCoordinat();
}

function clearWeather() {
  weatherContainer.innerHTML = '';
}

// Запуск Геолокации
getCoordinat();
