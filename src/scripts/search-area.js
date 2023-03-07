import NewsApi from './API/newsAPI';
import formatedDate from './API/fetchAPI';
//import { requestDate } from './calendar';

const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('.form__input'),
  list: document.querySelector('.cards__list--home'),
  iconSvg: new URL('../img/symbol-defs.svg', import.meta.url),
  cardListFavorite: document.querySelector('.cards__list-favorite'),
};

refs.form.addEventListener('submit', onSubmit);

const addFavoriteBtnHTML = `Add to favorite ${createSvgIcon('icon-heart')}`;
const removeFavoriteBtnHTML = `Remove from favorite ${createSvgIcon(
  'icon-heart-full'
)}`;

function onSubmit(e) {
  e.preventDefault();
  if (refs.input.value.trim() === '') {
    return;
  }
  const newsApi = new NewsApi();
  newsApi.searchQuery = refs.input.value;
  //newsApi.begin_date = requestDate;
  //newsApi.end_date = requestDate;
  if (false) {
    //newsApi.fetchOnSearchQueryByDate().then(({ docs }) => {
    //  refs.list.innerHTML = '';
    //  if (docs.length === 0) {
    //    const img = new URL('../img/not-found-desktop.png', import.meta.url);
    //    const markupWithNotFoundImg = `<img src="${img}" alt="We haven't found news at your request">`;
    //    refs.list.innerHTML = markupWithNotFoundImg;
    //  } else {
    //createMarkup(docs);
    //  }
    //});
  } else {
    newsApi.fetchOnSearchQuery().then(({ docs }) => {
      refs.list.innerHTML = '';
      const favorite = getFavorite();
      if (docs.length === 0) {
        const img = new URL('../img/not-found-desktop.png', import.meta.url);
        const markupWithNotFoundImg = `<img src="${img}" alt="We haven't found news at your request">`;
        refs.list.innerHTML = markupWithNotFoundImg;
      } else {
        const list = docs
          .map(item => {
            const inFavorite = Boolean(favorite?.hasOwnProperty(item._id));
            return createMarkupForCardOnSearch(item, inFavorite);
          })
          .join('');
        refs.list.innerHTML = list;
      }
    });
  }
}

export function createMarkupForCardOnSearch(
  news,
  inFavourite,
  deleteFromDom = false
) {
  const {
    abstract,
    pub_date,
    multimedia,
    section_name,
    headline,
    web_url,
    _id,
  } = news;
  const id = _id.replace(/[^+\d]/g, '');
  const published_date = pub_date;
  const section = section_name;
  const title = headline.main;
  const url = web_url;
  const toggleFavourite = () => {
    const btn = document.querySelector(`.button__add-favorite--${id}`);
    btn.classList.toggle('button__add-favorite--active');
    if (btn.classList.contains('button__add-favorite--active')) {
      btn.innerHTML = removeFavoriteBtnHTML;
    } else {
      btn.innerHTML = addFavoriteBtnHTML;
    }
  };
  let imageUrl = null;
  if (!multimedia[0]) {
    imageUrl = new URL('../img/not-found-desktop.png', import.meta.url);
  } else {
    imageUrl = new URL(
      `https://www.nytimes.com/${multimedia[0]?.url}`,
      import.meta.url
    );
  }
  setTimeout(() => {
    if (inFavourite) {
      toggleFavourite();
    }
    const btn = document.querySelector(`.button__add-favorite--${id}`);
    btn.onclick = handleFavorite(id, news);
  }, 0);

  const handleFavorite = (newsId, data) => () => {
    toggleFavourite();
    const favorite = getFavorite();

    let newFavourite = favorite;

    if (favorite.hasOwnProperty(newsId)) {
      delete newFavourite[newsId];
      if (deleteFromDom) {
        const cardElement = document.querySelector(`.card_item-${newsId}`);
        cardElement.remove();
      }
    } else {
      const saveFavorite = {
        [newsId]: data,
      };
      newFavourite = { ...favorite, ...saveFavorite };
    }
    localStorage.setItem('favoriteBySearch', JSON.stringify(newFavourite));
  };

  return `
  <div class="card_item card_item-${id}">
    <div class="card_item-header">
      <img class="card_item-image" src="${imageUrl}" alt="${'imageCaption'}" loading="lazy" />
      <span class="card_item-section">${section}</span>
      <button class="button__add-favorite ${`button__add-favorite--${id}`}" data-id="${id}">
        ${addFavoriteBtnHTML}
      </button>
    </div>
    <div class="cart_item-content">
      <div class="card_item-text">
        <h1 class="card_item-title">${title}</h1>
        <p class="card_item-description">${abstract}</p>
      </div>
      <div class="card_item-info">
        <span class="card_item-date">${formatedDate(published_date)}</span>
        <a class="card__link-btn" href="${url}" data-title="${title}">
          <button class="button__read-more">
            Read more
          </button>
        </a>
      </div>
    </div>
  </div>
  `;
}
function createSvgIcon(name) {
  return `
    <svg class="button__icon-svg">
      <use href="${refs.iconSvg}#${name}"></use>
    </svg>
  `;
}
export function getFavorite() {
  const favorite = JSON.parse(localStorage.getItem('favoriteBySearch')) || {};

  return favorite;
}
