import flatpickr from 'flatpickr';

const FLATPICKR_INPUT = document.querySelector('.flatpickr-input');
const ARROW_BTN_DOWN = document.querySelector('.arrow-down');
const ARROW_BTN_UP = document.querySelector('.arrow-up');
const CALENDAR_ICON = document.querySelector('.calendar__button--left');
const calendarIconSvg = new URL('../img/symbol-defs.svg', import.meta.url);

const DATEPICKER_OPTIONS = {
  wrap: true,
  maxDate: 'today',
  closeOnSelect: false,
  nextArrow: `<svg class="flatpickr-icon flatpickr-icon--next">
<use href="${calendarIconSvg}#icon-arrow-up"></use>
<svg>`,
  prevArrow: `<svg class="flatpickr-icon flatpickr-icon--prev">
<use href="${calendarIconSvg}#icon-arrow-down"></use>
<svg>`,
  disable: [
    function (date) {
      return date > Date.now();
    },
  ],
  dateFormat: 'd/m/Y',
  // positionElement: document.querySelector(".calendar-input"),
  position: 'below right',
  monthSelectorType: 'static',
  onOpen() {
    changeBtnStyles();
  },
  onClose(dateStr) {
    changeBtnStyles();
    console.log(dateStr);
    return dateStr;
  },
};

const DATEPICKER = flatpickr('#flatpickr', DATEPICKER_OPTIONS);

function changeBtnStyles() {
  FLATPICKR_INPUT.classList.toggle('is-clicked');
  ARROW_BTN_DOWN.classList.toggle('is-hidden');
  ARROW_BTN_UP.classList.toggle('is-hidden');
  CALENDAR_ICON.classList.toggle('is-clicked');
}

// function createYearInputStyles() {
//   document.querySelector("arrow-up").innerHTML
// }

// let articlesArray = [{ name: 'article 1', published_date: "2023-03-04" }, { name: 'article 2', published_date: "2022-03-04" }, { name: 'article 3', published_date: "2020 -07-01" }];
// let date = "2023-03-04";
// function filterByDate(date, articlesArray) {
//   let filtredArticles = articlesArray.filter(article => article.published_date === date);
//   console.log (filtredArticles)
// }
// filterByDate(date, articlesArray)()