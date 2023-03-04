import { createMarkupForCard, getFavorite } from './card-item';

const refs = {
  cardListFavorite: document.querySelector('.cards__list-favorite'),
};

const favorite = getFavorite();

console.log(Object.values(favorite));

const list = Object.values(favorite)
  .map(item => createMarkupForCard(item))
  .join('');

refs.cardListFavorite.innerHTML = list;
