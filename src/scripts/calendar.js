import flatpickr from 'flatpickr';
import { popularNewsArray } from './home';
import { categoriesNewsArray, clearActiveBtn, newsAdapters, createMarkupForCards } from './category';
import { createMarkupForCard, newsAdapter } from './card-item';

const FLATPICKR_INPUT = document.querySelector('.flatpickr-input');
const ARROW_BTN_DOWN = document.querySelector('.arrow-down');
const ARROW_BTN_UP = document.querySelector('.arrow-up');
const CALENDAR_ICON = document.querySelector('.calendar__button--left');
const CARDS_LIST = document.querySelector('.cards__list--home');
const ICONS_URL = new URL('../img/symbol-defs.svg', import.meta.url);
const containerPagination = document.querySelector('.tui-pagination');

let requestDate;
let filterDate;

const DATEPICKER_OPTIONS = {
  wrap: true,
  maxDate: 'today',
  nextArrow: `<svg class="flatpickr-icon flatpickr-icon--next"><use href="${ICONS_URL}#icon-arrow-up"></use><svg>`,
  prevArrow: `<svg class="flatpickr-icon flatpickr-icon--prev"><use href="${ICONS_URL}#icon-arrow-down"></use><svg>`,
  dateFormat: 'd/m/Y',
  defaultDate: "today",
  position: 'below right',
  monthSelectorType: 'static',
  altInput: "false",
  onOpen() {
    changeBtnStyles();
  },
  onClose(dateObj) {
    changeBtnStyles();
    if (dateObj) {
      filterDate = formatFilterDate(dateObj);
      if (!categoriesNewsArray) {
        // console.log('popular-in-calendar', popularNewsArray);
        const filtredArticles = filterByDatePopular(
          filterDate,
          popularNewsArray
        );
        renderFiltredMarkupPopular(filtredArticles);
        clearActiveBtn();
      } else {
        // console.log('categories-in-calendar', categoriesNewsArray);
        const filtredArticles = filterByDateCategory(
          filterDate,
          categoriesNewsArray
        );
        renderFiltredMarkupCategory(filtredArticles);
      }
      requestDate = formatRequestDate(dateObj);
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
  const [fullDate] = dateObj;
  const day = String(fullDate.getDate()).padStart(2, '0');
  const month = String(fullDate.getMonth() + 1).padStart(2, '0');
  const year = fullDate.getFullYear();
  requestDate = `${year}${month}${day}`;
  return requestDate;
}

function formatFilterDate(dateObj) {
  const [fullDate] = dateObj;
  const day = String(fullDate.getDate()).padStart(2, '0');
  const month = String(fullDate.getMonth() + 1).padStart(2, '0');
  const year = fullDate.getFullYear();
  filterDate = `${year}-${month}-${day}`;
  return filterDate;
}

function filterByDatePopular(filterDate, articlesArray) {
  const filtredArticles = articlesArray.filter(
    article => article.published_date === filterDate
  );
  return filtredArticles;
}

function filterByDateCategory(filterDate, articlesArray) {
  const filtredArticles = articlesArray.filter(
    article => article.published_date.slice(0, 10) === filterDate
  );
  // console.log('filtred articles', filtredArticles);
  return filtredArticles;
}

function renderFiltredMarkupPopular(filtredArticles) {
  if (filtredArticles.length === 0) {
    const img = new URL('../img/not-found-desktop.png', import.meta.url);
    const markupWithNotFoundImg = `<div class="no-news"><p class="no-news__text">We haven't found any popular news for this date. Try searching by key word</p><img class="no-news__img" src="${img}" alt="No news found"></div>`;
    CARDS_LIST.innerHTML = markupWithNotFoundImg;
    containerPagination.style = 'display: none';
  } else {
    const list = filtredArticles
      .map(item => createMarkupForCard(newsAdapter(item)))
      .join('');
    CARDS_LIST.innerHTML = list;
  }
}

function renderFiltredMarkupCategory(filtredArticles) {
  if (filtredArticles.length === 0) {
    const img = new URL('../img/not-found-desktop.png', import.meta.url);
    const markupWithNotFoundImg = `<div class="no-news"><p class="no-news__text">We haven't found any news from this category for this date. Try searching by key word</p><img class="no-news__img" src="${img}" alt="No news found"></div>`;
    CARDS_LIST.innerHTML = markupWithNotFoundImg;
    containerPagination.style = 'display: none';
  } else {
    const list = filtredArticles
      .map(item => createMarkupForCards(newsAdapters(item)))
      .join('');
    CARDS_LIST.innerHTML = list;
  }
}

export { requestDate };
