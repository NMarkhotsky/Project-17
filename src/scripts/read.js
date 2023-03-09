import { createMarkupForCard, getRead } from './card-item';

const refs = {
  cardsRead: document.getElementById('read__page'),
  iconSvg: new URL('../img/symbol-defs.svg', import.meta.url),
};
function createSvgIcon(name) {
  return `
    <svg class="button__arrow-svg">
      <use href="${refs.iconSvg}#${name}"></use>
    </svg>
  `;
}
const readPageCards = getRead();
const addBtnUp = createSvgIcon('icon-arrow-up');
const addBtnDown = createSvgIcon('icon-arrow-down');

const listsByDate = Object.keys(readPageCards)
  .reverse()
  .map((date, i) => {
    setTimeout(() => {
      const acc = document.getElementsByClassName('accordion');
      acc[i].addEventListener('click', function () {
        /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
        this.classList.toggle('active');
        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === 'flex') {
          panel.style.display = 'none';
        } else {
          panel.style.display = 'flex';
        }
      });
    }, 1000);

    const list = Object.values(readPageCards[date])
      .map(item => {
        return createMarkupForCard(item);
      })
      .join('');

    const accordion = `
    <div class="read-container .container">
      <button class="accordion">${date}
      ${addBtnUp}
      </button>
      <div class="panel">
          ${list}
      </div>
    </div>`;

    return accordion;
  })
  .join('');

refs.cardsRead.innerHTML = listsByDate;
