import NewsApi from './API/newsAPI';
import { newsAdapter, createMarkupForCard, getFavorite } from './card-item';
import { loadMoreSearchPopular } from './pagination';
import { createWeatherRendered, weather } from './weather';

const refs = {
  cardList: document.querySelector('.cards__list--home'),
};

const newsApi = new NewsApi();
let popularNewsArray;

newsApi.fetchPopularNews().then(data => {
  const favorite = getFavorite();
  popularNewsArray = data.results;
  const list = data.results
    .slice(0, 9)
    .map(item => {
      const inFavourite = Boolean(favorite?.hasOwnProperty(item.id));
      return createMarkupForCard(newsAdapter(item), inFavourite);
    })
    .join('');
  refs.cardList.innerHTML = list;

  Array.from(refs.cardList.children).forEach(cardEl => {
    let readMoreBtn = cardEl.querySelector('.card__link-btn');

    readMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let readedArticlesData = JSON.parse(localStorage.getItem('readedArticlesData')) || [];

      let cardPublishedDate = cardEl.getAttribute('data-published-date');
      let cardId = cardEl.getAttribute('data-card-item-id');

      let specificDateArticlesData = readedArticlesData.find(item => item.published_date === cardPublishedDate);

      if (!specificDateArticlesData) {
        specificDateArticlesData = {
          published_date: cardPublishedDate,
          readedArticleIDs: [cardId]
        };
        readedArticlesData.push(specificDateArticlesData);
      } else {
        readedArticlesData = readedArticlesData.map(item => {
          if (item.published_date === cardPublishedDate && item.readedArticleIDs.indexOf(cardId) < 0) {
            item.readedArticleIDs.push(cardId);
          }

          return item;
        });
      }

      localStorage.setItem('readedArticlesData', JSON.stringify(readedArticlesData));
      window.location = readMoreBtn.getAttribute('href');
    });
  });
  createWeatherRendered();

  return popularNewsArray;
});
loadMoreSearchPopular();

export { popularNewsArray };
