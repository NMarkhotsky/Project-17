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

const addFavoriteBtnHTML = `Add to favorite ${createSvgIcon('icon-heart')}`;
const removeFavoriteBtnHTML = `Remove from favorite ${createSvgIcon(
  'icon-heart-full'
)}`;

export function createMarkupForCard(news) {
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

  setTimeout(() => {
    const btn = document.querySelector(`.button__add-favorite--${id}`);
    btn.onclick = handleFavorite(id, news, btn);
  }, 0);

  const handleFavorite = (newsId, data, btn) => () => {
    btn.classList.toggle('button__add-favorite--active');
    if (btn.classList.contains('button__add-favorite--active')) {
      btn.innerHTML = removeFavoriteBtnHTML;
    } else {
      btn.innerHTML = addFavoriteBtnHTML;
    }
    const favorite = getFavorite();

    const saveFavorite = {
      [newsId]: data,
    };

    const newFavorite = { ...favorite, ...saveFavorite };

    localStorage.setItem('favorite', JSON.stringify(newFavorite));
  };

  return `
  <div class="card_item">
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
