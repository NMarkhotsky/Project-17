import NewsApi from './API/newsAPI';
import formatedDate from './API/fetchAPI';

const refs = {
  cardList: document.querySelector('.cards__list'),
  iconSvg: new URL('../img/symbol-defs.svg', import.meta.url),
};

const newsApi = new NewsApi();

function createMarkupForCard({
  abstract,
  published_date,
  section,
  title,
  url,
  imageUrl,
  imageCaption,
}) {
  return `
  <div class="card_item">
    <div class="card_item-header">
      <img class="card_item-image" src="${imageUrl}" alt="${imageCaption}" loading="lazy" />
      <span class="card_item-section">${section}</span>
      <button class="button__add-favorite" type="submit">
        Add to favorite
        <svg class="button__icon-svg" width="24" height="24">
          <use href="${refs.iconSvg}#icon-heart"></use>
        </svg>
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
          <button class="button__read-more" type="submit">
            Read more
          </button>
        </a>
      </div>
    </div>
  </div>
  `;
}

function newsAdapter(item) {
  const { abstract, published_date, section, title, url, media } = item;

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
  };
}

newsApi.fetchPopularNews().then(data => {
  console.log(data);
  const list = data.results
    .map(item => createMarkupForCard(newsAdapter(item)))
    .join('');

  refs.cardList.innerHTML = list;
});
