import flatpickr from 'flatpickr';
import { articlesArray } from './home';
import { newsAdapter, createMarkupForCard } from './card-item';

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
  dateFormat: 'd/m/Y',
  position: 'below right',
  monthSelectorType: 'static',
  onOpen() {
    changeBtnStyles();
  },
  onClose(dateObj) {
    changeBtnStyles();
    if (dateObj) {
      formatFilterDate(dateObj);
      const filtredArticles = filterByDate(filterDate, articlesArray);
      renderFiltredMarkup(filtredArticles);
      formatRequestDate(dateObj);
    }
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
  return filterDate;
}

function filterByDate(filterDate, articlesArray) {
  const filtredArticles = articlesArray.filter(
    article => article.published_date === filterDate
  );
  return filtredArticles;
}

function renderFiltredMarkup(filtredArticles) {
  if (filtredArticles.length === 0) {
    const img = new URL('../img/not-found-desktop.jpg', import.meta.url);
    const markupWithNotFoundImg = `<img src="${img}" alt="No news found">`;
    document.querySelector('.cards__list--home').innerHTML = markupWithNotFoundImg;
  } else {
    list = filtredArticles
      .map(item => createMarkupForCard(newsAdapter(item)))
      .join('');
    document.querySelector('.cards__list--home').innerHTML = list;
  }
}

// console.log(requestDate);
export { requestDate };
// import { requestDate } from '../calendar';
// console.log (requestDate);
