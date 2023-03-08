import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import NewsApi from './API/newsAPI';
import { newsAdapter, createMarkupForCard } from './card-item';
import { createWeatherRendered, weather } from './weather';

const newsApi = new NewsApi();
const containerPagination = document.querySelector('.tui-pagination'); // to refs

const refs = {
  cardList: document.querySelector('.cards__list--home'),
  body: document.querySelector('body'),
};

async function loadMoreSearchPopular() {
  const { num_results } = await newsApi.fetchPopularNews();

  const options = {
    totalItems: num_results,
    itemsPerPage: 8,
    visiblePages: 3,
    page: 1,
    centerAlign: true,
  };
  const pagination = new Pagination(containerPagination, options);

  pagination.on('afterMove', async event => {
    const { page } = event;
    try {
      const { results } = await newsApi.fetchPopularNews();
      renderedMarkupPagination(results, page);
      createWeatherRendered();
    } catch (error) {
      console.log(error);
    }
  });

  pagination.on('afterMove', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function renderedMarkupPagination(results, page) {
  if (refs.body.clientWidth <= 767) {
    const list = results
      .splice(5 * (page - 1), 5)

      .map(item => createMarkupForCard(newsAdapter(item)))
      .join('');
    refs.cardList.innerHTML = list;
  } else if ((refs.body.clientWidth > 767) & (refs.body.clientWidth <= 1279)) {
    const list = results
      .splice(8 * (page - 1), 8)
      .map(item => createMarkupForCard(newsAdapter(item)))
      .join('');
    refs.cardList.innerHTML = list;
  } else if (refs.body.clientWidth > 767) {
    const list = results
      .splice(9 * (page - 1), 9)
      .map(item => createMarkupForCard(newsAdapter(item)))
      .join('');
    refs.cardList.innerHTML = list;
  }
}

export { loadMoreSearchPopular };
