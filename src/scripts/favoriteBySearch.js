import { createMarkupForCardOnSearch, getFavorite } from './search-area';
const refs = {
  cardListFavorite: document.querySelector('.cards__list-favorite'),
};
const favorite = getFavorite();

const cardListFromSearch = Object.values(favorite)
  .map(item => {
    const id = item._id.replace(/[^+\d]/g, '');
    const inFavorite = Boolean(favorite?.hasOwnProperty(id));
    return createMarkupForCardOnSearch(item, inFavorite, true);
  })
  .join('');
refs.cardListFavorite.insertAdjacentHTML('beforeend', cardListFromSearch);
