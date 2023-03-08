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
  createWeatherRendered();
  return popularNewsArray;
});

loadMoreSearchPopular();

// function createWeatherRendered() {
//   const cardList = document.querySelector('.cards__list--home');
//   const first = cardList.children[0];
//   const newElement = document.createElement('div');
//   newElement.classList.add('weather');
//   cardList.replaceChild(newElement, first);
// }

export { popularNewsArray };
