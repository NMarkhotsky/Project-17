import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import NewsApi from './API/newsAPI';
import { newsAdapter, createMarkupForCard } from './card-item';

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
  const pagination = new Pagination(containerPagination, options);

  pagination.on('afterMove', async event => {
    const { page } = event;
    try {
      const { results } = await newsApi.fetchPopularNews();
      renderedMarkupPagination(results, page);
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
      .splice(4 * (page - 1), 4)

      .map(item => createMarkupForCard(newsAdapter(item)))
      .join('');
    refs.cardList.innerHTML = list;
  } else if ((refs.body.clientWidth > 767) & (refs.body.clientWidth <= 1279)) {
    const list = results
      .splice(7 * (page - 1), 7)
      .map(item => createMarkupForCard(newsAdapter(item)))
      .join('');
    refs.cardList.innerHTML = list;
  } else if (refs.body.clientWidth > 767) {
    const list = results
      .splice(8 * (page - 1), 8)
      .map(item => createMarkupForCard(newsAdapter(item)))
      .join('');
    refs.cardList.innerHTML = list;
  }
}

export { loadMoreSearchPopular };
