import NewsApi from './API/newsAPI';
import { newsAdapter, createMarkupForCard, getFavorite } from './card-item';

const refs = {
  cardList: document.querySelector('.cards__list--home'),
};

const newsApi = new NewsApi();
let popularNewsArray;

newsApi.fetchPopularNews().then(data => {
  const favorite = getFavorite();
  articlesArray = data.results;
  const list = articlesArray
    .map(item => {
      const inFavourite = Boolean(favorite?.hasOwnProperty(item.id));
      return createMarkupForCard(newsAdapter(item), inFavourite);
    })
    .join('');
  refs.cardList.innerHTML = list;
  return data.results;
});

export { popularNewsArray };
