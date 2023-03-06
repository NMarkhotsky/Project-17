import NewsApi from './API/newsAPI';
import { newsAdapter, createMarkupForCard } from './card-item';

const refs = {
  cardList: document.querySelector('.cards__list--home'),
};

const newsApi = new NewsApi();
let popularNewsArray;

newsApi.fetchPopularNews().then(data => {
  console.log(data);
  popularNewsArray = data.results;
  const list = data.results
    .map(item => createMarkupForCard(newsAdapter(item)))
    .join('');
  refs.cardList.innerHTML = list;
  return popularNewsArray;
});

export { popularNewsArray };
