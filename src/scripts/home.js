import NewsApi from './API/newsAPI';
import { newsAdapter, createMarkupForCard } from './card-item';

const refs = {
  cardList: document.querySelector('.cards__list'),
};

const newsApi = new NewsApi();

newsApi.fetchPopularNews().then(data => {
  console.log(data);
  const list = data.results
    .map(item => createMarkupForCard(newsAdapter(item)))
    .join('');

  refs.cardList.innerHTML = list;
});
