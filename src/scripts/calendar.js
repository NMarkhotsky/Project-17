import flatpickr from 'flatpickr';

const FLATPICKR_INPUT = document.querySelector('.flatpickr-input');
const ARROW_BTN_DOWN = document.querySelector('.arrow-down');
const ARROW_BTN_UP = document.querySelector('.arrow-up');
const CALENDAR_ICON = document.querySelector('.calendar__button--left');
const ICONS_URL = new URL('../img/symbol-defs.svg', import.meta.url);
let requestDate;
let filterDate;

const DATEPICKER_OPTIONS = {
  wrap: true,
  maxDate: 'today',
  closeOnSelect: false,
  nextArrow: `<svg class="flatpickr-icon flatpickr-icon--next"><use href="${ICONS_URL}#icon-arrow-up"></use><svg>`,
  prevArrow: `<svg class="flatpickr-icon flatpickr-icon--prev"><use href="${ICONS_URL}#icon-arrow-down"></use><svg>`,
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
  onClose(dateObj) {
    changeBtnStyles();
    if (dateObj) {
      formatFilterDate(dateObj);
      filterByDate(filterDate, articlesArray);
      // renderFiltredMarkup(filtredArticles);
      formatRequestDate(dateObj);
    }
    console.log(requestDate);
    return requestDate;
  },
};

const FP = flatpickr('#flatpickr', DATEPICKER_OPTIONS);

function changeBtnStyles() {
  FLATPICKR_INPUT.classList.toggle('is-clicked');
  ARROW_BTN_DOWN.classList.toggle('is-hidden');
  ARROW_BTN_UP.classList.toggle('is-hidden');
  CALENDAR_ICON.classList.toggle('is-clicked');
}

function formatRequestDate(dateObj) {
  date = new Date(dateObj);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  requestDate = `${year}${month}${day}`;
  return requestDate;
}

function formatFilterDate(dateObj) {
  date = new Date(dateObj);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  filterDate = `${year}-${month}-${day}`;
  // console.log('filter', filterDate);
  return filterDate;
}

// array for test
let articlesArray = [
  { name: 'article 1', published_date: '2023-03-01' },
  { name: 'article 2', published_date: '2022-03-04' },
  { name: 'article 3', published_date: '2020-07-01' },
];
function filterByDate(selectedDate, articlesArray) {
  if (document.querySelector('.cards__list').children) {
    let filtredArticles = articlesArray.filter(
      article => article.published_date === selectedDate
    );
    console.log(filtredArticles);
    return filtredArticles;
  }
}

function renderFiltredMarkup(filtredArticles) {
  
}

export default requestDate;
// import requestDate from '../calendar';
// console.log (requestDate);
