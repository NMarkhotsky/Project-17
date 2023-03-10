import formatedDate from './API/fetchAPI';

const refs = {
  iconSvg: new URL('../img/symbol-defs.svg', import.meta.url),
};

export function getFavorite() {
  const favorite = JSON.parse(localStorage.getItem('favorite')) || {};

  return favorite;
}

function createSvgIcon(name) {
  return `
    <svg class="button__icon-svg">
      <use href="${refs.iconSvg}#${name}"></use>
    </svg>
  `;
}

//-------Переменные для localStorage------
const STORAGE_KEY = 'keyRead';
//----------------------------------------
//-------Текущая дата---------------------
function getCurrentDate() {
  let date = new Date();
  let output =
    String(date.getDate()).padStart(2, '0') +
    '/' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '/' +
    date.getFullYear();
  return output;
}
//----------------------------------------

//-------Возращение данных из localStorage и экспорт---
export function getRead() {
  const read = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  return read;
}
//-----------------------------------------------------

const addFavoriteBtnHTML = `Add to favorite ${createSvgIcon('icon-heart')}`;
const removeFavoriteBtnHTML = `Remove from favorite ${createSvgIcon(
  'icon-heart-full'
)}`;

export const handleAddToRead = (newsId, data) => () => {
  const currentDate = getCurrentDate();
  const read = getRead();

  let newRead = read;

  const saveRead = {
    [newsId]: data,
  };

  let cleanedRead = { ...read };
  Object.keys(cleanedRead).forEach(key => {
    if (cleanedRead[key].hasOwnProperty(newsId)) {
      delete cleanedRead[key][newsId];
      cleanedRead = cleanedRead;
    }
  });

  newRead = {
    ...cleanedRead,
    [currentDate]: { ...(read[currentDate] || {}), ...saveRead },
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newRead));
};

export function createMarkupForCard(news, inFavourite, deleteFromDom = false) {
  const {
    abstract,
    published_date,
    section,
    title,
    url,
    imageUrl,
    imageCaption,
    id,
  } = news;

  const toggleFavourite = () => {
    const btn = document.querySelector(`.button__add-favorite--${id}`);
    btn.classList.toggle('button__add-favorite--active');
    if (btn.classList.contains('button__add-favorite--active')) {
      btn.innerHTML = removeFavoriteBtnHTML;
    } else {
      btn.innerHTML = addFavoriteBtnHTML;
    }
  };

  setTimeout(() => {
    if (inFavourite) {
      toggleFavourite();
    }
    const btn = document.querySelector(`.button__add-favorite--${id}`);
    btn.onclick = handleFavorite(id, news);
  }, 0);

  //===========================================================
  setTimeout(() => {
    const buttonReadMore = document.querySelector(`.button__add-read--${id}`);
    buttonReadMore.onclick = handleAddToRead(id, news);
  }, 0);

  //===========================================================

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

    localStorage.setItem('favorite', JSON.stringify(newFavourite));
  };

  return `
  <div class="card_item card_item-${id}">
    <div class="card_item-header">
      <img class="card_item-image" src="${imageUrl}" alt="${imageCaption}" loading="lazy" />
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
          <button class="button__read-more ${`button__add-read--${id}`}" data-id="${id}">
            Read more
          </button>
        </a>
      </div>
    </div>
  </div>
  `;
}

export function newsAdapter(item) {
  const { abstract, published_date, section, title, url, media, id } = item;

  let imageUrl = 'https://via.placeholder.com/300x200';
  let imageCaption = 'No image';

  if (media?.length > 0) {
    const mediaMetadata = media[0]?.['media-metadata'];
    if (mediaMetadata?.length > 0) {
      imageUrl = mediaMetadata[mediaMetadata.length - 1].url;
    }
  }

  return {
    abstract,
    published_date,
    section,
    title,
    url,
    imageUrl,
    imageCaption,
    id,
  };
}
