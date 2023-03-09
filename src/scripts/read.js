import { createMarkupForCard, getRead } from './card-item';

const refs = {
  cardsRead: document.getElementById('ul-gallery'),
};
const readPageCards = getRead();

const listsByDate = Object.keys(readPageCards)
  .reverse()
  .map(date => {
    const list = Object.values(readPageCards[date])
      .map(item => {
        return createMarkupForCard(item);
      })
      .join('');

    const accordion = `<div class="accordion">
    <div class="accordion__header">
      <div class="accordion__header-date">${date}</div>
      <div class="accordion__header-icon"></div>
    </div>
    <div class="accordion__body">
      <ul class="accordion__list">
        ${list}
      </ul>
    </div>
  </div>`;

    return accordion;
  })
  .join('');

refs.cardsRead.innerHTML = listsByDate;
