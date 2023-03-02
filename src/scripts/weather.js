import axios from 'axios';

let weatherToday = new Date();
let weatherDayOfWeek = weatherToday.toLocaleString('en-US', {
  weekday: 'long',
});
// console.log(weatherDayOfWeek);

let weatherTodayOptions = { year: 'numeric', month: 'long', day: 'numeric' };
let weatherDayNow = weatherToday.toLocaleString('en-GB', weatherTodayOptions);
// console.log(weatherDayNow);

const weatherContainer = document.querySelector('.weather');
let btnEl = '';
// console.log(weatherContainer);
let latPosition = 0;
let lonPosition = 0;
let tempsOnDay = [];

  // let arrDayObjects = [];


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
        <button class="weather_week">weather for week</button>
`
      );
      btnEl = document.querySelector('.weather_week');
      btnEl.addEventListener('click', onClickWeatherBtn);
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

function oneStringToArr(str) {
  return str.trim().split(' ');
}

function onClickWeatherBtn() {
  //Создаем массив объекта з данными


  weatherContainer.innerHTML = '';

  // console.log('Привет бтн');
  // latPosition = position.coords.latitude;
  // lonPosition = position.coords.longitude;
  // console.log(latPosition);
  // console.log(lonPosition);

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
      // console.log(arreyData);
      // console.log(data.data.city);
      weatherContainer.insertAdjacentHTML(
        'beforeend',
        `<div class="weather_UI_week">
            <p class="weather_city_week">${data.data.city.name}</p>
            <div class="weather_info_week">
            </div>
        </div>
            `
      );

      const weatherConteinerOneDay = document.querySelector('.weather_info_week');
      arreyData.forEach(element => {
        dayAndTime = oneStringToArr(element.dt_txt);
        fullDays.push(...oneStringToArr(dayAndTime[0]));
      });
      days = Array.from(new Set(fullDays));
      for (i = 0; i < days.length; i += 1) {
        tempsOnDay = [];
        for (a = 0; a < arreyData.length; a += 1) {
          if (oneStringToArr(arreyData[a].dt_txt)[0] === days[i]) {
            tempsOnDay.push(arreyData[a].main.temp);
          }
        }
        // console.log(tempsOnDay);

       
        let weatherTodayWeek = new Date(days[i]);
        // console.log(weatherTodayWeek);
        let weatherDayOfWeeks = weatherTodayWeek.toLocaleString('en-US', {
          weekday: 'long',
        });
        // console.log(weatherDayOfWeeks);

        let weatherTodayOptionsWeek = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
        let weatherDayNowWeek = weatherTodayWeek.toLocaleString(
          'en-GB',
          weatherTodayOptionsWeek
        );
        // console.log(weatherDayNowWeek);

        // console.log(arrDayObjects[i]);

        weatherConteinerOneDay.insertAdjacentHTML(
          'beforeend',
          `<div class="weather_info_day">
                    <p class="weather_dayOfWeek_week">${weatherDayOfWeeks}</p>
                    <p class="weather_date_week">${weatherDayNowWeek}</p>
                    <img class="weather_img_week" src="#" alt="Погода картинка">
                    <div class="weather_temp_fullday">
                        <div class="weather_temperatura_min">
                            <p class="weather_temp_week"> ${Math.round(Math.min(
                              ...tempsOnDay)
                            )} </p>
                            <p class="weather_badge_week">&#176</p>
                        </div>
                        <div class="weather_temperatura_max">
                            <p class="weather_temp_week"> ${Math.round(Math.max(
                              ...tempsOnDay)
                            )} </p>
                            <p class="weather_badge_week">&#176</p>
                        </div>
                    </div>
                </div>
          `
        );

      }

      weatherConteinerOneDay.insertAdjacentHTML(
          'beforeend',`<button class="weather_btn">weather for day</button>`)

    })
    .catch(error => error);
}

// Запуск Геолокации
getCoordinat();
