import axios from 'axios';

const URL_WEATHER_TODAY = 'https://api.openweathermap.org/data/2.5/weather';
const URL_WEATHER_WEEK = 'https://api.openweathermap.org/data/2.5/forecast';
const weatherIconSvg = new URL('../img/symbol-defs.svg', import.meta.url);
const bodyEl = document.querySelector('body');
function weather() {
  let weatherDayNow = '';
  let weatherDayOfWeek = '';
  let weatherToday = '';
  let weatherPagesToday = true; //true - todey, false - week

  function infoDay(weatherToday) {
    weatherDayOfWeek = weatherToday.toLocaleString('en-US', {
      weekday: 'long',
    });
    let weatherTodayOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    weatherDayNow = weatherToday.toLocaleString('en-GB', weatherTodayOptions);
  }

  const weatherContainer = document.querySelector('.weather');
  let latPosition = 0;
  let lonPosition = 0;
  let dataHits = [];

  function getCoordinat() {
    navigator.geolocation.getCurrentPosition(showCoordinat, showError);
  }

  function showCoordinat(position) {
    latPosition = position.coords.latitude;
    lonPosition = position.coords.longitude;
    if (weatherPagesToday === true) {
      parsWeatherToday();
    } else {
      parsWeatherWeek();
    }
  }

  async function axiosRequestNew(URL) {
    const params = {
      lat: latPosition,
      lon: lonPosition,
      appid: 'f2ba0fa18561e8523c95662543c65b15',
      units: 'metric',
    };
    try {
      const response = await axios.get(URL, { params });
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        // alert('User prohibited from reading location information');
        weatherContainer.insertAdjacentHTML(
          'beforeend',
          `<div class="weather_error">
            <div>This is where the<br>
            WEATHER FORECAST<br>
            banner is located.<br>
            Activate LOCATION,<br>
            press the CONNECT button to view.
            </div>
        </div>
        <button class="weather_btn">Connect</button>
  `
        );
        const btnErrorConnectEl = document.querySelector('.weather_btn');
        btnErrorConnectEl.addEventListener('click', returnWeather);

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

  async function parsWeatherToday() {
    weatherToday = new Date();
    infoDay(weatherToday);
    dataHits = await axiosRequestNew(URL_WEATHER_TODAY);
    weatherContainer.insertAdjacentHTML(
      'beforeend',
      `<div class="weather_UI">
        <div class="weather_info">
          <div class="weather_temperatura">
            <p class="weather_temp"> ${Math.round(dataHits.main.temp)} </p>
            <p class="weather_badge">&#176</p>
          </div>
          <div class="weather_position">
            <p class="weather_state">${dataHits.weather[0].description}</p>
            <div class="weather_geoPosition">
              <svg class="weather_svg">
                <use href="${weatherIconSvg}#icon-location"></use>
              </svg>
              <p class="weather_city">${dataHits.name}</p>
            </div>
          </div>
        </div>
        <img class="weather_img" src="https://openweathermap.org/img/wn/${
          dataHits.weather[0].icon
        }@4x.png" alt="weather img">
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
  }

  //  функция поиска элемента в массиве, с наибольшим вхождением
  function occurrence(arr) {
    return arr
      .sort(
        (a, b) =>
          arr.filter(v => v === a).length - arr.filter(v => v === b).length
      )
      .pop();
  }

  function onClickWeatherBtn() {
    weatherPagesToday = false;
    clearWeather();
    getCoordinat();
  }

  async function parsWeatherWeek() {
    let tempsWeatherImgKod = [];
    let tempsOnDay = [];
    let arrayData = [];
    let days = [];
    let fullDays = [];
    let dayAndTime = '';
    dataHits = await axiosRequestNew(URL_WEATHER_WEEK);
    arrayData = dataHits.list;
    weatherContainer.insertAdjacentHTML(
      'beforeend',
      `<div class="weather_UI_week">
          <p class="weather_city_week">${dataHits.city.name}</p>
          <div class="weather_info_week">
          </div>
        </div>
      `
    );
    const weatherConteinerOneDay = document.querySelector('.weather_info_week');
    arrayData.forEach(element => {
      dayAndTime = element.dt_txt.split(' ');
      fullDays.push(dayAndTime[0]);
    });
    days = Array.from(new Set(fullDays));
    days.forEach(el => {
      tempsOnDay = [];
      tempsWeatherImgKod = [];
      arrayData.forEach(element => {
        if (element.dt_txt.split(' ')[0] === el) {
          tempsOnDay.push(element.main.temp);
          tempsWeatherImgKod.push(element.weather[0].icon);
        }
      });
      weatherToday = new Date(el);
      infoDay(weatherToday);
      let WeatherImgDay = occurrence(tempsWeatherImgKod);
      weatherConteinerOneDay.insertAdjacentHTML(
        'beforeend',
        `<div class="weather_info_day">
          <p class="weather_dayOfWeek_week">${weatherDayOfWeek}</p>
          <p class="weather_date_week">${weatherDayNow}</p>
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
    });
    weatherConteinerOneDay.insertAdjacentHTML(
      'beforeend',
      `<button class="weather_week_btn">weather for today</button>`
    );
    const btnWeekEl = document.querySelector('.weather_week_btn');
    btnWeekEl.addEventListener('click', returnWeather);
  }

  function returnWeather() {
    weatherPagesToday = true;
    clearWeather();
    getCoordinat();
  }

  function clearWeather() {
    weatherContainer.innerHTML = '';
  }

  // Запуск Геолокации
  getCoordinat();
}
function createWeatherRendered() {
  setTimeout(() => {
    const cardList = document.querySelector('.cards__list--home');
    const newElement = document.createElement('div');
    newElement.classList.add('weather');
    const first = cardList.children[2];
    if (cardList.children[2]) {
      cardList.replaceChild(newElement, first);
    } else {
      return;
    }
    bodyEl.clientWidth <= 767
      ? cardList.replaceChild(newElement, cardList.children[0])
      : bodyEl.clientWidth > 767 && bodyEl.clientWidth <= 1279
      ? cardList.replaceChild(newElement, cardList.children[1])
      : bodyEl.clientWidth > 1279
      ? cardList.replaceChild(newElement, cardList.children[2])
      : null;

    weather();
  }, 1);
}

export { createWeatherRendered };
