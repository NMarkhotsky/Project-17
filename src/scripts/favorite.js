import { createMarkupForCard, getFavorite } from './card-item';

const refs = {
  cardListFavorite: document.querySelector('.cards__list-favorite'),
};

const favorite = getFavorite();

const list = Object.values(favorite)
  .map(item => {
    const inFavourite = Boolean(favorite?.hasOwnProperty(item.id));
    return createMarkupForCard(item, inFavourite, true);
  })
  .join('');

refs.cardListFavorite.innerHTML = list;
