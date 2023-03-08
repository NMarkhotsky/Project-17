import NewsApi from './API/newsAPI';
import formatedDate from './API/fetchAPI';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { createWeatherRendered, weather } from './weather';

const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('.form__input'),
  list: document.querySelector('.cards__list--home'),
  iconSvg: new URL('../img/symbol-defs.svg', import.meta.url),
  cardListFavorite: document.querySelector('.cards__list-favorite'),
  containerPagination: document.querySelector('.tui-pagination'),
};
const newsApi = new NewsApi();

refs.form.addEventListener('submit', onSubmit);

const addFavoriteBtnHTML = `Add to favorite ${createSvgIcon('icon-heart')}`;
const removeFavoriteBtnHTML = `Remove from favorite ${createSvgIcon(
  'icon-heart-full'
)}`;

async function onSubmit(e) {
  e.preventDefault();

  if (refs.input.value.trim() === '') {
    return;
  }
  newsApi.searchQuery = refs.input.value;

  newsApi.fetchOnSearchQuery().then(({ docs, meta }) => {
    refs.list.innerHTML = '';
    const favorite = getFavorite();

    const options = {
      totalItems: (meta.hits = 100),
      itemsPerPage: 8,
      visiblePages: 3,
      page: 1,
      centerAlign: true,
      firstItemClassName: 'tui-first-child',
      lastItemClassName: 'tui-last-child',
      usageStatistics: false,
      template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage:
          '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
          '<a href="#" class="tui-page-btn tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</a>',
        disabledMoveButton:
          '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</span>',
        moreButton:
          '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
          '<span class="tui-ico-ellip">...</span>' +
          '</a>',
      },
    };

    const pagination = new Pagination(refs.containerPagination, options);

    if (docs.length === 0) {
      const img = new URL('../img/not-found-desktop.png', import.meta.url);
      const markupWithNotFoundImg = `<img src="${img}" alt="We haven't found news at your request">`;
      refs.list.innerHTML = markupWithNotFoundImg;
      refs.containerPagination.style = 'display: none';
    } else {
      const list = docs
        .slice(0, 9)
        .map(item => {
          const inFavorite = Boolean(favorite?.hasOwnProperty(item._id));
          return createMarkupForCardOnSearch(item, inFavorite);
        })
        .join('');
      refs.list.innerHTML = list;
      createWeatherRendered();

      pagination.on('afterMove', async event => {
        const { page } = event;
        try {
          const { docs } = await newsApi.fetchOnSearchQuery(page);

          const list = docs
            .slice(0, 9)
            .map(item => {
              const inFavorite = Boolean(favorite?.hasOwnProperty(item._id));
              return createMarkupForCardOnSearch(item, inFavorite);
            })
            .join('');
          refs.list.innerHTML = list;
          createWeatherRendered();
        } catch (error) {
          console.log(error);
        }
      });
      pagination.on('afterMove', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  });
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
  <div class="card_item card_item-${id}" data-card-item-id=${id} data-published-date=${published_date}>
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
        <a class="card__link-btn" href="${url}" data-title="${title}" target="_blank">
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
