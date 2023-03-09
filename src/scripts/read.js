import { createMarkupForCard, getRead } from './card-item';
import { createMarkupForCardOnSearch } from './search-area';

const refs = {
  cardsRead: document.getElementById('ul-gallery'),
};
const readPageCards = getRead();

const list = Object.values(readPageCards)
  .map(item => {
    if (Object.keys(item).length !== 8) {
      return createMarkupForCardOnSearch(item);
    }

    return createMarkupForCard(item);
  })
  .join('');

refs.cardsRead.innerHTML = list;
